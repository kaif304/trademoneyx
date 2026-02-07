import React from 'react'

function Hero( ) {
    return(
        <section className='hero-section mb-20'>
            <div className='px-32'>
                <div className='text-center grid gap-4 pt-16 pb-16 border-b border-gray-300'>
                    <h1 className='text-xl sm:text-3xl lg:text-4xl font-semibold text-black'>Pricing</h1>
                    <h3 className='text-xl text-gray-600 font-medium'>Free equity investments and flat <i className='fa-solid fa-indian-rupee-sign text-[1rem]'></i>20 traday and F&O trades</h3>
                </div>
            </div>
            <div className='grid grid-cols-12 px-16 mt-14 place-items-center text-center'>
                <div className="col-span-4 px-18 grid place-items-center">
                    <img className='h-48 mb-1' src="media/images/pricingEquity.svg" alt="Product image" />
                    <h1 className={`text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 mt-2`}>
                        Free equity delivery
                    </h1>   
                    <p className='text-sm text-gray-500 font-medium'>
                        All equity delivery investments NSE, BSE, are absolutely free - <i className='fa-solid fa-indian-rupee-sign text-[0.8rem]'></i>0 brokerage.
                    </p>
                </div>
                <div className="col-span-4 px-18 grid place-items-center">
                    <img className='h-48 mb-1' src="media/images/intradayTrades.svg" alt="Product image" />
                    <h1 className={`text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 mt-2`}>
                        Intraday and F&O trades
                    </h1>   
                    <p className='text-sm text-gray-500 font-medium'>
                        Flat Rs.20 or 0.03% per executed order on intraday trades across quity, currency, 
                        and commodity trades.
                    </p>
                </div>
                <div className="col-span-4 px-18 grid place-items-center">
                    <img className='h-48 mb-1' src="media/images/pricingEquity.svg" alt="Product image" />
                    <h1 className={`text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 mt-2`}>
                        Free direct MF
                    </h1>   
                    <p className='text-sm text-gray-500 font-medium'>
                        All direct mutual fund investments are absolutely free - 
                        <i className='fa-solid fa-indian-rupee-sign text-[0.8rem]'></i>
                        0 commissions & DP charges.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Hero;