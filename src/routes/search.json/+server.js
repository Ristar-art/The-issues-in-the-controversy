import { json } from '@sveltejs/kit';

async function getPosts() {
  let posts = [];

  // Vite's import.meta.glob finds all .md files
  const paths = import.meta.glob('/src/articles/*.md', { eager: true });

  for (const path in paths) {
    const file = paths[path];
    // Get the slug from the file path
    const slug = path.split('/').at(-1)?.replace('.md', '');

    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      posts.push({
        slug,
        ...file.metadata
      });
    }
  }
  return posts;
}

export async function GET() {
  const posts = await getPosts();
  return json(posts);
}