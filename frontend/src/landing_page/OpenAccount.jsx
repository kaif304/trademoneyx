import React from 'react'

function OpenAccount( ) {
    return(
        <div className="flex flex-col items-center text-center mt-4 md:mt-10 space-y-2 md:space-y-3 lg:space-y-4">
            <h1 className="text-lg md:text-3xl lg:text-4xl m-2 font-bold text-gray-900 leading-tight">
                Open a Zerodha account
            </h1>

            <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
                Modern platforms and apps, 0 investments, and flat 20 intraday and F&O trades.
            </p>

            <button className="text-sm md:text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-4 md:mt-6 px-6 py-2 sm:px-12 sm:py-2 md:px-25 md:py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:cursor-pointer">
                Sign up Now
            </button>
        </div>
    );
}

export default OpenAccount;