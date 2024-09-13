import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';

const dinNext = localFont({
  src: [
    {
      path: '../../public/fonts/DIN-NEXT-LT-ARABIC-LIGHT.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/DIN-NEXT-ARABIC-REGULAR.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/DIN-NEXT-ARABIC-MEDIUM.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/DIN-NEXT-ARABIC-BOLD.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-din-next',
});

const dinPro = localFont({
  src: [
    {
      path: '../../public/fonts/DINPro-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/DINPro-Medium.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-din-pro',
});

export const metadata: Metadata = {
  title: 'الأنشطة الطلابية - جامعة الطائف',
  description: 'أنشطة الطلابية بكلية الحاسبات وتقنية المعلومات بجامعة الطائف.',

  keywords:
    'الأنشطة الطلابية, جامعة الطائف, كلية الحاسبات وتقنية المعلومات, طلاب جامعة الطائف',
  robots: 'index, follow',

  openGraph: {
    title: 'الأنشطة الطلابية - جامعة الطائف',
    description:
      'أنشطة الطلابية بكلية الحاسبات وتقنية المعلومات بجامعة الطائف.',
    url: 'https://tu.noor.cx',
    type: 'website',
    images: [
      {
        url: 'https://tu.noor.cx/assets/logo.png',
        width: 800,
        height: 600,
        alt: 'الأنشطة الطلابية بجامعة الطائف',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@TaifUniversity',
    title: 'الأنشطة الطلابية - جامعة الطائف',
    description:
      'أنشطة الطلابية بكلية الحاسبات وتقنية المعلومات بجامعة الطائف.',
    images: 'https://tu.noor.cx/assets/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir='rtl' lang='en'>
      <body
        className={`${dinNext.className} ${dinNext.variable} ${dinPro.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
