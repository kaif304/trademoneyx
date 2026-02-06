import React from 'react'

function Hero( ) {
    return(
        <section className='hero-section'>
            <div className='grid grid-rows-[auto_1fr] gap-2 px-32'>

                <div className='grid grid-cols-12'>
                    <div className='col-span-12 px-4 py-20'>
                        <div className='text-center text-3xl text-gray-800 font-semibold'>
                            <h1>We pioneered the discount broking model in India.</h1>
                            <h1>Now, we are breaking ground with our technology.</h1>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-12 gap-4 pt-20 px-24 mb-8 border-t border-gray-300 text-gray-700 text-lg/relaxed'>
                    <div className='col-span-6 grid gap-4 px-8'>
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
                    <div className='col-span-6 grid gap-4 px-8'>
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