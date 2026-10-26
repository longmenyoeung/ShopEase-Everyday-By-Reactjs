import { mkdir, writeFile } from 'node:fs/promises';

// One-time asset setup. Images are bundled locally so runtime needs no image API.
const catalogResponse = await fetch('https://dummyjson.com/products?limit=0&select=id,images');
if (!catalogResponse.ok) throw new Error('Could not fetch sample image sources.');
const catalog = await catalogResponse.json();
const products = {
  'hero-bag': 173,
  sneakers: 91,
  plant: 46,
  perfume: 9,
  headphones: 101,
  shirt: 86,
  chair: 14,
  watch: 106,
};
await mkdir('public/images', { recursive: true });
const assets = Object.entries(products).map(([name, id]) => ({
  name: `${name}.webp`,
  url: catalog.products.find((product) => product.id === id).images[0],
}));
assets.push(
  {
    name: 'category-women.jpg',
    url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=85&fit=crop',
  },
  {
    name: 'category-men.jpg',
    url: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=85&fit=crop',
  },
  {
    name: 'category-home.jpg',
    url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=85&fit=crop',
  },
);
await Promise.all(
  assets.map(async ({ name, url }) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Asset ${name}: HTTP ${response.status}`);
    await writeFile(`public/images/${name}`, Buffer.from(await response.arrayBuffer()));
    console.log(`Saved ${name}`);
  }),
);
await writeFile('public/images/sources.json', JSON.stringify(assets, null, 2));
