import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ContactPage from "../pages/ContactPage";
import BlogsPage from "../pages/BlogsPage";
import CardPage from "../pages/CardPage";
import AccountPage from "../pages/AccountPage";
import SingleProductPage from "../pages/SingleProductPage";
import SingleBlogPage from "../pages/SingleBlogPage";
import CategoryList from "../pages/Admin/Categories/CategoryList";
import CreateCategory from "../pages/Admin/Categories/CreateCategory";
import UpdateCategory from "../pages/Admin/Categories/UpdateCategory";
import NotFound from "../pages/NotFound";
import UserList from "../pages/Admin/Users/UserList";
import UpdateUser from "../pages/Admin/Users/UpdateUser";
import CreateUser from "../pages/Admin/Users/CreateUser";
import ProductList from "../pages/Admin/Products/ProductList";
import ProductDetail from "../pages/Admin/Products/ProductDetail";
import CreateProduct from "../pages/Admin/Products/CreateProduct";

function SiteRoutes() {
  return (
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
        <Route path="users/list" element={<UserList />} />
        <Route path="users/update/:id" element={<UpdateUser />} />
        <Route path="users/create" element={<CreateUser />} />
        <Route path="products/list" element={<ProductList />} />
        <Route path="products/detail/:id" element={<ProductDetail />} />
        <Route path="products/create" element={<CreateProduct />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default SiteRoutes;
