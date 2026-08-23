export default function Contact_Support() {
      return (
            <section className="relative w-full py-20 text-gray-900 px-4 overflow-hidden">
                  <div className="max-w-7xl mx-auto relative z-10">
                        {/* ចំណងជើងផ្នែក */}
                        <div className="text-center mb-16">
                              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider text-gray-900">
                                    Get In <span className="text-blue-600">Touch</span>
                              </h2>
                              <p className="mt-4 text-gray-600 text-sm md:text-base max-w-xl mx-auto">
                                    Have questions about custom gaming rigs or need technical support? Drop us a message and our team will get back to you instantly.
                              </p>
                        </div>

                        {/* ផ្នែកមាតិកា (Grid ២ ផ្នែក) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                              {/* ផ្នែកទី១៖ ព័ត៌មានទំនាក់ទំនង (Contact Info) */}
                              <div className="space-y-8 bg-gray-50 border border-gray-200 p-8 rounded-2xl shadow-lg">
                                    <h3 className="text-xl font-bold uppercase tracking-wider text-gray-900">Contact Information</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                          Reach out to us through any of the channels below, or visit our store to test out our custom high-performance gaming laptops.
                                    </p>

                                    <div className="space-y-6">
                                          {/* ទីតាំង */}
                                          <div className="flex items-start space-x-4">
                                                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl border border-blue-200">
                                                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                      </svg>
                                                </div>
                                                <div>
                                                      <h4 className="text-sm font-bold text-gray-900">Location</h4>
                                                      <p className="text-gray-600 text-sm mt-1">Phnom Penh, Cambodia</p>
                                                </div>
                                          </div>

                                          {/* អ៊ីមែល */}
                                          <div className="flex items-start space-x-4">
                                                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl border border-blue-200">
                                                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                      </svg>
                                                </div>
                                                <div>
                                                      <h4 className="text-sm font-bold text-gray-900">Email Us</h4>
                                                      <p className="text-gray-600 text-sm mt-1">support@gamingpower.com</p>
                                                </div>
                                          </div>

                                          {/* លេខទូរសព្ទ */}
                                          <div className="flex items-start space-x-4">
                                                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl border border-blue-200">
                                                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                      </svg>
                                                </div>
                                                <div>
                                                      <h4 className="text-sm font-bold text-gray-900">Call Us</h4>
                                                      <p className="text-gray-600 text-sm mt-1">+855 12 345 678</p>
                                                </div>
                                          </div>
                                    </div>
                              </div>

                              {/* ផ្នែកទី២៖ ទម្រង់ផ្ញើសារ (Contact Form) */}
                              <form className="bg-gray-50 border border-gray-200 p-8 rounded-2xl shadow-lg space-y-6" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                          <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Your Name</label>
                                                <input
                                                      type="text"
                                                      placeholder="John Doe"
                                                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-600 transition-colors"
                                                />
                                          </div>
                                          <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Your Email</label>
                                                <input
                                                      type="email"
                                                      placeholder="john@example.com"
                                                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-600 transition-colors"
                                                />
                                          </div>
                                    </div>

                                    <div>
                                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Subject</label>
                                          <input
                                                type="text"
                                                placeholder="Custom Build Inquiry"
                                                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-600 transition-colors"
                                          />
                                    </div>

                                    <div>
                                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Message</label>
                                          <textarea
                                                rows="4"
                                                placeholder="Tell us about your dream specs..."
                                                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-600 transition-colors resize-none"
                                          ></textarea>
                                    </div>

                                    <button
                                          type="submit"
                                          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-widest transition-all duration-300 rounded-xl shadow-md"
                                    >
                                          Send Message
                                    </button>
                              </form>

                        </div>
                  </div>
            </section>
      );
}