import React, { ReactNode } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <Navbar />

      <main className="mt-16 mb-0 flex-grow">{children}</main>

      <Footer />
    </div>
  );
}
