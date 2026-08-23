import { useState, useEffect } from "react";
import bg_hero from "../../assets/Image/bg_hero.jpg";
import img_hero from "../../assets/Image/img_hero.png";
import { Link } from "react-router-dom";

export default function Home_Hero() {
      const fullText = "UNLEASH ULTIMATE\nGAMING POWER";
      const [displayedText, setDisplayedText] = useState("");
      const [index, setIndex] = useState(0);

      useEffect(() => {
            const timer = setTimeout(() => {
                  if (index < fullText.length) {
                        // វាយអក្សរចូលម្តងមួយតួ
                        setDisplayedText(fullText.substring(0, index + 1));
                        setIndex(index + 1);
                  } else {
                        // វាយចប់ហើយ រង់ចាំ 500ms (កន្លះវិនាទី) សឹមចាប់ផ្តើមសារថ្មីភ្លាម
                        setTimeout(() => {
                              setDisplayedText("");
                              setIndex(0);
                        }, 500);
                  }
            }, 100); // កំណត់ល្បឿនវាយអក្សរ (100ms គឺលឿនបន្តិច និងស្អាត)

            return () => clearTimeout(timer);
      }, [index, fullText]);

      return (
            <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-20 pb-10 overflow-hidden bg-black text-white">
                  <div className="absolute inset-0 z-0">
                        <img src={bg_hero} alt="Gaming Background" className="w-full h-full object-cover opacity-40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                  </div>

                  <div className="relative z-10 flex flex-col items-center text-center px-4 w-full mt-12">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] min-h-[200px] whitespace-pre-line">
                              {displayedText}
                              <span className="inline-block w-2 md:w-3 h-8 md:h-12 bg-blue-500 ml-1 animate-pulse align-middle"></span>
                        </h1>

                        {/* បានពង្រីកអត្ថបទឱ្យវែង និងទាក់ទាញជាងមុន */}
                        <p className="mt-6 text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed">
                              Experience next-level gaming with our custom-built high-performance laptops. Engineered for extreme speed, stunning visuals, and absolute dominance to give you the ultimate winning edge in every battle.
                        </p>

                        <Link to={'/shop'}>
                              <button className="mt-8 px-10 py-3 border-2 border-blue-500 hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.7)] text-white font-bold uppercase tracking-widest transition-all duration-300 rounded-full">
                                    SHOP NOW
                              </button>
                        </Link>
                  </div>

                  <div className="relative z-10 mt-4 w-full max-w-4xl px-4 flex justify-center">
                        <div className="w-full transition-transform duration-500 hover:scale-105">
                              <img src={img_hero} alt="Featured Gaming Laptop" className="w-full h-auto drop-shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
                        </div>
                  </div>

                  <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-blue-900/30 to-transparent z-0"></div>
            </section>
      );
}