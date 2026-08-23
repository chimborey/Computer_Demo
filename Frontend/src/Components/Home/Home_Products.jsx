import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../../Context/ShopContext"
import SeketonCart from "../../Context/SeketonCart"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion";
export default function Home_Products() {
      // ទាញយក states និង setter functions ទាំងអស់ពី ShopContext រួមទាំង AddToCart
      const {
            searchFilter, setSearchFilter,
            categories,
            categoryFilter, setCategoryFilter,
            filterProducts,
            brands,
            brandFilter, setBrandFilter,
            sortByFilter, setSortByFilter,
            ratingFilter, setRatingFilter,
            AddToCart,
      } = useContext(ShopContext)

      // Loading and skeleton state
      const [loading, setLoading] = useState(true)
      useEffect(() => {
            const timer = setTimeout(() => setLoading(false), 2000)
            return () => clearTimeout(timer)
      }, [])
      const skeletonCount = 6

      // ១. ពេលប្រកាស State ត្រូវទាញយកទិន្នន័យពី localStorage មកវិញ (ถ้ามี)
      const [showAllImages, setShowAllImages] = useState(() => {
            const saved = localStorage.getItem("showAllImages");
            return saved !== null ? JSON.parse(saved) : true; // កំណត់ True ជាលំនាំដើមបើគ្មានទិន្នន័យ
      });

      const [visibleImages, setVisibleImages] = useState(() => {
            const saved = localStorage.getItem("visibleImages");
            return saved !== null ? JSON.parse(saved) : {};
      });

      // ២. រក្សាទុកចូល localStorage រាល់ពេលដែល showAllImages ឬ visibleImages មានការផ្លាស់ប្តូរ
      useEffect(() => {
            localStorage.setItem("visibleImages", JSON.stringify(visibleImages));
            localStorage.setItem("showAllImages", JSON.stringify(showAllImages))
      }, [visibleImages, showAllImages]);


      // ៣. មុខងារសម្រាប់ប៊ូតុង Show/Hide Images នៅ Header
      const handleToggleAllImages = () => {
            const nextState = !showAllImages;
            setShowAllImages(nextState);

            // សម្អាត Local state របស់កាតនីមួយៗចោល និងសម្អាតក្នុង localStorage ផងដែរ
            setVisibleImages({});
            localStorage.removeItem("visibleImages");
      };
      // ៤. មុខងារសម្រាប់ប្តូរស្ថានភាពរូបភាពរបស់កាតនីមួយៗដាច់ដោយឡែក
      const handleToggleCardImage = (id) => {
            setVisibleImages(prev => {
                  let currentStatus;
                  // ពិនិត្យមើលថាតើកាតនេះធ្លាប់ត្រូវបានចុចដាច់ដោយឡែកពីមុនដែរឬទេ?
                  if (prev[id] !== undefined) {
                        currentStatus = prev[id];
                  } else {
                        // បើមិនទាន់ធ្លាប់ចុចទេ គឺយកតាមស្ថានភាពមេ (Global)
                        currentStatus = showAllImages;
                  }
                  const updated = {
                        ...prev,
                        [id]: !currentStatus // ប្តូរស្ថានភាពពីពិតទៅខុស ឬពីខុសទៅពិត
                  };
                  return updated;
            });
      };


      return (
            <section className="w-full overflow-hidden py-14">
                  <main className="mt-12 container md:max-w-7xl mx-auto px-4">

                        <div className="flex flex-col md:flex-row items-start gap-6">

                              {/* ======================================= Sidebar for Filters =================================== */}
                              <div className="w-full md:w-80 flex-shrink-0 flex flex-col space-y-6 px-4 py-5 rounded-xl shadow-md bg-white border border-gray-100 max-h-[750px] overflow-y-auto no-scrollbar sticky top-24">

                                    {/* ---------------------------- Header ------------------------------------ */}
                                    <div className="flex items-center justify-between gap-3">
                                          <div className="flex w-16 h-0.5 rounded-lg bg-gray-200 relative">
                                                <div className="absolute -top-1 left-0 bg-red-500 w-2 h-2 rounded-full"></div>
                                          </div>
                                          <h3 className="text-gray-700 font-bold capitalize text-sm">Filters</h3>
                                          <div className="flex w-16 h-0.5 rounded-lg bg-gray-200 relative">
                                                <div className="absolute -top-1 right-0 bg-blue-500 w-2 h-2 rounded-full"></div>
                                          </div>
                                    </div>

                                    {/* ---------------------------- Search Input ------------------------------------ */}
                                    <div className="flex flex-col gap-1.5">
                                          <span className="text-xs font-semibold text-gray-400 uppercase">Search</span>
                                          <input
                                                value={searchFilter}
                                                onChange={(e) => setSearchFilter(e.target.value)}
                                                type="text"
                                                placeholder="Search products..."
                                                className="py-2 border outline-none focus:border-sky-500 hover:border-sky-400 duration-300 transition-all text-sm font-medium text-gray-600 px-3 rounded-lg w-full bg-gray-50"
                                          />
                                    </div>

                                    {/* ---------------------------- Sort By Filter ------------------------------------ */}
                                    <div className="flex flex-col gap-1.5">
                                          <span className="text-xs font-semibold text-gray-400 uppercase">Sort By</span>
                                          <select
                                                value={sortByFilter}
                                                onChange={(e) => setSortByFilter(e.target.value)}
                                                className="py-2 border outline-none focus:border-sky-500 hover:border-sky-400 duration-300 transition-all text-sm font-medium text-gray-600 px-3 rounded-lg w-full bg-gray-50 cursor-pointer"
                                          >
                                                <option value="default">Default</option>
                                                <option value="low-high">Price: Low to High</option>
                                                <option value="high-low">Price: High to Low</option>
                                                <option value="name-az">Name: A to Z</option>
                                          </select>
                                    </div>

                                    {/* ---------------------------- Categories List ------------------------------------ */}
                                    <div className="flex flex-col gap-2">
                                          <span className="text-xs font-semibold text-gray-400 uppercase">Categories</span>
                                          <div className="flex flex-wrap gap-1.5">
                                                {categories.map((cat, index) => (
                                                      <button
                                                            key={index}
                                                            onClick={() => setCategoryFilter(cat)}
                                                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 capitalize ${categoryFilter === cat
                                                                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                                  }`}
                                                      >
                                                            {cat}
                                                      </button>
                                                ))}
                                          </div>
                                    </div>

                                    {/* ---------------------------- Brands List ------------------------------------ */}
                                    <div className="flex flex-col gap-2">
                                          <span className="text-xs font-semibold text-gray-400 uppercase">Brands</span>
                                          <div className="flex flex-wrap gap-1.5">
                                                {brands.map((brand, index) => (
                                                      <button
                                                            key={index}
                                                            onClick={() => setBrandFilter(brand)}
                                                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 capitalize ${brandFilter === brand
                                                                  ? "bg-red-500 text-white shadow-md shadow-red-200"
                                                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                                  }`}
                                                      >
                                                            {brand}
                                                      </button>
                                                ))}
                                          </div>
                                    </div>

                                    {/* ---------------------------- Rating Filter ------------------------------------ */}
                                    <div className="flex flex-col gap-2">
                                          <span className="text-xs font-semibold text-gray-400 uppercase">Minimum Rating</span>
                                          <div className="flex flex-col gap-1.5">
                                                {[0, 5, 4, 3, 2, 1].map((rate) => (
                                                      <button
                                                            key={rate}
                                                            onClick={() => setRatingFilter(rate)}
                                                            className={`flex items-center justify-between px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 ${ratingFilter === rate
                                                                  ? "bg-amber-500 text-white shadow-md shadow-amber-200"
                                                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                                  }`}
                                                      >
                                                            <span>{rate === 0 ? "All Ratings" : `${rate} Stars & Up`}</span>
                                                            <span>{rate === 0 ? "⭐" : "⭐".repeat(rate)}</span>
                                                      </button>
                                                ))}
                                          </div>
                                    </div>

                              </div>

                              {/* ======================================= Products Display Area =================================== */}
                              <div className="flex-1 mt-12 md:mt-0 w-full flex flex-col space-y-4 px-4 py-5 max-h-[750px] overflow-y-auto no-scrollbar rounded-xl shadow-md bg-white border border-gray-100">

                                    {/* Header with Products Found & Toggle Show/Hide Images Button */}
                                    <div className="flex justify-between items-center border-b pb-3 sticky top-0 bg-white z-10 py-1">
                                          <h3 className="text-gray-700 font-bold capitalize text-sm">
                                                Products Found: <span className="text-blue-600">({filterProducts.length})</span>
                                          </h3>

                                          {/* Header Filter: Show/Hide All Images Button */}
                                          <button
                                                onClick={handleToggleAllImages}
                                                type="button"
                                                className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer shadow-sm"
                                          >
                                                {/* បើ showAllImages គឺ true មានន័យថាវាំពុងបង្ហាញទាំងអស់ ដូច្នេះប៊ូតុងគួរតែឱ្យចុច Hide ទាំងអស់វិញ */}
                                                {showAllImages ? "Show All Images 🖼️" : "Hide All Images 🙈"}
                                          </button>
                                    </div>

                                    {/* filterProducts */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                          {loading ? (
                                                Array.from({ length: skeletonCount }).map((_, index) => (
                                                      <SeketonCart key={index} />
                                                ))
                                          ) : filterProducts.length > 0 ? (
                                                filterProducts.map((item) => {
                                                      // កំណត់ស្ថានភាពរូបភាព៖ បើមានក្នុង visibleImages យកតាមហ្នឹង បើអត់ទេ យកតាមស្ថានភាព Global (showAllImages)
                                                      const isImageShown = visibleImages[item.id] !== undefined ? visibleImages[item.id] : showAllImages

                                                      return (
                                                            <div key={item.id} className="border​​ group border-gray-100 p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between bg-white group h-full">

                                                                  <div>
                                                                        {/* Image & Discount Badge */}
                                                                        <div className="overflow-hidden rounded-lg bg-gray-100 relative group">
                                                                              <Link to={`/products/${item.id}`}>
                                                                                    <AnimatePresence mode="wait">
                                                                                          {isImageShown ? (
                                                                                                <motion.div
                                                                                                      key="image"
                                                                                                      initial={{ opacity: 0, scale: 0.95 }}
                                                                                                      animate={{ opacity: 1, scale: 1 }}
                                                                                                      exit={{ opacity: 0, scale: 0.95 }}
                                                                                                      transition={{ duration: 0.25, ease: "easeInOut" }}
                                                                                                >
                                                                                                      <img
                                                                                                            src={item.image || item.img || "https://via.placeholder.com/150"}
                                                                                                            alt={item.name}
                                                                                                            className="w-full h-44 rounded-lg object-cover object-center group-hover:scale-105 duration-300 transition-all"
                                                                                                      />
                                                                                                </motion.div>
                                                                                          ) : (
                                                                                                <motion.div
                                                                                                      key="hidden"
                                                                                                      initial={{ opacity: 0 }}
                                                                                                      animate={{ opacity: 1 }}
                                                                                                      exit={{ opacity: 0 }}
                                                                                                      transition={{ duration: 0.2 }}
                                                                                                      className="w-full h-44 flex items-center justify-center text-gray-400 text-xs bg-gray-100 rounded-lg"
                                                                                                >
                                                                                                      Image Hidden 🙈
                                                                                                </motion.div>
                                                                                          )}
                                                                                    </AnimatePresence>
                                                                              </Link>

                                                                              {/* Discount Badge (dis) */}
                                                                              {item.dis && (
                                                                                    <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow pointer-events-none z-10">
                                                                                          -{item.dis}
                                                                                    </span>
                                                                              )}
                                                                        </div>
                                                                        {/* ប៊ូតុងចុចបង្ហាញ/លាក់រូបភាពសម្រាប់កាតនីមួយៗ */}
                                                                        <div className="mt-2">
                                                                              <button
                                                                                    onClick={() => handleToggleCardImage(item.id)}
                                                                                    type="button"
                                                                                    className="w-full py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-1"
                                                                              >
                                                                                    {/* បើកំពុងបង្ហាញ ឱ្យវាបង្ហាញអត្ថបទថា Hide តែបើកំពុងលាក់ ឱ្យវាបង្ហាញ Show */}
                                                                                    {isImageShown ? "Hide Image 🙈" : "Show Image 🖼️"}
                                                                              </button>
                                                                        </div>

                                                                        {/* Name, Category, Brand */}
                                                                        <div className="mt-3 flex flex-col gap-1">
                                                                              <Link to={`/products/${item.id}`}>
                                                                                    <h4 className="font-bold text-sm text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                                                                              </Link>
                                                                              <div className="flex items-center justify-between text-xs text-gray-500">
                                                                                    <span className="capitalize">Category: {item.category}</span>
                                                                                    {item.brand && <span className="capitalize">Brand: {item.brand}</span>}
                                                                              </div>
                                                                              {/* Short Description (desc) */}
                                                                              {item.desc && (
                                                                                    <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                                                                                          {item.desc}
                                                                                    </p>
                                                                              )}
                                                                        </div>
                                                                  </div>

                                                                  {/* Price, Rating & View/Add to Cart Buttons */}
                                                                  <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col gap-2.5">
                                                                        <div className="flex items-center justify-between">
                                                                              <span className="text-blue-600 font-bold text-sm">{item.price}</span>
                                                                              <span className="text-amber-500 text-xs font-semibold flex items-center gap-1">
                                                                                    ⭐ {item.rating || 0}
                                                                              </span>
                                                                        </div>

                                                                        {/* ប៊ូតុង View និង Add to Cart */}
                                                                        <div className="grid grid-cols-2 gap-2">
                                                                              <Link
                                                                                    to={`/products/${item.id}`}
                                                                                    className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg text-center transition-all duration-300 flex items-center justify-center"
                                                                              >
                                                                                    View 👁️
                                                                              </Link>
                                                                              <button
                                                                                    onClick={() => AddToCart(item)}
                                                                                    type="button"
                                                                                    className="w-full py-2 bg-gray-900 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-all duration-300 shadow-sm"
                                                                              >
                                                                                    Add to Cart 🛒
                                                                              </button>
                                                                        </div>
                                                                  </div>

                                                            </div>
                                                      )
                                                })
                                          ) : (
                                                <div className="col-span-full py-16 text-center flex flex-col items-center justify-center space-y-2">
                                                      <p className="text-base font-semibold text-gray-500">No products found!</p>
                                                      <p className="text-xs text-gray-400">Try changing your filter or search keywords.</p>
                                                </div>
                                          )}
                                    </div>
                              </div>

                        </div>
                  </main>
            </section>
      )
}