import React from 'react';
import Navbar from './components/NavBar';
import Footer from './components/footer';
// Importez la police ici si nécessaire

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
