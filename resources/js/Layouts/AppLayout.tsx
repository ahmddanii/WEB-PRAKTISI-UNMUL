import React, { ReactNode } from 'react';
import { usePage } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { url } = usePage();
  const isHomePage = url === '/';

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <Navbar />

      <main className={`${isHomePage ? '' : 'pt-16'} flex-grow`}>{children}</main>

      <Footer />
    </div>
  );
}
