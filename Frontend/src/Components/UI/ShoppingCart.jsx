import { useContext } from "react";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";

export default function ShoppingCart() {
      const { quantity } = useContext(ShopContext)
      return (
            <section className=" relative p-2 cursor-pointer">
                  <Link to={'/cart'}>
                        <MdOutlineShoppingCartCheckout size={27} className=" text-white hover:text-[#C2A45] duration-300 transition-all" />
                        <span className=" absolute -top-2 right-0 font-bold text-white">{quantity}</span>
                  </Link>
            </section>
      )
}