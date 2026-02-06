import React from 'react';

function Hero( ) {
    return(
        <section className='hero-section'>
            <div className='px-32'>
                <div className='text-center grid gap-4 pt-16 pb-16 border-b border-gray-300'>
                    <h1 className='text-xl sm:text-3xl lg:text-4xl font-semibold text-black'>Technology</h1>
                    <h3 className='text-2xl text-gray-600 font-medium'>Sleek, modern and intuitive trading platforms</h3>
                    <p className='text-md text-gray-700'>Check out our <a className='text-blue-600' href="#">Explore our products <i className="fas fa-arrow-right"></i></a></p>
                </div>
            </div>
        </section>
    );
}

export default Hero;