import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import BlogsPage from "./pages/BlogsPage";
import CardPage from "./pages/CardPage";
import AccountPage from "./pages/AccountPage";
import SingleProductPage from "./pages/SingleProductPage";
import SingleBlogPage from "./pages/SingleBlogPage";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import CategoryList from "./pages/Admin/Categories/CategoryList";
import CreateCategory from "./pages/Admin/Categories/CreateCategory";
import UpdateCategory from "./pages/Admin/Categories/UpdateCategory";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/blog" element={<BlogsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/singleblog" element={<SingleBlogPage />} />
        <Route path="/singleproduct" element={<SingleProductPage />} />
        <Route path="/admin/*">
          <Route index element={<CategoryList />} />
          <Route path="categories/list" element={<CategoryList />} />
          <Route path="categories/create" element={<CreateCategory />} />
          <Route path="categories/update/:id" element={<UpdateCategory />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
