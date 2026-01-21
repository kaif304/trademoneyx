import React from 'react';
import SectionHeading from './SectionHeading';

function Awards( ) {
    return(
        <div className='mt-14 mb-12'>
            <div className='grid grid-rows-1 grid-cols-12 sm:gap-6 place-items-center'>
                <div className='md:col-span-6 col-span-12 p-8'>
                    <img className='w-sm md:w-md' src='/media/images/largestBroker.svg' alt='Press Logos' />
                </div>
                <div className='md:col-span-6 col-span-12 p-6 md:p-6 lg:p-8 text-md md:text-sm lg:text-lg text-gray-700'>
                    
                    <SectionHeading text="Largest stock broker in India" />
                    <p className='mb-4 md:mb-7'>2+ million clients contribute to over 15% of all retail order volumes in India daily by trading and investing in:</p>

                    <div className="grid grid-rows-1 grid-cols-12 mb-[3rem]">
                        <div className="col-span-6 list-disc list-inside">
                            <ul className='list-disc list-inside'>
                                <li>Future and Options</li> 
                                <li>Commodity derivatives</li>
                                <li>Currency derivatives</li>
                            </ul>
                        </div>
                        <div className="col-span-6">
                            <ul className='list-disc list-inside'>
                                <li>Stocks & IPOs</li> 
                                <li>Direct mutual funds</li>
                                <li>Bonds and Govt. securities</li>
                            </ul>
                        </div>
                    </div>
                    <img className='w-full sm:w-lg md:w-xl' src='/media/images/pressLogos.png' alt='Press Logos' />
                </div>
            </div>
        </div>
    );
}

export default Awards;