import { useContext } from "react"
import { ShopContext } from "../../Context/ShopContext"

export default function CartItems({ item }) {
      const { inCreaseQuantity, deCreaseQuantity, removeFormCart } = useContext(ShopContext)

      // បង្ហាញទិន្នន័យពិតក្នុង Console ដើម្បីមើលថា item មាន property អ្វីខ្លះ
      console.log("Cart Item Data:", item);

      if (!item) return null;

      // ទាញយកតម្លៃដោយទប់ស្កាត់គ្រប់ករណីទាំងអស់ (price, cost, retailPrice...)
      const rawPrice = item.price ?? item.cost ?? item.retailPrice ?? 0;
      const price = parseFloat(String(rawPrice).replace(/[^0-9.-]+/g, "")) || 0;

      const amount = item.amount || 1;
      const itemSubtotal = price * amount;

      // ទាញយកឈ្មោះ និងរូបភាពតាមគ្រប់លទ្ធភាព
      const itemName = item.name || item.title || item.productName || "Product Name";
      const itemImage = item.image || item.img || "https://via.placeholder.com/60";

      return (
            <tr className="hover:bg-gray-50/50 transition-all border-b border-gray-100 text-sm text-gray-700">
                  {/* រូបភាពផលិតផល */}
                  <td className="py-4 px-4">
                        <img
                              src={itemImage}
                              alt={itemName}
                              className="w-14 h-14 object-cover rounded-lg border border-gray-200 shadow-xs"
                        />
                  </td>

                  {/* ឈ្មោះផលិតផល */}
                  <td className="py-4 px-4 font-semibold text-gray-900 max-w-[200px] truncate">
                        {itemName}
                  </td>

                  {/* តម្លៃរាយ */}
                  <td className="py-4 px-4 font-medium text-gray-600">
                        ${price.toFixed(2)}
                  </td>

                  {/* ប៊ូតុងបន្ថែម/បន្ថយចំនួន */}
                  <td className="py-4 px-4">
                        <div className="inline-flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden shadow-xs">
                              <button
                                    onClick={() => deCreaseQuantity(item.id)}
                                    className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                              >
                                    -
                              </button>
                              <span className="px-3 py-1 font-semibold text-gray-800 text-xs">
                                    {amount}
                              </span>
                              <button
                                    onClick={() => inCreaseQuantity(item.id)}
                                    className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                              >
                                    +
                              </button>
                        </div>
                  </td>

                  {/* តម្លៃសរុបតាមមុខទំនិញនីមួយៗ (Item Subtotal) */}
                  <td className="py-4 px-4 font-bold text-sky-600">
                        ${itemSubtotal.toFixed(2)}
                  </td>

                  {/* ប៊ូតុងលុបទំនិញចេញពីកន្ត្រក */}
                  <td className="py-4 px-4 text-center">
                        <button
                              onClick={() => removeFormCart(item.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                              title="Remove item"
                        >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                              </svg>
                        </button>
                  </td>
            </tr>
      )
}