<script>
    let { footer } = $props();
</script>

<footer class="bg-[var(--color-ink)] py-16">
    <div class="container mx-auto px-4 max-w-6xl">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <!-- Logo & Tagline -->
            <div>
                <img src={footer.logo} alt="Logo" class="h-12 mb-6 opacity-90">
                <p class="text-[var(--color-silver)] font-body leading-relaxed mb-6">{footer.tagline}</p>
                <div class="flex space-x-4">
                    {#each footer.socialLinks as social}
                        <a 
                            href={social.href} 
                            class="w-10 h-10 rounded-full border border-[var(--color-stone)] flex items-center justify-center text-[var(--color-silver)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                        >
                            <i class={`fab fa-${social.icon}`}></i>
                        </a>
                    {/each}
                </div>
            </div>
            
            <!-- Quick Links -->
            <div>
                <h3 class="font-headline text-lg text-[var(--color-paper)] mb-6">Quick Links</h3>
                <ul class="space-y-3">
                    {#each footer.quickLinks as link}
                        <li>
                            <a 
                                href={link.href} 
                                class="text-[var(--color-silver)] hover:text-[var(--color-accent)] transition-colors font-body"
                            >
                                {link.label}
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
            
            <!-- Topics -->
            <div>
                <h3 class="font-headline text-lg text-[var(--color-paper)] mb-6">Topics</h3>
                <ul class="space-y-3">
                    {#each footer.topics as topic}
                        <li>
                            <a 
                                href={topic.href} 
                                class="text-[var(--color-silver)] hover:text-[var(--color-accent)] transition-colors font-body"
                            >
                                {topic.label}
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
            
            <!-- Contact Info -->
            <div>
                <h3 class="font-headline text-lg text-[var(--color-paper)] mb-6">Contact Info</h3>
                <ul class="space-y-4 text-[var(--color-silver)] font-body">
                    <li class="flex items-start">
                        <svg class="w-5 h-5 mr-3 mt-0.5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span>{footer.contactInfo.address}</span>
                    </li>
                    <li class="flex items-center">
                        <svg class="w-5 h-5 mr-3 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <span>{footer.contactInfo.phone}</span>
                    </li>
                    <li class="flex items-center">
                        <svg class="w-5 h-5 mr-3 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <span>{footer.contactInfo.email}</span>
                    </li>
                </ul>
            </div>
        </div>
        
        <!-- Bottom Bar -->
        <div class="pt-8 border-t border-[var(--color-charcoal)]">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <p class="text-[var(--color-warm-gray)] font-body text-sm">{footer.copyright}</p>
                <p class="text-[var(--color-stone)] font-body text-sm mt-2 md:mt-0">{footer.credit}</p>
            </div>
        </div>
    </div>
</footer>
