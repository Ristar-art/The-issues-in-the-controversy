// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: {
				uid: string;
				email?: string;
			};
		}
		interface PageData {
			footer?: {
				tagline?: string;
				quickLinks?: { label: string; href: string }[];
				socialLinks?: { icon: string; href: string }[];
				copyright?: string;
				credit?: string;
			};
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
