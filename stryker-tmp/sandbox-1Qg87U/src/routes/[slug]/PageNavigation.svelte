<script lang="ts">
    export let sections: { id: string, title: string, level: number }[];
    export let activeSection: string;
    export let scrollToSection: (id: string) => void;
</script>

<nav class="sticky top-0">
    <ul class="space-y-2">
        {#each sections as section}
            <li class={`pl-${section.level * 4}`}>
                <a
                    href={`#${section.id}`}
                    class={`block px-4 py-2 rounded-lg ${activeSection === section.id ? 'bg-gray-200' : 'text-gray-600 hover:bg-gray-100'}`}
                    on:click|preventDefault={() => scrollToSection(section.id)}
                >
                    {section.title}
                </a>
            </li>
        {/each}
    </ul>
</nav>