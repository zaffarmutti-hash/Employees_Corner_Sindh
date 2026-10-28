export default function sitemap() {
  const baseUrl = 'https://employeescornersindh.gov.pk';
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
    },
    {
      url: `${baseUrl}/#pension-fo2`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/#ddo-codes`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/#rules-faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ];
}

