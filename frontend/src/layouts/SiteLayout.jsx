import PropTypes from "prop-types";
import Header from "../components/layout/header/Header";
import Footer from "../components/layout/footer/Footer";

function SiteLayout({ children }) {
  return (
    <>
      <div className="site-layout">
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
