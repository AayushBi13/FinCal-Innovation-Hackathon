import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: "FinCal SIP Calculator | Technex '26",
  description:
    'An accessible SIP calculator for illustrative mutual fund planning scenarios at the FinCal Innovation Hackathon.',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
