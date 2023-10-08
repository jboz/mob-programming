import { Pixelify_Sans } from 'next/font/google';
import './global.scss';

const font = Pixelify_Sans({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Mob Programming</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Mob Programming tools application" />

        <link rel="manifest" href="manifest.webmanifest" />

        <meta name="color-scheme" content="dark light" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-128x128.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-128x128.png" />
      </head>
      <body className={font.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
