import React from 'react'
import SectionHeading from './SectionHeading';

function Pricing( ) {
    return(
        <section className='stats-section mt-14 mb-12'>
            <div className='grid grid-cols-12 px-4 sm:px-6 md:px-10 lg:px-16 place-items-center lg:text-lg text-gray-700'>

                <div className="col-span-12 md:col-span-6 p-8">
                    <div className="flex flex-col gap-4">
                        <SectionHeading text="Unbeatable pricing" />
                        
                        <p>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                        <a className='text-blue-600' href="#">See pricing  <i className="fas fa-arrow-right"></i></a>
                    </div>
                </div>

                <div className="col-span-12 md:col-span-6 p-8">
                    <div className="grid grid-cols-12 text-center">
                        <div className="col-span-6 md:col-span-12 lg:col-span-6 border border-gray-300 px-4 py-2 md:px-8 md:py-6 lg:px-10 lg:py-8">
                            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-black mb-2'><i className='fa-solid fa-indian-rupee-sign'></i>0</h1>
                            <p>Free equity delivery and mutual funds</p>
                        </div>
                        <div className="col-span-6 md:col-span-12 lg:col-span-6 border border-gray-300 px-4 py-2 md:px-8 md:py-6 lg:px-10 lg:py-8">
                            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-black mb-2'><i class="fa-solid fa-indian-rupee-sign"></i>20</h1>
                            <p>Intraday and F&O</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Pricing;