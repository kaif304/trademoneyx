import React from 'react'

import SectionHeading from '../SectionHeading';
import Paragraph from '../../components/ui/Paragraph';

function LeftImgSection( {
    imageUrl="",
    productName,
    productDescription,
    tryDemo,
    learnMore,
    googlePlay,
    appStore
} ) {
    return(
        <section className='section-with-left-image'>
            <div className='grid grid-cols-12 px-4 sm:px-6 md:px-10 lg:px-16 place-items-center'>
                <div className="md:col-span-6 col-span-12 p-8">
                    <img className='w-sm md:w-md' src={imageUrl} alt="Product image" />
                </div>
                <div className="md:col-span-6 col-span-12 p-4">

                    <SectionHeading text={productName} />

                    <Paragraph text={productDescription} />

                    <div className='mt-6 flex gap-4 text-blue-600 font-semibold text-sm md:text-md'>
                        <a href={tryDemo}>Try demo <i className="fas fa-arrow-right"></i></a>
                        <a href={learnMore}>Try demo <i className="fas fa-arrow-right"></i></a>
                    </div>

                    <div className='mt-6 flex gap-4'>
                        <a href={googlePlay}><img src="media/images/googlePlayBadge.svg" alt="google play" /></a>
                        <a href={appStore}><img src="media/images/appstoreBadge.svg" alt="app store" /></a>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default LeftImgSection;