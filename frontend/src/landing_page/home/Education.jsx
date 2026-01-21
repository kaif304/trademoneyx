import React from 'react'
import SectionHeading from './SectionHeading';

function Education( ) {
    return(
        <section className='education-section mt-14 mb-12'>
            <div className='grid grid-cols-12 px-4 sm:px-6 md:px-10 lg:px-16 place-items-center'>
                <div className="md:col-span-6 col-span-12 order-2 p-4">

                    <SectionHeading text="Education" />

                    <div className="grid grid-rows-2 grid-cols-1 place-items-center justify-items-start gap-4 md:gap-8 lg:gap-14 mt-3 md:mt-6 text-gray-700 text-sm md:text-md lg:text-lg">
                        <div>
                            <p>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trade.</p>
                            <a className='text-blue-600 mt-2' href="#">Versity <i className="fas fa-arrow-right"></i></a>
                        </div>
                        <div>
                            <p>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                            <a className='text-blue-600 mt-2' href="#">TradingQ&A <i className="fas fa-arrow-right"></i></a>
                        </div>
                    </div>

                </div>
                <div className="md:col-span-6 col-span-12 order-1 p-8">
                    <img className='w-sm md:w-md' src="/media/images/education.svg" alt="Ecosystem image" />
                </div>
            </div>
        </section>
    );
}

export default Education;