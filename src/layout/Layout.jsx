import React, { useState, useEffect } from "react"
import MobileNav from "../components/MobileNav"
import DesktopNav from "../components/DektopNav"
import Footer from "../components/Footer"
import './Layout.css'

const Layout = ({ children, showSearch }) => {
  
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="layout container">
      {/* Växla mellan mobil- och desktopnav */}
      {isDesktop ? (
        <nav className="desktop-nav">
          <DesktopNav />
        </nav>
      ) : (
        <MobileNav showSearch={showSearch} />
      )}

      <main className="layout-main">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
