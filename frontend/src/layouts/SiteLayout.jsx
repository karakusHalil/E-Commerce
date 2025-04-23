import PropTypes from "prop-types";
import Header from "../components/layout/header/Header";
import Footer from "../components/layout/footer/Footer";
import Search from "../components/modals/Search";
import Dialog from "../components/modals/Dialog";

function SiteLayout({ children }) {
  return (
    <>
      <div className="site-layout">
        <Search />
        <Dialog />
        <Header />
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
