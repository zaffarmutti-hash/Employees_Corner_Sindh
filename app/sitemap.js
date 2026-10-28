export default function sitemap() {
  const baseUrl = 'https://employeescornersindh.vercel.app';
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/#tr22`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9
    }
  ];
}
