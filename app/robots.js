export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/']
      }
    ],
    sitemap: 'https://employeescornersindh.gov.pk/sitemap.xml'
  };
}

