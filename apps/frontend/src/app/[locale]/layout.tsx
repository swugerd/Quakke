import { SITE_NAME } from '@/constants/seo.constants';
import Providers from '@/providers/Providers';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from 'next-intl/server';
import { Golos_Text } from 'next/font/google';

const golos = Golos_Text({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  style: ['normal'],
  variable: '--font-golos',
});

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: Omit<Props, 'children'>): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'HomeMetadata' });

  return {
    icons: {
      icon: '/assets/favicon.ico',
    },
    title: {
      absolute: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: t('description'),
    metadataBase: new URL(process.env.APP_URL),
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      emails: ['example@mail.ru'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={golos.variable}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
