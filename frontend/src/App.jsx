import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import BlogsPage from "./pages/BlogsPage";
import CardPage from "./pages/CardPage";
import AccountPage from "./pages/AccountPage";
import SingleProductPage from "./pages/SingleProductPage";
import SingleBlogPage from "./pages/SingleBlogPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/blog" element={<BlogsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cardPage" element={<CardPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/singleblog" element={<SingleBlogPage />} />
        <Route path="/singleproduct" element={<SingleProductPage />} />
      </Routes>
    </>
  );
}

export default App;
