<script>
    let { footer } = $props();
</script>

<div class="bg-[var(--c-void)] border-t border-[var(--c-border)]">
    <div class="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <!-- Logo & Tagline -->
            <div class="md:col-span-1">
                {#if footer.logo}
                    <img src={footer.logo} alt="Logo" class="h-10 mb-5 opacity-90">
                {/if}
                <p class="text-[var(--c-fg-muted)] font-body leading-relaxed mb-6 text-sm">{footer.tagline}</p>
                <div class="flex space-x-3">
                    {#each footer.socialLinks ?? [] as social}
                        <a
                            href={social.href}
                            class="w-9 h-9 border border-[var(--c-border-strong)] flex items-center justify-center text-[var(--c-fg-muted)] hover:border-[var(--c-teal)] hover:text-[var(--c-teal)] transition-colors"
                            aria-label={social.icon}
                        >
                            <i class={`fab fa-${social.icon}`}></i>
                        </a>
                    {/each}
                </div>
            </div>

            <!-- Quick Links -->
            <div>
                <h3 class="font-mono-editorial text-xs uppercase tracking-[0.25em] text-[var(--c-teal)] mb-5">Quick Links</h3>
                <ul class="space-y-3 font-body text-sm">
                    {#each footer.quickLinks ?? [] as link}
                        <li>
                            <a href={link.href} class="text-[var(--c-fg-muted)] hover:text-[var(--c-fg)] transition-colors">
                                {link.label}
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>

            <!-- Topics -->
            <div>
                <h3 class="font-mono-editorial text-xs uppercase tracking-[0.25em] text-[var(--c-teal)] mb-5">Topics</h3>
                <ul class="space-y-3 font-body text-sm">
                    {#each footer.topics ?? [] as topic}
                        <li>
                            <a href={topic.href} class="text-[var(--c-fg-muted)] hover:text-[var(--c-fg)] transition-colors">
                                {topic.label}
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>

            <!-- Contact Info -->
            <div>
                <h3 class="font-mono-editorial text-xs uppercase tracking-[0.25em] text-[var(--c-teal)] mb-5">Contact</h3>
                <ul class="space-y-3 text-[var(--c-fg-muted)] font-body text-sm">
                    {#if footer.contactInfo?.address}
                        <li>{footer.contactInfo.address}</li>
                    {/if}
                    {#if footer.contactInfo?.phone}
                        <li>{footer.contactInfo.phone}</li>
                    {/if}
                    {#if footer.contactInfo?.email}
                        <li><a href={`mailto:${footer.contactInfo.email}`} class="hover:text-[var(--c-teal)] transition-colors">{footer.contactInfo.email}</a></li>
                    {/if}
                </ul>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="pt-8 border-t border-[var(--c-border)]">
            <div class="flex flex-col md:flex-row justify-between items-center gap-2 font-mono-editorial text-xs uppercase tracking-[0.2em] text-[var(--c-fg-dim)]">
                <p>{footer.copyright}</p>
                <p>{footer.credit}</p>
            </div>
        </div>
    </div>
</div>
