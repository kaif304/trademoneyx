import React from 'react'
import SectionHeading from '../SectionHeading';
import Paragraph from '../../components/ui/Paragraph';

function Universe( ) {
    return(
        <section className='universe-section mt-16 mb-4'>
            <div className='text-center'>
                <SectionHeading text="The TradeMoneyX Universe" />
                <Paragraph text="Extend your trading and investment experience even further 
                with our partner platforms" />
            </div>
            <div className='grid grid-cols-12 gap-y-18 mt-14 place-items-center'>
                <div className="col-span-4">
                    <img className='h-12 mb-1' src="media/images/smallcaseLogo.png" alt="Product image" />
                    <p className='text-sm text-gray-500 font-medium'>Thematic investment platform</p>
                </div>
                <div className="col-span-4">
                    <img className='h-12 mb-1' src="media/images/streakLogo.png" alt="Product image" />
                    <p className='text-sm text-gray-500 font-medium'>Thematic investment platform</p>
                </div>
                <div className="col-span-4">
                    <img className='h-12 mb-1' src="media\images\sensibullLogo.svg" alt="Product image" />
                    <p className='text-sm text-gray-500 font-medium'>Thematic investment platform</p>
                </div>
                <div className="col-span-4">
                    <img className='h-12 mb-1' src="media/images/zerodhaFundhouse.png" alt="Product image" />
                    <p className='text-sm text-gray-500 font-medium'>Thematic investment platform</p>
                </div>
                <div className="col-span-4">
                    <img className='h-12 mb-1' src="media/images/goldenpiLogo.png" alt="Product image" />
                    <p className='text-sm text-gray-500 font-medium'>Thematic investment platform</p>
                </div>
                <div className="col-span-4">
                    <img className='h-12 mb-1' src="media/images/dittoLogo.png" alt="Product image" />
                    <p className='text-sm text-gray-500 font-medium'>Thematic investment platform</p>
                </div>
            </div>
            <div className='flex my-20 justify-center'>
                <button className="text-sm md:text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 sm:px-12 sm:py-2 md:px-25 md:py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:cursor-pointer">
                    Sign up Now
                </button>
            </div>
        </section>
    );
}

export default Universe;