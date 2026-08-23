import Zokmher from "../../assets/Logo/Zonkhmer.jpg"


export function Footer_Footer() {
      return (
            <footer className=" border-t border-blue-900/40 pt-16 pb-8">
                  <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        {/* ផ្នែកទី១៖ ព័ត៌មានហាង */}
                        <div className="space-y-4">
                              <div className=" flex items-center gap-2">
                                    <img src={Zokmher} alt="" className="w-12 h-12 rounded-full object-cover object-center hover:rotate-6 duration-300 transition-all"/>
                                    <h2 className="text-2xl font-black uppercase tracking-wider text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">
                                          Computer
                                    </h2>
                              </div>
                              <p className="text-gray-400 text-sm leading-relaxed">
                                    Your ultimate destination for custom-built high-performance gaming laptops. Built to dominate every game.
                              </p>
                        </div>

                        {/* ផ្នែកទី២៖ តំណភ្ជាប់រហ័ស */}
                        <div className="space-y-4">
                              <h3 className="text-lg font-bold uppercase tracking-wider text-blue-700">Quick Links</h3>
                              <ul className="space-y-2 text-sm text-gray-400">
                                    <li><a href="#" className="hover:text-blue-500 transition-colors">Home</a></li>
                                    <li><a href="#" className="hover:text-blue-500 transition-colors">Products</a></li>
                                    <li><a href="#" className="hover:text-blue-500 transition-colors">Custom Build</a></li>
                                    <li><a href="#" className="hover:text-blue-500 transition-colors">Contact Us</a></li>
                              </ul>
                        </div>

                        {/* ផ្នែកទី៣៖ សេវាកម្មអតិថិជន */}
                        <div className="space-y-4">
                              <h3 className="text-lg font-bold uppercase tracking-wider text-blue-700">Support</h3>
                              <ul className="space-y-2 text-sm text-gray-400">
                                    <li><a href="#" className="hover:text-blue-500 transition-colors">Warranty Policy</a></li>
                                    <li><a href="#" className="hover:text-blue-500 transition-colors">Shipping & Returns</a></li>
                                    <li><a href="#" className="hover:text-blue-500 transition-colors">FAQ</a></li>
                                    <li><a href="#" className="hover:text-blue-500 transition-colors">Tech Support</a></li>
                              </ul>
                        </div>

                        {/* ផ្នែកទី៤៖ ទំនាក់ទំនង */}
                        <div className="space-y-4">
                              <h3 className="text-lg font-bold uppercase tracking-wider text-blue-700">Stay Connected</h3>
                              <p className="text-gray-400 text-sm">Subscribe to get special offers and updates on new gaming rigs.</p>
                              <div className="flex">
                                    <input
                                          type="email"
                                          placeholder="Enter your email"
                                          className="bg-gray-900 border border-gray-800 text-white px-4 py-2 text-sm rounded-l-full focus:outline-none focus:border-blue-500 w-full"
                                    />
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-sm font-bold rounded-r-full transition-colors">
                                          Join
                                    </button>
                              </div>
                        </div>
                  </div>

                  {/* ផ្នែកខាងក្រោមបង្អស់ (Copyright) */}
                  <div className="max-w-7xl mx-auto px-4 border-t border-gray-900 pt-6 flex flex-col md:flex-row items-center justify-between text-gray-500 text-xs">
                        <p>&copy; {new Date().getFullYear()} ZonKhmer. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                              <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
                              <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>
                        </div>
                  </div>
            </footer>
      );
}