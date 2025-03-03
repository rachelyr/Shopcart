import React from 'react';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

const Layout = ({ children, header = true }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {header && <Navbar />}

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;