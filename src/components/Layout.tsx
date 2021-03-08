import React, { ReactNode } from 'react';
import Navbar from './NavBar';
import Footer from './Footer';

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  const { children } = props;
  return (
    <>
      <Navbar />
      <div className="container mt-100">
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
