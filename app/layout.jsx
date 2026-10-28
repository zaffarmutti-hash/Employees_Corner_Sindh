import '../styles/tr22.css';

export const metadata = {
  metadataBase: new URL('https://employeescornersindh.vercel.app'),
  title: {
    default: 'Employees Corner Sindh – TR-22 Arrears Bill & Payroll Utilities',
    template: '%s | Employees Corner Sindh'
  },
  description: 'Community utility for Sindh employees, teachers & staff: Generate Form T.R.22 Arrears Pay Bills (T.R. 265), calculate Civil Servants Pension & FO-2 Commutation, and manage payroll records.',
  keywords: [
    'Employees Corner Sindh',
    'Form TR 22',
    'Form T.R.22 Arrears Pay Bill',
    'Sindh Arrears Bill Generator',
    'Treasury Rule 265',
    'Sindh Pension Form 2',
    'Form FO-2 Pension Calculator',
    'Sindh Civil Servants Pension Rules',
    'Payroll Utility Sindh',
    'PIFRA Object Codes A01101 A01151',
    'Adhoc Relief Allowance ARA Sindh',
    'Asif Ali Shar'
  ],
  authors: [{ name: 'Asif Ali Shar', url: 'https://employeescornersindh.vercel.app' }],
  creator: 'Asif Ali Shar',
  publisher: 'Employees Corner Sindh',
  applicationName: 'Employees Corner Sindh',
  category: 'Education & Community Utility',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '180x180' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  openGraph: {
    title: 'Employees Corner Sindh – TR-22 Arrears Bill & Payroll Utilities',
    description: 'Community utility for Sindh employees & teachers: Form T.R.22 Arrears Pay Bills, Civil Service Pension FO-2 calculator, and payroll tools.',
    url: 'https://employeescornersindh.vercel.app',
    siteName: 'Employees Corner Sindh',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 889,
        height: 376,
        alt: 'Employees Corner Sindh Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Employees Corner Sindh – Your Payroll & Utility Hub',
    description: 'Digitized Form T.R.22 Arrears Pay Bills & Pension FO-2 calculation utility for Sindh public servants.',
    images: ['/logo.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://employeescornersindh.vercel.app/#webapp',
      name: 'Employees Corner Sindh Portal',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All Modern Web Browsers',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      description: 'Community payroll and pension utility for Sindh civil servants, teachers, and accounts officers.',
      url: 'https://employeescornersindh.vercel.app',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'PKR'
      }
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Form T.R.22 Arrears Pay Bill in Sindh?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Form T.R.22 is the Detailed Pay Bill of Arrears under Treasury Rule 265 (T.R. 265), used by Sindh departments to claim retrospective salary arrears, annual increments, and adhoc relief allowances.'
          }
        },
        {
          '@type': 'Question',
          name: 'How is Form 2 (FO-2) Pension calculated under Sindh Civil Servants Pension Rules?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Gross Pension is calculated as (Last Reckonable Emoluments × Qualifying Service / 30) × 70%. Up to 35% can be commuted into a lumpsum value using the standard age commutation factor, while 65% forms the net monthly pension plus medical allowance.'
          }
        },
        {
          '@type': 'Question',
          name: 'What are the pay codes for officers vs officials in Sindh?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In the PIFRA / SAP accounting system, A01101 denotes Basic Pay of Officers (BPS-17 to BPS-22) and A01151 denotes Basic Pay of Other Staff / Officials (BPS-01 to BPS-16).'
          }
        }
      ]
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
