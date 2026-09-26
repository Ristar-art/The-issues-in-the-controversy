import { fail } from '@sveltejs/kit';
import { FieldValue } from 'firebase-admin/firestore';
import { adminDb } from '$lib/firebase/admin';
// The subject is a closed set so the inbox stays sortable — anything else is
// rejected rather than stored, which also blocks bots posting arbitrary fields.
import { CONTACT_SUBJECTS } from '$lib/data/contact-subjects';

const messagesRef = adminDb.collection('contactMessages');

const LIMITS = { name: 120, email: 254, message: 5000 };

/** @param {FormDataEntryValue | null} value */
function text(value) {
	return typeof value === 'string' ? value.trim() : '';
}

/**
 * Deliberately permissive: the only thing worth rejecting here is an address
 * that cannot possibly be delivered to. Anything stricter turns away valid
 * addresses, and the reply itself is the real test.
 * @param {string} email
 */
function looksLikeEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const name = text(data.get('name'));
		const email = text(data.get('email'));
		const subject = text(data.get('subject'));
		const message = text(data.get('message'));
		// Hidden field, positioned off-screen and never focusable. A human
		// leaves it empty; a form-filling bot does not.
		const honeypot = text(data.get('website'));

		const values = { name, email, subject, message };

		if (honeypot) {
			// Answer as if it succeeded — telling a bot it was caught only
			// helps it try again differently.
			return { success: true };
		}

		/** @type {Record<string, string>} */
		const errors = {};
		if (!name) errors.name = 'Please tell us your name.';
		else if (name.length > LIMITS.name) errors.name = 'That name is too long.';

		if (!email) errors.email = 'We need an email address to reply to.';
		else if (email.length > LIMITS.email || !looksLikeEmail(email))
			errors.email = 'That does not look like a valid email address.';

		if (!subject) errors.subject = 'Please choose what this is about.';
		else if (!CONTACT_SUBJECTS.includes(subject))
			errors.subject = 'Please choose one of the listed subjects.';

		if (!message) errors.message = 'Please write your message.';
		else if (message.length < 10) errors.message = 'Please add a little more detail.';
		else if (message.length > LIMITS.message) errors.message = 'Please keep the message under 5000 characters.';

		if (Object.keys(errors).length) {
			return fail(400, { errors, values });
		}

		try {
			await messagesRef.add({
				name,
				email,
				subject,
				message,
				status: 'new',
				createdAt: FieldValue.serverTimestamp()
			});
		} catch (err) {
			console.error('Failed to store contact message:', err);
			return fail(500, {
				values,
				formError: 'Something went wrong on our side. Please try again in a moment.'
			});
		}

		return { success: true };
	}
};
