import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // បន្ថែម Framer Motion
import Zonkhmer from "../../assets/Logo/ZonKhmer.jpg";
import { MdCloseFullscreen } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import ButtonLogin from "../UI/ButtonLogin";
import ShoppingCart from "../UI/ShoppingCart";

export default function Navbar() {
      const [scrolled, setScrolled] = useState(false);

      useEffect(() => {
            const handleScroll = () => {
                  setScrolled(window.scrollY > 50);
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
      }, []);

      const menuList = [
            { name: "home", path: "/" },
            { name: "shop", path: "/shop" },
            { name: "contact", path: "/contact" },
      ];

      const [clickMenu, setLClickMenu] = useState(false);

      return (
            <section className={`w-full fixed top-0 left-0 z-50 shadow-sm backdrop-blur-sm transition-all duration-300 shadow-gray-500 ${scrolled ? "bg-[#0F2942]" : "bg-blue-700"}`}>
                  <main className="flex items-center justify-between h-14 container mx-auto px-4">

                        {/* ================================= Logo =============================== */}
                        <div className="flex items-center gap-2">
                              <Link to={'/'} className="flex items-center gap-2">
                                    <img src={Zonkhmer} alt="" className="w-10 h-10 rounded-full hover:rotate-3 duration-300 transition-all object-center object-cover" />
                                    <h3 className="text-lg font-bold text-sky-500 uppercase">Compu<span className="text-[#C49A45]">ter</span></h3>
                              </Link>
                        </div>

                        {/* ================================= menuList (Desktop) =========================== */}
                        <div className="hidden md:block">
                              <div className="flex items-center gap-6">
                                    {
                                          menuList.map((item) => {
                                                const { name, path } = item;
                                                return (
                                                      <NavLink
                                                            key={name}
                                                            to={path}
                                                            className={({ isActive }) =>
                                                                  `capitalize group transition-all duration-300 font-semibold heading relative py-1 ${isActive
                                                                        ? "text-sky-500 font-bold"
                                                                        : "text-gray-700 hover:text-sky-400"
                                                                  }`
                                                            }
                                                      >
                                                            {({ isActive }) => (
                                                                  <>
                                                                        <h3>{name}</h3>
                                                                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-sky-500 transition-all duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                                                                  </>
                                                            )}
                                                      </NavLink>
                                                );
                                          })
                                    }
                              </div>
                        </div>

                        {/* ================================= ClickMenu =========================== */}
                        <div className="flex items-center gap-3">
                              {/* ------------- ShoppingCart ---------------------- */}
                              <div>
                                    <ShoppingCart />
                              </div>
                              {/* ------------- ButtonLogin ---------------------- */}
                              <div>
                                    <ButtonLogin />
                              </div>
                              {/* ------------- ClickMenu (Mobile) ---------------------- */}
                              <button onClick={() => setLClickMenu(!clickMenu)} className="duration-300 transition-all md:hidden p-1">
                                    {
                                          clickMenu ?
                                                <MdCloseFullscreen size={23} className=" text-white font-bold"/>
                                                :
                                                <CiMenuFries size={23} className=" text-white font-bold" />
                                    }
                              </button>
                        </div>
                  </main>

                  {/* ================================= Mobile Menu Dropdown (Motion) =========================== */}
                  <AnimatePresence>
                        {clickMenu && (
                              <motion.div
                                    initial={{ opacity: 0, height: 0, y: -10 }}
                                    animate={{ opacity: 1, height: "auto", y: 0 }}
                                    exit={{ opacity: 0, height: 0, y: -10 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="md:hidden bg-white border-t border-gray-100 shadow-lg px-4 py-4 flex flex-col gap-3 overflow-hidden"
                              >
                                    {menuList.map((item) => (
                                          <NavLink
                                                key={item.name}
                                                to={item.path}
                                                onClick={() => setLClickMenu(false)}
                                                className={({ isActive }) =>
                                                      `capitalize font-medium py-2 px-3 rounded-r-lg transition-all duration-200 border-l-4 ${isActive
                                                            ? "text-sky-500 font-bold bg-sky-50 border-sky-500"
                                                            : "text-gray-600 hover:bg-gray-50 border-transparent hover:border-gray-300"
                                                      }`
                                                }
                                          >
                                                {item.name}
                                          </NavLink>
                                    ))}
                              </motion.div>
                        )}
                  </AnimatePresence>
            </section>
      );
}