import React from 'react';
import { PageProps } from 'types';
import Navbar from './NavBar';
import Footer from './Footer';

const Layout = (props: PageProps) => {
  const { children } = props;
  return (
    <>
      <Navbar />
      <div className="container mt-100">
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
