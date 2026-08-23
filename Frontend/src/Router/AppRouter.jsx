import { Route, Routes } from "react-router-dom";
import MainLayout from "../Components/Layout/MainLayout";
import Home from "../Pages/Pages/Home";
import ProductsDetails from "../Pages/Pages/ProductsDetails";
import Contact from "../Pages/Pages/Contact";
import Cart from "../Pages/Pages/Cart";
import Shop from "../Pages/Pages/Shop";

export default function AppRouter() {
      return (
            <Routes>
                  {/* ===================================== Mailayout ================================= */}
                  <Route path="/" element={<MainLayout />}>
                        {/* ------------------------- Home page ---------------------------------- */}
                        <Route index element={<Home />} />
                        {/* ------------------------- Cart page ---------------------------------- */}
                        <Route path="/shop" element={<Shop />} />
                        {/* ------------------------- Contact page ---------------------------------- */}
                        <Route path="/contact" element={<Contact />} />
                        {/* ------------------------- Cart page ---------------------------------- */}
                        <Route path="/cart" element={<Cart />} />
                        {/* ------------------------- ProductsDetails page ---------------------------------- */}
                        <Route path="/products/:id" element={<ProductsDetails />} />
                  </Route>
                  {/* ===================================== ComputerLayout ============================ */}
            </Routes>
      )
}