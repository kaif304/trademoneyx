import React from 'react'

function Hero() {
  return (
    <section className="hero-section">
        <div className='bg-blue-500 mx-16 my-8 rounded-4xl text-white py-16'>
            <div className="inner-spacing-div px-32">
                <div className="flex justify-between mb-12">
                    <h3 className='text-lg font-medium'>Support Portal</h3>
                    <a href="#" className='underline'>Track Tickets</a>
                </div>
                <div className="grid grid-cols-12 gap-16">
                    <div className="col-span-6 grid gap-6">
                        <h1 className='text-lg sm:text-xl lg:text-2xl font-semibold'>Search for an answer or browse help topics to create a ticket</h1>

                        <input 
                            className='bg-white text-gray-700 font-medium px-2 py-5 rounded-md focus:outline-none' 
                            type="text" 
                            placeholder='Eg: how do i activate F&O, why is my order getting rejected..' 
                        />

                        <div className='flex gap-x-4 flex-wrap underline'>
                            <a href="#">Track account opening</a>
                            <a href="#">Track segment activation</a>
                            <a href="#">Intraday margins</a>
                            <a href="#">Kite user manual</a>
                        </div>
                    </div>
                    <div className="col-span-6">
                        <h1 className='text-md sm:text-lg lg:text-xl font-semibold mb-4'>Featured</h1>
                        <ul className='list-decimal ml-8 space-y-2'>
                            <li>Current Takeovers and Delisting - January 2025</li>
                            <li>Latest Intraday leverages - MIS & CO</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero