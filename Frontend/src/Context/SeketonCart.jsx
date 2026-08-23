export default function SeketonCart() {
      return (
            <div className="border border-gray-100 p-3 rounded-xl shadow-sm bg-white flex flex-col justify-between h-full animate-pulse">
                  <div>
                        {/* Skeleton for Image */}
                        <div className="w-full h-44 bg-gray-200 rounded-lg"></div>

                        {/* Skeleton for Name & Meta */}
                        <div className="mt-3 flex flex-col gap-2">
                              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                              <div className="flex items-center justify-between">
                                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                              </div>
                              {/* Skeleton for Description */}
                              <div className="h-3 bg-gray-200 rounded w-full mt-1"></div>
                              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                        </div>
                  </div>

                  {/* Skeleton for Price, Rating & Button */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col gap-2.5">
                        <div className="flex items-center justify-between">
                              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                        </div>
                        <div className="h-8 bg-gray-200 rounded-lg w-full"></div>
                  </div>
            </div>
      )
}