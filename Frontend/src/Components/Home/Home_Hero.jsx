import video from "../../assets/Hero/257927_medium.mp4"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

export default function Home_Hero() {
      const fullText = "Unleash Your Elegance With Every Spray";
      const [displayedText, setDisplayedText] = useState("");
      const [index, setIndex] = useState(0);
      const [isDeleting, setIsDeleting] = useState(false);

      useEffect(() => {
            const speed = isDeleting ? 50 : 100; // ល្បឿនពេលលុបលឿនជាងពេលវាយអក្សរ

            const timer = setTimeout(() => {
                  if (!isDeleting && index <= fullText.length) {
                        setDisplayedText(fullText.substring(0, index));
                        setIndex((prev) => prev + 1);
                  } else if (isDeleting && index >= 0) {
                        setDisplayedText(fullText.substring(0, index));
                        setIndex((prev) => prev - 1);
                  }

                  // ពេលវាយអក្សរចប់សព្វគ្រប់ ឱ្យវាឈប់សម្រាកបន្តិចសិនចាំចាប់ផ្តើមលុប
                  if (!isDeleting && index > fullText.length) {
                        setTimeout(() => setIsDeleting(true), 100);
                  }
                  // ពេលលុបអស់ហើយ ឱ្យវាប្តូរមកវាយសារថ្មីឡើងវិញ
                  else if (isDeleting && index === 0) {
                        setIsDeleting(false);
                  }
            }, speed);

            return () => clearTimeout(timer);
      }, [index, isDeleting, fullText]);

      return (
            <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">

                  {/* Background Video */}
                  <video
                        src={video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

                  {/* Hero Content */}
                  <div className="relative z-10 container mx-auto px-4 max-w-7xl text-center flex flex-col items-center space-y-6">

                        <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                              Discover Signature Scents
                        </span>

                        {/* Typewriter Loop Effect Text */}
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight max-w-3xl leading-tight min-h-[1.2em]">
                              {displayedText}
                              <span className="animate-pulse">|</span>
                        </h1>

                        <p className="text-sm sm:text-base text-gray-200 max-w-xl leading-relaxed">
                              Explore our exclusive collection of luxury perfumes crafted to leave a lasting impression wherever you go.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                              <Link
                                    to="/shop"
                                    className="flex items-center gap-2 bg-gradient-to-tr from-blue-700 to-sky-600 text-white font-semibold text-sm px-8 py-3.5 rounded-2xl shadow-lg hover:opacity-95 active:scale-95 transition-all"
                              >
                                    <span>Explore Collection</span>
                                    <ArrowRight className="w-4 h-4" />
                              </Link>
                        </div>

                  </div>
            </section>
      )
}