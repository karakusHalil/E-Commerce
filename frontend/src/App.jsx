import Brands from "./components/layout/brands/Brands";
import CampaingSingle from "./components/layout/campaing/CampaingSingle";
import Policy from "./components/layout/policy/Policy";
import AccountPage from "./pages/AccountPage";
import CardPage from "./pages/CardPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import BlogsPage from "./pages/BlogsPage";
import SingleProductPage from "./pages/SingleProductPage";
import SingleBlogPage from "./pages/SingleBlogPage";

function App() {
  return (
    <>
      {/* <SingleProductPage /> */}
      {/* <ShopPage /> */}
      {/* <ContactPage /> */}
      {/* <CardPage /> */}
      {/* <AccountPage /> */}
      {/* <BlogsPage /> */}
      <HomePage />
      {/* <SingleBlogPage /> */}
      <Brands />
      <Policy />
    </>
  );
}

export default App;
