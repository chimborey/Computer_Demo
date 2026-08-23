import { createContext, useEffect, useMemo, useState } from "react";
// import { laptopData } from "../Data/Main/LaptopData";
import { toast } from "react-toastify";
import { all_computerData } from "../Data/Main/All_ComputerData";

export const ShopContext = createContext(null);

// create a ShopContextProvider
export default function ShopContextProvider({ children }) {

      // ==================================== Create Products ====================================
      const [products, setProducts] = useState([...all_computerData]);

      // ==================================== Create Cart ====================================
      const [cart, setCart] = useState(() => {
            const saveCart = localStorage.getItem("cart");
            return saveCart ? JSON.parse(saveCart) : [];
      });

      useEffect(() => {
            localStorage.setItem("cart", JSON.stringify(cart));
      }, [cart]);

      // ==================================== Create subTotal and Taxi ====================================
      const subTotal = useMemo(() => {
            return cart.reduce((acc, item) => {
                  const cleanPrice = parseFloat(String(item.price || "0").replace(/[^0-9.-]+/g, "")) || 0;
                  const itemAmount = Number(item.amount) || 0;
                  return acc + (cleanPrice * itemAmount);
            }, 0);
      }, [cart]);

      const taxi = 2.00;

      // ==================================== Create Total = (subTotal + Taxi) ====================================
      const total = useMemo(() => {
            return subTotal + taxi;
      }, [subTotal, taxi]);

      // ==================================== Create Quantity ====================================
      const quantity = useMemo(() => {
            return cart.reduce((acc, item) => acc + item.amount, 0);
      }, [cart]);

      // ==================================== Create AddToCart ====================================
      const AddToCart = (products) => {
            toast.success("Added To Cart.");
            setCart((prev) => {
                  const exist = prev.find((item) => item.id === products.id);
                  if (exist) {
                        return prev.map((item) =>
                              item.id === products.id ? { ...item, amount: item.amount + 1 } : item
                        );
                  }
                  return [...prev, { ...products, amount: 1 }];
            });
      };

      // ==================================== Create inCreaseQuantity ====================================
      const inCreaseQuantity = (productOrId) => {
            setCart((prev) => {
                  // ទប់ស្កាត់ករណីគេផ្ញើមកត្រឹម id ឬផ្ញើ object មកទាំងមូល
                  const id = typeof productOrId === "object" ? productOrId.id : productOrId;
                  const exist = prev.find((item) => item.id === id);

                  if (exist) {
                        return prev.map((item) =>
                              item.id === id ? { ...item, amount: item.amount + 1 } : item
                        );
                  } else {
                        // បើអត់ទាន់មានក្នុង Cart ទេ ស្វែងរក product ហ្នឹងរួច Add ចូលជាមួយ amount: 1
                        const productToAdd = products.find((p) => String(p.id) === String(id));
                        if (productToAdd) {
                              return [...prev, { ...productToAdd, amount: 1 }];
                        }
                        return prev;
                  }
            });
      };

      // ==================================== Create deCreaseQuantity ====================================
      const deCreaseQuantity = (id) => {
            setCart((prev) => {
                  return prev.map((item) => {
                        // ប្តូរមកប្រើ String() ដើម្បីការពារបញ្ហា id ជា string និង number ខុសគ្នា
                        if (String(item.id) === String(id)) {
                              return { ...item, amount: item.amount - 1 };
                        }
                        return item;
                  }).filter((item) => item.amount > 0);
            });
      };

      // ==================================== Create removeFormCart ====================================
      const removeFormCart = (id) => {
            setCart((prev) => prev.filter((item) => item.id !== id));
            toast.success("Removed From Cart!!!");
      };

      // ==================================== Create clearCart ====================================
      const clearCart = () => {
            setCart([]);
            toast.success("Cleared From Cart!!!");
      };

      // ==================================== Create searchFilter ====================================
      const [searchFilter, setSearchFilter] = useState(() => {
            const saveSearch = localStorage.getItem("searchFilter");
            return saveSearch ? JSON.parse(saveSearch) : "";
      });

      // ==================================== Create categoryFilter ====================================
      const [categoryFilter, setCategoryFilter] = useState(() => {
            const saveCategory = localStorage.getItem("categoryFilter");
            return saveCategory ? JSON.parse(saveCategory) : "All";
      });

      // ==================================== Create brandFilter ====================================
      const [brandFilter, setBrandFilter] = useState(() => {
            const saveBrand = localStorage.getItem("brandFilter");
            return saveBrand ? JSON.parse(saveBrand) : "All";
      });

      // ==================================== Create rating ===============================
      const [ratingFilter, setRatingFilter] = useState(() => {
            const saveRating = localStorage.getItem("ratingFilter");
            return saveRating ? Number(JSON.parse(saveRating)) : 0;
      });

      // ==================================== Create sortBy ==============================
      const [sortByFilter, setSortByFilter] = useState(() => {
            const saveSortBy = localStorage.getItem("sortByFilter");
            return saveSortBy ? JSON.parse(saveSortBy) : "default";
      });

      useEffect(() => {
            localStorage.setItem("searchFilter", JSON.stringify(searchFilter));
            localStorage.setItem("categoryFilter", JSON.stringify(categoryFilter));
            localStorage.setItem("brandFilter", JSON.stringify(brandFilter));
            localStorage.setItem("ratingFilter", JSON.stringify(ratingFilter));
            localStorage.setItem("sortByFilter", JSON.stringify(sortByFilter));
      }, [searchFilter, categoryFilter, brandFilter, ratingFilter, sortByFilter]);

      // ==================================== Create categories and brands ====================================
      const categories = ["All", ...new Set(products.map((item) => item.category))];
      const brands = ["All", ...new Set(products.map((item) => item.brand).filter(Boolean))];

      // ==================================== Create filterProducts ====================================
      const filterProducts = products.filter((item) => {
            // search
            const matchSearch = item.name?.toLowerCase().includes(searchFilter.toLowerCase());
            // category
            const matchCategory = categoryFilter === "All" || item.category === categoryFilter;
            // brand
            const matchBrand = brandFilter === "All" || item.brand === brandFilter;
            // rating
            const itemRating = Number(item.rating) || 0;
            const filterRate = Number(ratingFilter) || 0;
            const matchRating = filterRate === 0 || itemRating >= filterRate;

            return matchSearch && matchCategory && matchBrand && matchRating;
      }).sort((a, b) => {
            const priceA = parseFloat(String(a.price || "0").replace(/[^0-9.-]+/g, ""));
            const priceB = parseFloat(String(b.price || "0").replace(/[^0-9.-]+/g, ""));

            if (sortByFilter === "low-high") {
                  return priceA - priceB;
            } else if (sortByFilter === "high-low") {
                  return priceB - priceA;
            } else if (sortByFilter === "name-az") {
                  return a.name.localeCompare(b.name);
            }
            return 0;
      });

      return (
            <ShopContext.Provider value={{
                  products, setProducts,
                  cart, setCart,
                  total,
                  subTotal,
                  inCreaseQuantity,
                  deCreaseQuantity,
                  quantity,
                  AddToCart,
                  clearCart,
                  removeFormCart,
                  searchFilter, setSearchFilter,
                  categoryFilter, setCategoryFilter,
                  brandFilter, setBrandFilter,
                  categories, brands,
                  filterProducts,
                  ratingFilter, setRatingFilter,
                  sortByFilter, setSortByFilter,
            }}>
                  {children}
            </ShopContext.Provider>
      );
}