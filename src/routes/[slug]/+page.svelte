<script>
    export let data;
  </script>
  
  <div class="flex items-center gap-3 mb-4">
    <h1 class="text-3xl font-bold">{data.article.title}</h1>
    <a
      href="/admin/pages?edit={data.article.id}"
      class="text-gray-500 hover:text-teal-600 transition-colors"
      title="Edit article"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </a>
  </div>
  
  <article class="prose">
    {@html data.article.content}
  </article>