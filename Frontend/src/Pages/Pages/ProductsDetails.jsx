import { Link, useParams } from "react-router-dom"
import { ShopContext } from "../../Context/ShopContext"
import { useContext, useState, useEffect } from "react"

export default function ProductsDetails() {
      const { id } = useParams()
      const { products, AddToCart, inCreaseQuantity, deCreaseQuantity, cart } = useContext(ShopContext)

      const product = products?.find((item) => String(item.id) === String(id))

      // ស្វែងរកទំនិញក្នុង Cart ដើម្បីយកចំនួន (Amount) មកបង្ហាញ
      const cartItem = cart?.find((item) => String(item.id) === String(id))
      const displayAmount = cartItem ? cartItem.amount : 1

      // កំណត់ State សម្រាប់រូបភាពធំ (Active Image)
      const [activeImg, setActiveImg] = useState("")
      // State សម្រាប់ដូរ Tab ផ្នែកខាងក្រោម (description, reviews, company, usage guide)
      const [activeTab, setActiveTab] = useState("description")

      useEffect(() => {
            if (product) {
                  setActiveImg(product.image)
            }
      }, [product])

      if (!product) {
            return (
                  <div className="py-20 text-center text-gray-500">
                        <h2>Product not found!</h2>
                  </div>
            )
      }

      const subImages = product.subImage || []

      return (
            <section className="container md:max-w-7xl mx-auto px-4 py-12">

                  {/* ===================================== Header ================================================ */}
                  <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
                        {/* ផ្នែកខាងឆ្វេង៖ ចំណងជើង ឬឈ្មោះទំព័រ */}
                        <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                                    📦
                              </div>
                              <div>
                                    <h1 className="text-base font-bold text-gray-800">Product Details</h1>
                                    <p className="text-xs text-gray-400">Manage and view complete product specifications</p>
                              </div>
                        </div>

                        {/* ផ្នែកខាងស្តាំ៖ ប៊ូតុង Back to Orders */}
                        <Link
                              to="/"
                              className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl border border-gray-200 transition-all duration-200"
                        >
                              <span>←</span> Back Home
                        </Link>
                  </div>

                  {/* ====================================== Detail ================================================ */}
                  <div className="flex flex-col lg:flex-row gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

                        {/* ------------------------------------ 1. flex-1 សម្រាប់ SubImages ---------------------------- */}
                        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[450px] flex-1">
                              {subImages.map((sub) => (
                                    <div
                                          key={sub.id}
                                          onClick={() => setActiveImg(sub.image)}
                                          className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 w-20 h-20 flex-shrink-0 ${activeImg === sub.image ? "border-blue-600 shadow-md scale-95" : "border-gray-200 opacity-70 hover:opacity-100"
                                                }`}
                                    >
                                          <img src={sub.image} alt="" className="w-full h-full object-cover" />
                                    </div>
                              ))}
                        </div>

                        {/* ------------------------------------ 2. flex-[3] សម្រាប់ Main Image ------------------------------------ */}
                        <div className="flex-[3] w-full h-[450px] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center relative">
                              <img
                                    src={activeImg}
                                    alt={product?.name}
                                    className="w-full h-full object-cover object-center duration-500 transition-all hover:scale-105"
                              />
                              {product.dis && (
                                    <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-lg shadow">
                                          -{product.dis}
                                    </span>
                              )}
                        </div>

                        {/* ------------------------------------ 3. flex-[2] សម្រាប់ Name, Price, Description និង Add to Cart ------------------------------------ */}
                        <div className="flex-[2] flex flex-col justify-between space-y-5">
                              <div className="space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
                                          <span className="bg-emerald-50 text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-100 flex-shrink-0">
                                                In Stock ✓
                                          </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
                                          <span className="capitalize bg-gray-100 px-2.5 py-1 rounded-md">Category: <strong>{product.category}</strong></span>
                                          {product.brand && <span className="capitalize bg-gray-100 px-2.5 py-1 rounded-md">Brand: <strong>{product.brand}</strong></span>}
                                          {product.rating && <span className="bg-amber-50 text-amber-600 px-2.5 py-1 rounded-md font-semibold">⭐ {product.rating} Stars</span>}
                                    </div>

                                    <div className="text-3xl font-extrabold text-blue-600 pt-1">{product.price}</div>

                                    <p className="text-sm text-gray-600 leading-relaxed pt-1">
                                          {product.desc || "គ្មានការពណ៌នាសម្រាប់ផលិតផលនេះទេ។"}
                                    </p>

                                    <div className="py-2 border-y border-gray-100 space-y-1.5 text-xs text-gray-500">
                                          <p>🚚 Free Worldwide Shipping available</p>
                                          <p>🛡️ 1 Year Official Brand Warranty</p>
                                          <p>🔄 30-Day Money-Back Guarantee</p>
                                    </div>
                              </div>

                              {/* ផ្នែកប៊ូតុងបញ្ជា (Quantity & Add to Cart) */}
                              <div className="pt-2 flex flex-col gap-3">
                                    <div className="flex items-center gap-4">
                                          <span className="text-xs font-semibold text-gray-500 uppercase">Quantity:</span>
                                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                                                <button
                                                      onClick={() => {
                                                            if (cartItem) {
                                                                  deCreaseQuantity(product.id);
                                                            }
                                                      }}
                                                      className="px-3 py-1 hover:bg-gray-200 text-gray-600 transition-all"
                                                >
                                                      -
                                                </button>
                                                <span className="px-4 py-1 text-sm font-semibold text-gray-800">{displayAmount}</span>
                                                <button
                                                      onClick={() => {
                                                            if (cartItem) {
                                                                  inCreaseQuantity(product.id);
                                                            } else {
                                                                  AddToCart(product);
                                                            }
                                                      }}
                                                      className="px-3 py-1 hover:bg-gray-200 text-gray-600 transition-all"
                                                >
                                                      +
                                                </button>
                                          </div>
                                    </div>

                                    {/* បន្ថែមប៊ូតុង Add to Cart ត្រង់ចំណុចនេះវិញ */}
                                    <div className="flex items-center gap-3">
                                          <button
                                                onClick={() => AddToCart(product)}
                                                className="flex-1 py-3.5 bg-gray-900 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                                          >
                                                Add to Cart 🛒
                                          </button>
                                          <button className="p-3.5 border border-gray-200 hover:border-red-400 hover:text-red-500 rounded-xl transition-all text-gray-600">
                                                ❤️
                                          </button>
                                    </div>
                              </div>
                        </div>

                  </div>
                  {/* ================================= Description & Details Section ============================================= */}
                  <div className="flex flex-col lg:flex-row gap-6 pt-6">

                        {/* ផ្នែកខាងឆ្វេង៖ Tab (Description, Reviews, Company, Usage Guide) */}
                        <div className="flex-[2] bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col space-y-4">
                              {/* Tab Headers */}
                              <div className="flex gap-4 border-b border-gray-100 pb-3 text-sm font-semibold">
                                    <button
                                          onClick={() => setActiveTab("description")}
                                          className={`pb-2 transition-colors ${activeTab === "description" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-800"}`}
                                    >
                                          Description
                                    </button>
                                    <button
                                          onClick={() => setActiveTab("reviews")}
                                          className={`pb-2 transition-colors ${activeTab === "reviews" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-800"}`}
                                    >
                                          Reviews
                                    </button>
                                    <button
                                          onClick={() => setActiveTab("company")}
                                          className={`pb-2 transition-colors ${activeTab === "company" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-800"}`}
                                    >
                                          Company Info
                                    </button>
                                    <button
                                          onClick={() => setActiveTab("usage")}
                                          className={`pb-2 transition-colors ${activeTab === "usage" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-800"}`}
                                    >
                                          Usage Guide
                                    </button>
                              </div>

                              {/* Tab Content */}
                              <div className="text-sm text-gray-600 leading-relaxed">
                                    {activeTab === "description" && (
                                          <div className="space-y-6 text-sm text-gray-600">
                                                {/* 1. Description លម្អិត */}
                                                <div className="space-y-3">
                                                      <h3 className="font-bold text-gray-800 text-base">Detailed Product Overview</h3>
                                                      <p className="leading-relaxed">
                                                            {product.desc || "No additional detailed information is available for this product yet. This product is meticulously designed with high-quality materials to ensure durability and powerful performance for your daily use."}
                                                      </p>
                                                      <p className="leading-relaxed">
                                                            Whether for office work, gaming, or entertainment, it can seamlessly and quickly meet all your demands.
                                                      </p>

                                                      {/* Key Highlights */}
                                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                                                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-start gap-2">
                                                                  <span className="text-blue-600 font-bold">✔</span>
                                                                  <span>High performance with smooth and lag-free operation.</span>
                                                            </div>
                                                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-start gap-2">
                                                                  <span className="text-blue-600 font-bold">✔</span>
                                                                  <span>Energy-efficient with long-lasting battery life.</span>
                                                            </div>
                                                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-start gap-2">
                                                                  <span className="text-blue-600 font-bold">✔</span>
                                                                  <span>Slim and lightweight design, easy to carry anywhere.</span>
                                                            </div>
                                                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-start gap-2">
                                                                  <span className="text-blue-600 font-bold">✔</span>
                                                                  <span>Advanced cooling system to maintain optimal temperature.</span>
                                                            </div>
                                                      </div>
                                                </div>

                                                {/* 2. Specification Table (RAM, CPU, GPU, SSD) */}
                                                <div className="space-y-3 pt-2">
                                                      <h3 className="font-bold text-gray-800 text-base">Technical Specifications</h3>
                                                      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                                            <table className="w-full text-left border-collapse text-xs md:text-sm">
                                                                  <tbody>
                                                                        <tr className="border-b border-gray-200 bg-gray-50">
                                                                              <td className="py-3 px-4 font-semibold text-gray-700 w-1/3">Processor (CPU)</td>
                                                                              <td className="py-3 px-4 text-gray-600 font-medium">{product.cpu || "Intel Core i7 / AMD Ryzen 7"}</td>
                                                                        </tr>
                                                                        <tr className="border-b border-gray-200">
                                                                              <td className="py-3 px-4 font-semibold text-gray-700">Memory (RAM)</td>
                                                                              <td className="py-3 px-4 text-gray-600 font-medium">{product.ram || "16GB DDR5"}</td>
                                                                        </tr>
                                                                        <tr className="border-b border-gray-200 bg-gray-50">
                                                                              <td className="py-3 px-4 font-semibold text-gray-700">Storage (SSD)</td>
                                                                              <td className="py-3 px-4 text-gray-600 font-medium">{product.ssd || "512GB NVMe M.2 SSD"}</td>
                                                                        </tr>
                                                                        <tr className="border-b border-gray-200">
                                                                              <td className="py-3 px-4 font-semibold text-gray-700">Graphics (GPU)</td>
                                                                              <td className="py-3 px-4 text-gray-600 font-medium">{product.gpu || "NVIDIA GeForce RTX 4060"}</td>
                                                                        </tr>
                                                                        <tr className="border-b border-gray-200 bg-gray-50">
                                                                              <td className="py-3 px-4 font-semibold text-gray-700">Display (Screen)</td>
                                                                              <td className="py-3 px-4 text-gray-600 font-medium">{product.display || "15.6\" FHD (1920 x 1080) 144Hz IPS"}</td>
                                                                        </tr>
                                                                        <tr className="border-b border-gray-200">
                                                                              <td className="py-3 px-4 font-semibold text-gray-700">Operating System</td>
                                                                              <td className="py-3 px-4 text-gray-600 font-medium">{product.os || "Windows 11 Home License"}</td>
                                                                        </tr>
                                                                        <tr className="border-b border-gray-200 bg-gray-50">
                                                                              <td className="py-3 px-4 font-semibold text-gray-700">Battery & Power</td>
                                                                              <td className="py-3 px-4 text-gray-600 font-medium">{product.battery || "3-Cell Lithium-Ion, up to 6-8 hours"}</td>
                                                                        </tr>
                                                                        <tr className="border-b border-gray-200">
                                                                              <td className="py-3 px-4 font-semibold text-gray-700">Weight & Design</td>
                                                                              <td className="py-3 px-4 text-gray-600 font-medium">{product.weight || "Approx. 1.85 kg, Slim Aluminum Body"}</td>
                                                                        </tr>
                                                                        <tr className="bg-gray-50">
                                                                              <td className="py-3 px-4 font-semibold text-gray-700">Ports & Connectivity</td>
                                                                              <td className="py-3 px-4 text-gray-600 font-medium">{product.ports || "USB-C, USB 3.2, HDMI, Wi-Fi 6, Bluetooth 5.2"}</td>
                                                                        </tr>
                                                                  </tbody>
                                                            </table>
                                                      </div>
                                                </div>
                                          </div>
                                    )}
                                    {activeTab === "reviews" && (
                                          <div className="space-y-6">
                                                {/* Header */}
                                                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                                                      <div>
                                                            <h3 className="font-bold text-gray-800 text-base">Customer Reviews</h3>
                                                            <p className="text-xs text-gray-500 mt-0.5">See what other buyers have to say about this product.</p>
                                                      </div>
                                                      <div className="flex items-center gap-1 text-amber-500 font-semibold text-sm">
                                                            <span>★ 4.8</span>
                                                            <span className="text-gray-400 text-xs font-normal">(24 Reviews)</span>
                                                      </div>
                                                </div>

                                                {/* Reviews List or Empty State */}
                                                {product.reviews && product.reviews.length > 0 ? (
                                                      <div className="space-y-4">
                                                            {product.reviews.map((review, index) => (
                                                                  <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
                                                                        <div className="flex items-center justify-between">
                                                                              <span className="font-semibold text-gray-800 text-sm">{review.name || "Anonymous User"}</span>
                                                                              <span className="text-xs text-gray-400">{review.date || "Recently"}</span>
                                                                        </div>
                                                                        <div className="text-amber-500 text-xs">
                                                                              {"★".repeat(review.rating || 5)}{"☆".repeat(5 - (review.rating || 5))}
                                                                        </div>
                                                                        <p className="text-sm text-gray-600 leading-relaxed">
                                                                              {review.comment || "Great product! Highly recommended."}
                                                                        </p>
                                                                  </div>
                                                            ))}
                                                      </div>
                                                ) : (
                                                      <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200 space-y-2">
                                                            <p className="text-gray-400 text-2xl">💬</p>
                                                            <p className="text-sm text-gray-600 font-medium">No reviews or ratings from customers yet.</p>
                                                            <p className="text-xs text-gray-400">Be the first to review this product!</p>
                                                      </div>
                                                )}
                                          </div>
                                    )}
                                    {activeTab === "company" && (
                                          <div className="space-y-4">
                                                <div className="space-y-2">
                                                      <h3 className="font-bold text-gray-800 text-base">Manufacturer & Brand Information</h3>
                                                      <p className="text-sm text-gray-600 leading-relaxed">
                                                            This product is officially distributed and manufactured by <strong className="text-gray-800">{product.brand || "Official Store"}</strong>, a globally recognized brand renowned for cutting-edge technology, premium build quality, and exceptional reliability.
                                                      </p>
                                                </div>

                                                {/* Company Highlights / Perks */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                                                      <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 space-y-1">
                                                            <p className="font-semibold text-gray-800 text-xs flex items-center gap-1.5">
                                                                  <span>🛡️</span> Official Warranty
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                  Comes with a 1-year international manufacturer warranty covering hardware defects.
                                                            </p>
                                                      </div>
                                                      <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 space-y-1">
                                                            <p className="font-semibold text-gray-800 text-xs flex items-center gap-1.5">
                                                                  <span>⭐</span> Quality Assurance
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                  Rigorous factory testing ensures 100% genuine parts and supreme performance.
                                                            </p>
                                                      </div>
                                                      <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 space-y-1">
                                                            <p className="font-semibold text-gray-800 text-xs flex items-center gap-1.5">
                                                                  <span>🌍</span> Global Standard
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                  Built according to international safety, environmental, and tech regulations.
                                                            </p>
                                                      </div>
                                                      <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 space-y-1">
                                                            <p className="font-semibold text-gray-800 text-xs flex items-center gap-1.5">
                                                                  <span>🛠️</span> Customer Support
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                  Dedicated 24/7 technical assistance and authorized service center support available.
                                                            </p>
                                                      </div>
                                                </div>
                                          </div>
                                    )}
                                    {activeTab === "usage" && (
                                          <div className="space-y-4">
                                                <div className="space-y-2">
                                                      <h3 className="font-bold text-gray-800 text-base">Usage Guide & Maintenance Tips</h3>
                                                      <p className="text-sm text-gray-600 leading-relaxed">
                                                            To ensure optimal performance and prolong the lifespan of your device, please follow these essential guidelines for setup, usage, and routine care.
                                                      </p>
                                                </div>

                                                {/* Steps or Tips Grid */}
                                                <div className="space-y-3 pt-2">
                                                      <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 flex items-start gap-3">
                                                            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full font-bold text-xs flex items-center justify-center">1</span>
                                                            <div className="space-y-0.5 text-xs">
                                                                  <p className="font-semibold text-gray-800">Initial Setup & Charging</p>
                                                                  <p className="text-gray-500">Charge the device fully for at least 4 to 6 hours before your first initial use to calibrate the battery properly.</p>
                                                            </div>
                                                      </div>

                                                      <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 flex items-start gap-3">
                                                            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full font-bold text-xs flex items-center justify-center">2</span>
                                                            <div className="space-y-0.5 text-xs">
                                                                  <p className="font-semibold text-gray-800">Proper Ventilation</p>
                                                                  <p className="text-gray-500">Always place the laptop on a flat, hard surface to maintain airflow and prevent overheating during heavy tasks or gaming.</p>
                                                            </div>
                                                      </div>

                                                      <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 flex items-start gap-3">
                                                            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full font-bold text-xs flex items-center justify-center">3</span>
                                                            <div className="space-y-0.5 text-xs">
                                                                  <p className="font-semibold text-gray-800">Software Updates</p>
                                                                  <p className="text-gray-500">Keep your Operating System, drivers, and security software updated regularly to ensure maximum safety and speed.</p>
                                                            </div>
                                                      </div>

                                                      <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 flex items-start gap-3">
                                                            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full font-bold text-xs flex items-center justify-center">4</span>
                                                            <div className="space-y-0.5 text-xs">
                                                                  <p className="font-semibold text-gray-800">Safe Cleaning</p>
                                                                  <p className="text-gray-500">Use a soft, microfiber cloth slightly dampened with screen cleaner. Never spray liquid directly onto the screen or keyboard.</p>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    )}
                              </div>
                        </div>

                        {/* ផ្នែកខាងស្តាំ៖ Shop + Map + Delivery */}
                        <div className="flex-1 flex flex-col space-y-4">
                              {/* Store Information with Logo */}
                              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-3">
                                    {/* Store Logo & Name */}
                                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                                          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                                                {/* ជំនួស src ដោយ Link Logo ហាងរបស់អ្នក ឬប្រើ Icon */}
                                                <img
                                                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRREnjwsZH4W0bmyFAEBq0qDs3B6uj79hevqKRDKXrpGA&s=10"
                                                      alt="Store Logo"
                                                      className="w-full h-full object-cover"
                                                />
                                          </div>
                                          <div>
                                                <h3 className="text-sm font-bold text-gray-800">TechStore Official</h3>
                                                <p className="text-xs text-gray-400">Authorized Dealer</p>
                                          </div>
                                    </div>

                                    <p className="text-xs text-gray-600">Main Branch: Monivong Blvd, Phnom Penh, Cambodia</p>

                                    {/* Google Map Integration */}
                                    <div className="w-full h-32 bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                                          <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3796677.8796537295!2d102.34015706415977!3d12.132909494407718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310787bfd4dc3743%3A0xe4b7bfe089f41253!2sCambodia!5e1!3m2!1sen!2skh!4v1787363961746!5m2!1sen!2skh"
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen=""
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                          ></iframe>
                                    </div>
                              </div>

                              {/* Delivery Options */}
                              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-2">
                                    <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                          🚀 Delivery Options
                                    </h3>
                                    <p className="text-xs text-gray-600">Express delivery within 24 hours across Phnom Penh and provinces.</p>
                                    <p className="text-xs text-emerald-600 font-semibold">Shipping Fee: Calculated at checkout or FREE during special promotions!</p>
                              </div>
                        </div>

                  </div>
            </section>
      )
}