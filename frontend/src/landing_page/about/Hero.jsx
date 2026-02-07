import React from 'react'

function Hero( ) {
    return(
        <section className='hero-section'>
            <div className='px-2 sm:px-12 md:px-18 lg:px-32'>
                <div className='px-4 py-4 sm:py-8 md:py-18'>
                    <div className='text-center sm:text-2xl md:text-3xl text-gray-800 font-semibold'>
                        <h1>We pioneered the discount broking model in India.</h1>
                        <h1>Now, we are breaking ground with our technology.</h1>
                    </div>
                </div>

                <div className='grid grid-cols-12 md:gap-8 lg:gap-16 pt-6 sm:pt-10 md:pt-18 px-1 sm:px-2 md:px-4 lg:px-8 md:mb-8 border-t border-gray-300 text-gray-700 text-sm sm:text-md md:text-lg'>
                    <div className='col-span-12 md:col-span-6 grid gap-4'>
                        <p>
                            We kick-started operations on the 15th of August, 2010 
                            with the goal of breaking all barriers that traders and 
                            investors face in India in terms of cost, support, and technology.
                            We named the company TradeMoneyX, a combination of Trade and Money.
                        </p>
                        <p>
                            Today, our disruptive pricing models and hi-house technology have 
                            made us the biggest stock broker in India.
                        </p>
                        <p>
                            Over 1+ Lacks clients place millions of orders every day through 
                            our powerful ecosystem of investment platforms, contributing over 15% 
                            of all Indian retail trading volumes.
                        </p>
                    </div>
                    <div className='col-span-12 md:col-span-6 grid gap-4 hidden md:block'>
                        <p>
                            In addition, we run a number of popular open online educational and 
                            community initiatives to empower traders and investors.
                        </p>
                        <p>
                            <a href="#" className='text-blue-600'>Rainmatter</a>, our fintech 
                            fund and incubator, in several fintech startups with the goal of 
                            Indian capital markets.
                        </p>
                        <p>
                            And yet, we are always up to something new every day. Catch up on the 
                            latest updates on our blog or see what the media is saying about us.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;