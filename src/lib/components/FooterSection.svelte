<script>
    let { footer } = $props();
</script>

<footer class="teal-dark py-12">
    <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
                <img src={footer.logo} alt="BizMaster Logo" class="h-10 mb-4">
                <p class="text-gray-300 mb-4">{footer.tagline}</p>
                <div class="flex space-x-3">
                    {#each footer.socialLinks as social}
                        <a href={social.href} class="text-white"><i class={`fab fa-${social.icon}`}></i></a>
                    {/each}
                </div>
            </div>
            
            <div>
                <h3 class="text-white text-lg font-bold mb-4">Quick Links</h3>
                <ul class="space-y-2 text-gray-300">
                    {#each footer.quickLinks as link}
                        <li><a href={link.href} class="hover:text-white">{link.label}</a></li>
                    {/each}
                </ul>
            </div>
            
            <div>
                <h3 class="text-white text-lg font-bold mb-4">Topics</h3>
                <ul class="space-y-2 text-gray-300">
                    {#each footer.topics as topic}
                        <li><a href={topic.href} class="hover:text-white">{topic.label}</a></li>
                    {/each}
                </ul>
            </div>
            
            <div>
                <h3 class="text-white text-lg font-bold mb-4">Contact Info</h3>
                <ul class="space-y-3 text-gray-300">
                    <li class="flex items-start">
                        <i class="fas fa-map-marker-alt mt-1 mr-3"></i>
                        <span>{footer.contactInfo.address}</span>
                    </li>
                    <li class="flex items-center">
                        <i class="fas fa-phone-alt mr-3"></i>
                        <span>{footer.contactInfo.phone}</span>
                    </li>
                    <li class="flex items-center">
                        <i class="far fa-envelope mr-3"></i>
                        <span>{footer.contactInfo.email}</span>
                    </li>
                </ul>
            </div>
        </div>
        
        <div class="pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>{footer.copyright}</p>
        </div>
    </div>
</footer>
