import React from 'react'

import SectionHeading from '../SectionHeading';
import Paragraph from '../../components/ui/Paragraph';

function RightImgSection( {
    imageUrl="",
    productName,
    productDescription,
    learnMore,
} ) {
    return(
        <section className='section-with-right-image'>
            <div className='grid grid-cols-12 px-4 sm:px-6 md:px-10 lg:px-16 place-items-center'>
                <div className="md:col-span-6 col-span-12 p-4">

                    <SectionHeading text={productName} />

                    <Paragraph text={productDescription} />

                    <div className='mt-6 text-blue-600 font-semibold text-sm md:text-md'>
                        <a href={learnMore}>Learn more<i className="fas fa-arrow-right"></i></a>
                    </div>
                </div>
                <div className="md:col-span-6 col-span-12 p-8">
                    <img className='w-sm md:w-md' src={imageUrl} alt="Product image" />
                </div>
            </div>
        </section>
    );
}

export default RightImgSection;