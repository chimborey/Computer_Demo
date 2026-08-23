import { Link } from "react-router-dom"
import CartItems from "../../Components/Cart/CartItems"
import { useContext, useState } from "react"
import { ShopContext } from "../../Context/ShopContext"
import Zonkhmer from "../../assets/Logo/Zonkhmer.jpg"
import { motion, AnimatePresence } from "framer-motion"
import qr from "../../assets/Image/qr.png"
export default function Cart() {
      const { cart, total, subTotal, clearCart, quantity } = useContext(ShopContext)

      const [viewsPay, setViewsPay] = useState(false)
      const [modalStep, setModalStep] = useState(1) // គ្រប់គ្រងជំហានក្នុង Modal (1, 2, 3)

      // State សម្រាប់ព័ត៌មានដឹកជញ្ជូនក្នុង Modal
      const [shippingInfo, setShippingInfo] = useState({
            fullName: "",
            phone: "",
            address: ""
      })

      const handleShippingChange = (e) => {
            setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value })
      }

      return (
            <section className="w-full overflow-hidden py-14 relative">
                  <main className="mt-12 container mx-auto md:max-w-7xl px-4">
                        {/* ====================== Products & Summary ========================= */}
                        <div className="flex flex-col lg:flex-row gap-6">

                              {/* Left: ShoppingCart Items Table */}
                              <div className="flex-[2] flex flex-col space-y-3 py-4 px-4 rounded-xl shadow-sm backdrop-blur-sm shadow-gray-200 border border-gray-100 bg-white/50">
                                    <h2 className="text-lg font-bold text-gray-800 mb-2">Shopping Cart</h2>
                                    <div className="h-[530px] w-full overflow-y-auto no-scrollbar">
                                          <table className="w-full text-left border-collapse">
                                                <thead className="sticky top-0 bg-white shadow-sm z-10 text-gray-600 uppercase text-xs">
                                                      <tr>
                                                            <th className="py-3 px-4">Products</th>
                                                            <th className="py-3 px-4">Name</th>
                                                            <th className="py-3 px-4">Price</th>
                                                            <th className="py-3 px-4">Quantity</th>
                                                            <th className="py-3 px-4">Subtotal</th>
                                                            <th className="py-3 px-4 text-center">Action</th>
                                                      </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100">
                                                      {
                                                            cart.length > 0 ? (
                                                                  cart.map((item) => (
                                                                        <CartItems key={String(item.id)} item={item} />
                                                                  ))
                                                            ) : (
                                                                  <tr>
                                                                        <td colSpan="6" className="text-center py-12 text-gray-500 font-medium">
                                                                              Your cart is empty! 🛒
                                                                        </td>
                                                                  </tr>
                                                            )
                                                      }
                                                </tbody>
                                          </table>
                                    </div>
                              </div>

                              {/* Right: Cart Summary */}
                              <div className="flex-1 flex flex-col justify-between space-y-4 px-6 py-5 rounded-xl shadow-sm backdrop-blur-sm shadow-gray-200 border border-gray-100 bg-white/50">

                                    {/* Logo & Title */}
                                    <div>
                                          <div className="flex justify-between items-center mb-6">
                                                <h3 className="text-lg font-bold text-gray-800">Cart Summary</h3>
                                                <Link to={'/'} className="flex items-center gap-2">
                                                      <img src={Zonkhmer} alt="" className="w-10 h-10 rounded-full hover:rotate-3 duration-300 transition-all object-center object-cover" />
                                                      <h3 className="text-base font-bold text-sky-500 uppercase">Compu<span className="text-[#C49A45]">ter</span></h3>
                                                </Link>
                                          </div>

                                          {/* Subtotal & Total Details */}
                                          <div className="space-y-3 text-sm text-gray-600 border-b border-gray-100 pb-4">
                                                <div className="flex justify-between">
                                                      <span>Items Count:</span>
                                                      <span className="font-semibold text-gray-800">{quantity || 0}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                      <span>Subtotal:</span>
                                                      <span className="font-semibold text-gray-800">${subTotal || 0}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                      <span>Delivery:</span>
                                                      <span className="font-semibold text-green-600">$2</span>
                                                </div>
                                          </div>

                                          <div className="flex justify-between items-center py-4 text-base font-bold text-gray-900">
                                                <span>Total:</span>
                                                <span className="text-sky-600 text-lg">${total.toFixed(2)}</span>
                                          </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-2">
                                          {cart.length > 0 && (
                                                <button
                                                      onClick={clearCart}
                                                      className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg transition-all text-sm cursor-pointer"
                                                >
                                                      Clear Cart 🗑️
                                                </button>
                                          )}

                                          <Link
                                                to="/shop"
                                                className="block w-full text-center py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all text-sm"
                                          >
                                                Continue Shopping 🛍️
                                          </Link>

                                          <button
                                                disabled={cart.length === 0}
                                                onClick={() => {
                                                      setModalStep(1); // ពេលចុចឱ្យលោតចាប់ផ្តើមពីជំហានទី 1 ក្នុង Modal
                                                      setViewsPay(true);
                                                }}
                                                className={`w-full py-2.5 font-medium rounded-lg transition-all text-sm shadow-md ${cart.length === 0
                                                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                      : "bg-sky-500 hover:bg-sky-600 text-white cursor-pointer"
                                                      }`}
                                          >
                                                Proceed to Checkout 💳
                                          </button>
                                    </div>

                              </div>

                        </div>
                  </main>

                  {/* ====================== views Payment Modal (1 - 2 - 3 Connected Line Steps) ======================*/}
                  <AnimatePresence>
                        {viewsPay && (
                              <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
                              >
                                    <motion.div
                                          initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                          animate={{ scale: 1, opacity: 1, y: 0 }}
                                          exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                          transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
                                          className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-gray-100 space-y-5"
                                    >

                                          {/* Modal Header */}
                                          <div className="flex justify-between items-center border-b pb-3">
                                                <h3 className="text-lg font-bold text-gray-800">Checkout Process</h3>
                                                <button
                                                      onClick={() => setViewsPay(false)}
                                                      className="text-gray-400 hover:text-gray-600 font-bold text-lg cursor-pointer"
                                                >
                                                      ✕
                                                </button>
                                          </div>

                                          {/* ================= Step Indicator Bar (1 - 2 - 3) ================= */}
                                          <div className="flex items-center justify-center px-4">
                                                {/* Step 1 Indicator */}
                                                <div className="flex flex-col items-center">
                                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${modalStep >= 1 ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                                                            1
                                                      </div>
                                                      <span className="text-[11px] text-gray-600 mt-1">Review</span>
                                                </div>

                                                {/* Connecting Line 1-2 */}
                                                <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${modalStep >= 2 ? "bg-sky-500" : "bg-gray-200"}`} />

                                                {/* Step 2 Indicator */}
                                                <div className="flex flex-col items-center">
                                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${modalStep >= 2 ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                                                            2
                                                      </div>
                                                      <span className="text-[11px] text-gray-600 mt-1">Shipping</span>
                                                </div>

                                                {/* Connecting Line 2-3 */}
                                                <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${modalStep >= 3 ? "bg-sky-500" : "bg-gray-200"}`} />

                                                {/* Step 3 Indicator */}
                                                <div className="flex flex-col items-center">
                                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${modalStep >= 3 ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                                                            3
                                                      </div>
                                                      <span className="text-[11px] text-gray-600 mt-1">Payment</span>
                                                </div>
                                          </div>

                                          <AnimatePresence mode="wait">
                                                {/* ----------------- STEP 1: Review Order ----------------- */}
                                                {modalStep === 1 && (
                                                      <motion.div
                                                            key="step1"
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: 10 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="space-y-4"
                                                      >
                                                            <div className="bg-gray-50 p-3 rounded-xl text-sm space-y-2 max-h-48 overflow-y-auto no-scrollbar">
                                                                  {cart.map((item) => (
                                                                        <div key={item.id} className="flex justify-between items-center border-b border-gray-200 pb-2">
                                                                              <img src={item.image} alt="" className="w-12 h-12 object-cover object-center"/>
                                                                              <span className="text-gray-600 truncate w-36">{item?.name} x {item?.quantity}</span>
                                                                              <span className="font-semibold">{item.price}</span>
                                                                        </div>
                                                                  ))}
                                                            </div>
                                                            <div className="flex justify-between font-bold text-gray-800 text-sm px-1">
                                                                  <span>Total Amount:</span>
                                                                  <span className="text-sky-600">${total.toFixed(2)}</span>
                                                            </div>
                                                            <div className="flex gap-2 pt-2">
                                                                  <button
                                                                        onClick={() => setViewsPay(false)}
                                                                        className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl text-sm cursor-pointer"
                                                                  >
                                                                        Cancel
                                                                  </button>
                                                                  <button
                                                                        onClick={() => setModalStep(2)}
                                                                        className="flex-1 py-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl text-sm cursor-pointer"
                                                                  >
                                                                        Next ➡️
                                                                  </button>
                                                            </div>
                                                      </motion.div>
                                                )}

                                                {/* ----------------- STEP 2: Shipping Info ----------------- */}
                                                {modalStep === 2 && (
                                                      <motion.div
                                                            key="step2"
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: 10 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="space-y-3"
                                                      >
                                                            <div>
                                                                  <label className="text-xs font-medium text-gray-600">Full Name</label>
                                                                  <input
                                                                        type="text"
                                                                        name="fullName"
                                                                        value={shippingInfo.fullName}
                                                                        onChange={handleShippingChange}
                                                                        placeholder="ឈ្មោះអ្នកទទួល"
                                                                        className="w-full mt-1 p-2 border rounded-lg text-sm focus:outline-sky-500"
                                                                  />
                                                            </div>
                                                            <div>
                                                                  <label className="text-xs font-medium text-gray-600">Phone Number</label>
                                                                  <input
                                                                        type="text"
                                                                        name="phone"
                                                                        value={shippingInfo.phone}
                                                                        onChange={handleShippingChange}
                                                                        placeholder="លេខទូរសព្ទ"
                                                                        className="w-full mt-1 p-2 border rounded-lg text-sm focus:outline-sky-500"
                                                                  />
                                                            </div>
                                                            <div>
                                                                  <label className="text-xs font-medium text-gray-600">Address</label>
                                                                  <input
                                                                        type="text"
                                                                        name="address"
                                                                        value={shippingInfo.address}
                                                                        onChange={handleShippingChange}
                                                                        placeholder="ទីតាំង ឬ អាសយដ្ឋាន"
                                                                        className="w-full mt-1 p-2 border rounded-lg text-sm focus:outline-sky-500"
                                                                  />
                                                            </div>
                                                            <div className="flex gap-2 pt-2">
                                                                  <button
                                                                        onClick={() => setModalStep(1)}
                                                                        className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl text-sm cursor-pointer"
                                                                  >
                                                                        Back
                                                                  </button>
                                                                  <button
                                                                        onClick={() => {
                                                                              if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address) {
                                                                                    alert("សូមបំពេញព័ត៌មានដឹកជញ្ជូនឱ្យបានគ្រប់គ្រាន់!");
                                                                                    return;
                                                                              }
                                                                              setModalStep(3);
                                                                        }}
                                                                        className="flex-1 py-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl text-sm cursor-pointer"
                                                                  >
                                                                        Next ➡️
                                                                  </button>
                                                            </div>
                                                      </motion.div>
                                                )}

                                                {/* ----------------- STEP 3: KHQR Payment ----------------- */}
                                                {modalStep === 3 && (
                                                      <motion.div
                                                            key="step3"
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: 10 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="space-y-3"
                                                      >
                                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                                  <div className="bg-gray-50 p-2 rounded-xl border">
                                                                        <img
                                                                              src={qr}
                                                                              alt="QR Code"
                                                                              className="w-96 h-96 object-cover object-center rounded-lg"
                                                                        />
                                                                  </div>
                                                                  <p className="text-xs text-gray-600 text-center">
                                                                        សូមស្កេនដើម្បីបង់ប្រាក់ចំនួន <span className="font-bold text-sky-600">${total.toFixed(2)}</span>
                                                                  </p>
                                                            </div>
                                                            <div className="flex gap-2 pt-2">
                                                                  <button
                                                                        onClick={() => setModalStep(2)}
                                                                        className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl text-sm cursor-pointer"
                                                                  >
                                                                        Back
                                                                  </button>
                                                                  <button
                                                                        onClick={() => {
                                                                              clearCart();
                                                                              setViewsPay(false);
                                                                              setModalStep(1);
                                                                              alert("Payment Successful! 🎉");
                                                                        }}
                                                                        className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl text-sm cursor-pointer shadow-md"
                                                                  >
                                                                        Confirm ✅
                                                                  </button>
                                                            </div>
                                                      </motion.div>
                                                )}
                                          </AnimatePresence>

                                    </motion.div>
                              </motion.div>
                        )}
                  </AnimatePresence>
            </section>
      )
}