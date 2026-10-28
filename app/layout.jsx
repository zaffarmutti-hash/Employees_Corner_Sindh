import '../styles/tr22.css';

export const metadata = {
  metadataBase: new URL('https://employeescornersindh.gov.pk'),
  title: {
    default: 'Employees Corner Sindh – Digital Workplace, TR-22 Arrears Pay Bill & Pension FO-2 System',
    template: '%s | Employees Corner Sindh'
  },
  description: 'Official digital platform for Government of Sindh employees, teachers & DDOs: Generate Form T.R.22 Arrears Pay Bills (T.R. 265), calculate Civil Servants Pension & FO-2 Commutation, track payroll records, G.P. Fund, and search PIFRA Treasury object codes.',
  keywords: [
    'Employees Corner Sindh',
    'Form TR 22',
    'Form T.R.22 Arrears Pay Bill',
    'Sindh Arrears Bill Generator',
    'Treasury Rule 265',
    'Sindh Pension Form 2',
    'Form FO-2 Pension Calculator',
    'Sindh Civil Servants Pension Rules',
    'AG Sindh Payroll',
    'District Accounts Office Sindh',
    'DDO Codes Sindh',
    'PIFRA Object Codes A01101 A01151',
    'Adhoc Relief Allowance ARA Sindh',
    'Asif Ali Shar'
  ],
  authors: [{ name: 'Asif Ali Shar', url: 'https://employeescornersindh.gov.pk' }],
  creator: 'Asif Ali Shar',
  publisher: 'Employees Corner Sindh',
  applicationName: 'Employees Corner Sindh',
  category: 'Government & Public Administration',
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
    title: 'Employees Corner Sindh – Digital Workplace, TR-22 Arrears & Pension FO-2',
    description: 'All-in-one digital portal for Government of Sindh employees: Form T.R.22 Pay Bills, Civil Service Pension FO-2 calculator, and DDO Treasury object codes directory.',
    url: 'https://employeescornersindh.gov.pk',
    siteName: 'Employees Corner Sindh',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 889,
        height: 376,
        alt: 'Employees Corner Sindh Official Emblem & Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Employees Corner Sindh – Your Digital Workplace for a Better Tomorrow',
    description: 'Digitized Form T.R.22 Arrears Pay Bills & Pension FO-2 calculation portal for Government of Sindh public servants.',
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
      '@type': 'GovernmentService',
      '@id': 'https://employeescornersindh.gov.pk/#service',
      name: 'Employees Corner Sindh',
      serviceType: 'Public Service Payroll & Civil Service Pension Administration',
      provider: {
        '@type': 'GovernmentOrganization',
        name: 'Government of Sindh',
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Sindh, Pakistan'
        }
      },
      description: 'Digital payroll and pension automation for Sindh civil servants, teachers, DDOs, and accounts officers.',
      url: 'https://employeescornersindh.gov.pk'
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://employeescornersindh.gov.pk/#webapp',
      name: 'Employees Corner Sindh Portal',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All Modern Web Browsers',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
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
            text: 'Form T.R.22 is the official Detailed Pay Bill of Arrears under Treasury Rule 265 (T.R. 265), used by Sindh government departments to claim retrospective salary arrears, annual increments, and adhoc relief allowances.'
          }
        },
        {
          '@type': 'Question',
          name: 'How is Form 2 (FO-2) Pension calculated under Sindh Civil Servants Pension Rules?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Gross Pension is calculated as (Last Reckonable Emoluments × Qualifying Service / 30) × 70%. Up to 35% can be commuted into a lumpsum value using the official age commutation factor, while 65% forms the net monthly pension plus medical allowance.'
          }
        },
        {
          '@type': 'Question',
          name: 'What are the pay codes for officers vs officials in Sindh?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In the PIFRA / SAP accounting system used by AG Sindh and District Accounts Offices, A01101 denotes Basic Pay of Officers (BPS-17 to BPS-22) and A01151 denotes Basic Pay of Other Staff / Officials (BPS-01 to BPS-16).'
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
