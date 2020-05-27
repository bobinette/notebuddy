import React from 'react';
import NavBar from 'components/navbar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <div>
    <NavBar />
    <div className="body">{children}</div>
  </div>
);

export default Layout;
