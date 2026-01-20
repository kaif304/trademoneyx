import React from 'react'

function Pricing( ) {
    return(
        <section className='stats-section mt-14 mb-12'>
            <div className='grid grid-cols-12 px-4 sm:px-6 md:px-10 lg:px-16 place-items-center '>

                <div className="col-span-4 p-4">
                    <div className="flex flex-col gap-4">
                        <h1 className='text-xl sm:text-2xl lg:text-3xl font-semibold text-black mb-2'>Unbeatable pricing</h1>
                        <p>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                        <a className='text-blue-600' href="#">See pricing  <i className="fas fa-arrow-right"></i></a>
                    </div>
                </div>

                <div className="col-span-2"></div>

                <div className="md:col-span-6 col-span-12 order-1 md:order-2 p-8">
                    <div className="grid grid-cols-12 text-center">
                        <div className="col-span-6 border border-gray-300 p-8 rounded-lg shadow-md mx-2">
                            <h1 className='text-3xl font-semibold text-black mb-2'>0</h1>
                            <p>Free equity delivery and mutual funds</p>
                        </div>
                        <div className="col-span-6 border border-gray-300 p-8 rounded-lg shadow-md mx-2">
                            <h1 className='text-3xl font-semibold text-black mb-2'>20</h1>
                            <p>Intraday and F&O</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Pricing;