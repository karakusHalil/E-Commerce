import Brands from "./components/layout/brands/Brands";
import CampaingSingle from "./components/layout/campaing/CampaingSingle";
import Footer from "./components/layout/footer/Footer";
import Header from "./components/layout/header/Header";
import Policy from "./components/layout/policy/Policy";
import AccountPage from "./pages/AccountPage";
import CardPage from "./pages/CardPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import SingleBlogPage from "./pages/SingleBlogPage";

function App() {
  return (
    <>
      <Header />
      <ShopPage />
      {/* <ContactPage /> */}
      {/* <CardPage /> */}
      {/* <AccountPage /> */}
      {/* <SingleBlogPage /> */}
      {/* <HomePage /> */}
      <Brands />
      <CampaingSingle />
      <Policy />
      <Footer />
    </>
  );
}

export default App;
