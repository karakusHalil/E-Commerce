import PropTypes from "prop-types";
import Header from "../components/layout/header/Header";
import Footer from "../components/layout/footer/Footer";
import Search from "../components/modals/Search";
import Dialog from "../components/modals/Dialog";
import { useEffect, useState } from "react";

function SiteLayout({ children }) {
  const [isSearchShow, setIsSearchShow] = useState(false);
  const [isDialogShow, setIsDialogShow] = useState(false);

  useEffect(() => {
    const isClosed = localStorage.getItem("dialog-closed");
    if (!isClosed) {
      const timer = setTimeout(() => {
        setIsDialogShow(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClosed = () => {
    setIsDialogShow(false);
    localStorage.setItem("dialog-closed", "true");
  };
  return (
    <>
      <div className="site-layout">
        <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow} />
        <Dialog isDialogShow={isDialogShow} handleClosed={handleClosed} />
        <Header setIsSearchShow={setIsSearchShow} />
        {children}
        <Footer />
      </div>
    </>
  );
}

export default SiteLayout;

SiteLayout.propTypes = {
  children: PropTypes.node,
};
