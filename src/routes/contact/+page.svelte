<script>
    import Seo from '$lib/components/Seo.svelte';
    import { enhance } from '$app/forms';
    import { CONTACT_SUBJECTS } from '$lib/data/contact-subjects';

    let { form } = $props();

    let submitting = $state(false);

    // The action returns the submitted values on failure so nothing typed is
    // lost on a round trip; on a fresh load there is no form at all.
    /** @type {{ name?: string; email?: string; subject?: string; message?: string }} */
    let values = $derived(form?.values ?? {});
    /** @type {Record<string, string>} */
    let errors = $derived(form?.errors ?? {});

    const CHANNELS = [
        {
            label: 'Email',
            value: 'hello@openfacefellowship.com',
            href: 'mailto:hello@openfacefellowship.com',
            note: 'Replies usually within a few days.'
        },
        {
            label: 'Study questions',
            value: 'Browse the topics first',
            href: '/topics',
            note: 'Many questions are already answered there.'
        }
    ];
</script>

<Seo
    title="Contact"
    description="Get in touch with Open Face Fellowship — questions about a study, corrections, speaking requests, or prayer."
    keywords="contact, open face fellowship, bible study questions, speaking requests, prayer"
/>


<div class="doc-ct">
    <main>
        <!-- ============================ HEADER ============================ -->
        <section class="doc-ct__head">
            <p class="doc-ct__eyebrow">Correspondence</p>
            <h1 class="doc-ct__title">Contact<br /><span class="doc-ct__em">the fellowship</span></h1>
            <p class="doc-ct__lede">
                Questions about a study, a correction worth making, or simply a word - write to us.
                Every message is read by a person.
            </p>
        </section>

        <!-- ========================= ASIDE + FORM ========================= -->
        <section class="doc-ct__body">
            <aside class="doc-ct__aside">
                {#each CHANNELS as channel}
                    <div class="doc-ct__channel">
                        <p class="doc-ct__channel-label">{channel.label}</p>
                        <a href={channel.href} class="doc-ct__channel-value">{channel.value}</a>
                        <p class="doc-ct__channel-note">{channel.note}</p>
                    </div>
                {/each}

                <div class="doc-ct__channel">
                    <p class="doc-ct__channel-label">Before you write</p>
                    <p class="doc-ct__channel-note">
                        We are a small fellowship, not a newsroom. Detailed questions take longer to
                        answer than short ones - but they are the ones worth asking.
                    </p>
                </div>
            </aside>

            <div class="doc-ct__formwrap">
                {#if form?.success}
                    <div class="doc-ct__done">
                        <p class="doc-ct__eyebrow">Message sent</p>
                        <h2 class="doc-ct__done-title">Thank you - it reached us.</h2>
                        <p class="doc-ct__lede">
                            We read everything that comes in and will reply to the address you gave.
                        </p>
                        <a href="/topics" class="doc-ct__cta">
                            Continue to the studies
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                            </svg>
                        </a>
                    </div>
                {:else}
                    <form
                        method="POST"
                        class="doc-ct__form"
                        use:enhance={() => {
                            submitting = true;
                            return async ({ update }) => {
                                // Errors keep what was typed; a success wipes
                                // the fields along with the form itself.
                                await update({ reset: false });
                                submitting = false;
                            };
                        }}
                    >
                        {#if form?.formError}
                            <p class="doc-ct__formerror" role="alert">{form.formError}</p>
                        {/if}

                        <div class="doc-ct__field">
                            <label for="ct-name">Name</label>
                            <input
                                id="ct-name"
                                name="name"
                                type="text"
                                autocomplete="name"
                                maxlength="120"
                                value={values.name ?? ''}
                                aria-invalid={errors.name ? 'true' : undefined}
                                aria-describedby={errors.name ? 'ct-name-error' : undefined}
                            />
                            {#if errors.name}
                                <p class="doc-ct__error" id="ct-name-error">{errors.name}</p>
                            {/if}
                        </div>

                        <div class="doc-ct__field">
                            <label for="ct-email">Email</label>
                            <input
                                id="ct-email"
                                name="email"
                                type="email"
                                autocomplete="email"
                                maxlength="254"
                                value={values.email ?? ''}
                                aria-invalid={errors.email ? 'true' : undefined}
                                aria-describedby={errors.email ? 'ct-email-error' : undefined}
                            />
                            {#if errors.email}
                                <p class="doc-ct__error" id="ct-email-error">{errors.email}</p>
                            {/if}
                        </div>

                        <div class="doc-ct__field">
                            <label for="ct-subject">What is this about</label>
                            <div class="doc-ct__select">
                                <select
                                    id="ct-subject"
                                    name="subject"
                                    aria-invalid={errors.subject ? 'true' : undefined}
                                    aria-describedby={errors.subject ? 'ct-subject-error' : undefined}
                                >
                                    <option value="" disabled selected={!values.subject}>Choose a subject…</option>
                                    {#each CONTACT_SUBJECTS as subject}
                                        <option value={subject} selected={values.subject === subject}>{subject}</option>
                                    {/each}
                                </select>
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9l6 6 6-6" />
                                </svg>
                            </div>
                            {#if errors.subject}
                                <p class="doc-ct__error" id="ct-subject-error">{errors.subject}</p>
                            {/if}
                        </div>

                        <div class="doc-ct__field">
                            <label for="ct-message">Message</label>
                            <textarea
                                id="ct-message"
                                name="message"
                                rows="7"
                                maxlength="5000"
                                value={values.message ?? ''}
                                aria-invalid={errors.message ? 'true' : undefined}
                                aria-describedby={errors.message ? 'ct-message-error' : undefined}
                            ></textarea>
                            {#if errors.message}
                                <p class="doc-ct__error" id="ct-message-error">{errors.message}</p>
                            {/if}
                        </div>

                        <!-- Spam trap: hidden from people, tempting to bots. -->
                        <div class="doc-ct__trap" aria-hidden="true">
                            <label for="ct-website">Website</label>
                            <input id="ct-website" name="website" type="text" tabindex="-1" autocomplete="off" />
                        </div>

                        <div class="doc-ct__actions">
                            <button type="submit" class="doc-ct__submit" disabled={submitting}>
                                {#if submitting}
                                    <span class="doc-ct__spinner"></span>
                                    Sending
                                {:else}
                                    Send message
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                                    </svg>
                                {/if}
                            </button>
                            <p class="doc-ct__privacy">
                                Your address is used to reply to you - nothing else.
                            </p>
                        </div>
                    </form>
                {/if}
            </div>
        </section>
    </main>
</div>

<style>
    .doc-ct {
        --nav-h: 5.2rem;
        min-height: 100vh;
        background: var(--doc-bg);
        color: var(--doc-ink);
        padding-top: var(--nav-h);
        font-family: 'Public Sans', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
    }
    .doc-ct :where(h1, h2) {
        font-family: 'Newsreader', Georgia, serif;
        font-weight: 400;
        color: var(--doc-ink);
        letter-spacing: -0.018em;
        line-height: 1.02;
        margin: 0;
    }

    /* Header */
    .doc-ct__head {
        padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 7rem) clamp(2.5rem, 5vw, 4rem);
        max-width: 64rem;
    }
    .doc-ct__eyebrow {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.34em;
        text-transform: uppercase;
        color: var(--doc-ember);
        margin: 0 0 1.5rem;
        display: inline-flex;
        align-items: center;
        gap: 0.85rem;
    }
    .doc-ct__eyebrow::before {
        content: '';
        width: 28px;
        height: 1px;
        background: var(--doc-ember);
        opacity: 0.7;
    }
    .doc-ct__title {
        font-size: clamp(3rem, 10vw, 7rem);
        line-height: 0.95;
        margin-bottom: 1.75rem !important;
    }
    .doc-ct__em { font-style: italic; font-weight: 300; color: var(--doc-ember-soft); }
    .doc-ct__lede {
        font-size: clamp(1rem, 1.6vw, 1.2rem);
        color: var(--doc-muted);
        max-width: 42rem;
        line-height: 1.7;
        margin: 0;
    }

    /* Body — the aside sits beside the form on wide viewports, above it below */
    .doc-ct__body {
        display: grid;
        grid-template-columns: 1fr;
        gap: clamp(2.5rem, 5vw, 4.5rem);
        padding: 0 clamp(1.5rem, 6vw, 7rem) clamp(4rem, 9vw, 8rem);
        border-top: 1px solid var(--doc-line);
        margin-top: clamp(1.5rem, 4vw, 3rem);
        padding-top: clamp(2.5rem, 5vw, 4rem);
    }
    @media (min-width: 900px) {
        .doc-ct__body { grid-template-columns: minmax(0, 18rem) minmax(0, 1fr); }
    }

    /* Aside */
    .doc-ct__aside { display: flex; flex-direction: column; gap: 2.5rem; }
    .doc-ct__channel { display: flex; flex-direction: column; gap: 0.6rem; }
    .doc-ct__channel-label {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: var(--doc-ember);
        margin: 0;
    }
    .doc-ct__channel-value {
        font-family: 'Newsreader', Georgia, serif;
        font-size: 1.15rem;
        color: var(--doc-ink);
        text-decoration: none;
        border-bottom: 1px solid var(--doc-line);
        padding-bottom: 0.3rem;
        align-self: flex-start;
        transition: color 0.3s ease, border-color 0.3s ease;
        overflow-wrap: anywhere;
    }
    .doc-ct__channel-value:hover { color: var(--doc-ember-soft); border-bottom-color: var(--doc-ember); }
    .doc-ct__channel-note {
        font-size: 0.9rem;
        color: var(--doc-muted);
        line-height: 1.65;
        margin: 0;
    }

    /* Form */
    .doc-ct__formwrap { max-width: 42rem; }
    .doc-ct__form { display: flex; flex-direction: column; gap: 2rem; }
    .doc-ct__field { display: flex; flex-direction: column; gap: 0.6rem; }
    .doc-ct__field label {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: var(--doc-dim);
    }
    /* Underlines rather than boxes — the same treatment the topics search uses,
       so the form reads as part of the page instead of a widget dropped on it. */
    .doc-ct__field :where(input, textarea, select) {
        width: 100%;
        background: transparent;
        border: none;
        border-bottom: 1px solid var(--doc-line);
        padding: 0.75rem 0;
        font-family: 'Public Sans', sans-serif;
        font-size: 1rem;
        color: var(--doc-ink);
        outline: none;
        border-radius: 0;
        transition: border-color 0.3s ease;
    }
    .doc-ct__field :where(input, textarea, select):focus { border-bottom-color: var(--doc-ember); }
    .doc-ct__field :where(input, textarea)::placeholder { color: var(--doc-dim); }
    .doc-ct__field textarea { resize: vertical; line-height: 1.7; min-height: 9rem; }
    .doc-ct__field :where(input, textarea, select)[aria-invalid='true'] { border-bottom-color: var(--doc-ember); }

    /* The native arrow is suppressed so the caret can match the nav's. */
    .doc-ct__select { position: relative; display: flex; align-items: center; }
    .doc-ct__select select {
        appearance: none;
        -webkit-appearance: none;
        padding-right: 2rem;
        cursor: pointer;
    }
    .doc-ct__select select option { background: var(--doc-bg-2); color: var(--doc-ink); }
    .doc-ct__select svg {
        position: absolute;
        right: 0;
        width: 1.1rem;
        height: 1.1rem;
        color: var(--doc-dim);
        pointer-events: none;
    }

    .doc-ct__error,
    .doc-ct__formerror {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.1em;
        color: var(--doc-ember);
        margin: 0;
    }
    .doc-ct__formerror {
        border-left: 2px solid var(--doc-ember);
        padding: 0.75rem 1rem;
        background: var(--doc-line-soft);
        line-height: 1.6;
    }

    /* Trap — off-screen rather than display:none, which some bots detect. */
    .doc-ct__trap {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
    }

    .doc-ct__actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
        flex-wrap: wrap;
        border-top: 1px solid var(--doc-line);
        padding-top: 2rem;
    }
    .doc-ct__submit {
        display: inline-flex;
        align-items: center;
        gap: 0.65rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ink);
        background: none;
        border: 1px solid var(--doc-line);
        border-radius: 2px;
        padding: 0.9rem 1.6rem;
        cursor: pointer;
        transition: border-color 0.3s ease, color 0.3s ease;
    }
    .doc-ct__submit:hover:not(:disabled) { border-color: var(--doc-ember); color: var(--doc-ember-soft); }
    .doc-ct__submit:disabled { opacity: 0.55; cursor: default; }
    .doc-ct__submit svg { width: 0.95rem; height: 0.95rem; transition: transform 0.3s ease; }
    .doc-ct__submit:hover:not(:disabled) svg { transform: translateX(4px); }
    .doc-ct__spinner {
        width: 0.9rem;
        height: 0.9rem;
        border: 1.5px solid var(--doc-line);
        border-top-color: var(--doc-ember);
        border-radius: 999px;
        animation: docCtSpin 0.8s linear infinite;
    }
    @keyframes docCtSpin { to { transform: rotate(360deg); } }
    .doc-ct__privacy { font-size: 0.85rem; color: var(--doc-dim); margin: 0; }

    /* Confirmation */
    .doc-ct__done {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1.5rem;
        border-top: 1px solid var(--doc-ember);
        padding-top: clamp(2rem, 4vw, 3rem);
    }
    .doc-ct__done-title { font-size: clamp(1.9rem, 4vw, 2.8rem); line-height: 1.1; }
    .doc-ct__cta {
        display: inline-flex;
        align-items: center;
        gap: 0.55rem;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 0.625rem;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: var(--doc-ember-soft);
        text-decoration: none;
        border-bottom: 1px solid var(--doc-line);
        padding-bottom: 0.4rem;
        transition: border-color 0.3s ease, color 0.3s ease;
    }
    .doc-ct__cta:hover { border-bottom-color: var(--doc-ember); color: var(--doc-ember); }
    .doc-ct__cta svg { width: 0.95rem; height: 0.95rem; transition: transform 0.3s ease; }
    .doc-ct__cta:hover svg { transform: translateX(4px); }

    @media (prefers-reduced-motion: reduce) {
        .doc-ct *,
        .doc-ct :where(a, button, svg) { transition: none !important; animation: none !important; }
    }
</style>
