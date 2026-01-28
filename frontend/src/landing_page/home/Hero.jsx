import React from 'react'

function Hero( ) {
    return(
        <div className="min-h-48 flex flex-col items-center justify-center px-4 py-6 md:py-6">
            {/* Image Section */}
            <div className="flex justify-center mt-6 md:mt-8">
                <img 
                    src="media/images/homeHero.png" 
                    alt="hero image"
                    className="w-full md:max-w-3xl lg:max-w-4xl h-auto object-cover hover:scale-101 transition-transform duration-500"
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col items-center text-center mt-4 md:mt-10 space-y-2 md:space-y-3 lg:space-y-4">
                <h1 className="text-lg md:text-3xl lg:text-4xl m-2 font-bold text-gray-900 leading-tight">
                    Invest in everything
                </h1>

                <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
                    Online platform to invest in stocks, derivatives, mutual funds, and more
                </p>

                <button className="text-sm md:text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-4 md:mt-6 px-6 py-2 sm:px-12 sm:py-2 md:px-25 md:py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:cursor-pointer">
                    Sign up
                </button>
            </div>
        </div>
    );
}

export default Hero;