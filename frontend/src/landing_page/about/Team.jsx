import React from 'react'

function Team( ) {
    return(
        <section className='team-section'>
            <div className='grid grid-rows-[auto_1fr] gap-2 px-32 mt-16'>

                <div className='grid grid-cols-12 border-t border-gray-300'>
                    <div className='col-span-12 px-4 py-16'>
                        <div className='text-center text-3xl text-gray-800 font-semibold'>
                            <h1>People</h1>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-12 gap-8 px-24 mb-8 text-gray-700 text-lg/relaxed'>
                    <div className='col-span-6 grid place-content-center gap-6'>

                        <img className='rounded-full h-80' src="media/images/kaif.png" alt="Team Image" />

                        <div className='text-xl text-center font-semibold text-gray-600'>
                            <h4>Mohd Kaif</h4>
                            <h4 className='text-sm mt-1'>Founder, CEO</h4>
                        </div>
                    </div>
                    <div className='col-span-6 grid gap-6 place-content-start px-8'>
                        <p>
                            Mohd Kaif bootstrapped and founded TradeMoneyX in 2025 to overcome 
                            the hurdles he faced during his decade long stint as a trader.
                            Today, TradeMoneyX has changed the landscape of the Indian broking industry.
                        </p>
                        <p>
                            He is a member of the SEBI Secondary Market Advisory Committee and the Market
                            Data Advisory Committee.
                        </p>
                        <p>
                            Playing PUBG is his zen.
                        </p>
                        <p>
                            Connect on <a href="#" className='text-blue-600'>homepage</a> / <a href="#" className='text-blue-600'>TradingQnA</a> / <a href="#" className='text-blue-600'>Twitter</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Team;