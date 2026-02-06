import React from 'react'
import Hero from './Hero'
import LeftImgSection from './LeftImgSection'
import RightImgSection from './RightImgSection'
import Universe from './Universe'

function ProductsPage( ) {
    return(
        <>
            <Hero />
            <LeftImgSection 
                imageUrl='media/images/kite.png'
                productName='Kite'
                productDescription='Our ultra fast flagship trading platform with 
                streaming market data, advanced charts, an elegant UI, and more. 
                Enjoy the kite experience seamlessly on your Android and iOS devices.'
                tryDemo=''
                learnMore=''
                googlePlay=''
                appStore=''
            />
            <RightImgSection 
                imageUrl='media/images/console.png'
                productName='Console'
                productDescription='The central dashboard for your Trading account. Gain insights 
                into your trades and investments with in-depth reports and visualisations.'
                learnMore=''
            />
            <LeftImgSection 
                imageUrl='media/images/coin.png'
                productName='Coin'
                productDescription='Buy direct mutual funds online, commission-free, delivered directly 
                to your Demat account. Enjoy the investment experience on your Android and iOS devices.'
                tryDemo=''
                learnMore=''
                googlePlay=''
                appStore=''
            />
            <RightImgSection 
                imageUrl='media/images/kiteconnect.png'
                productName='Kite Connect API'
                productDescription='Build powerful trading platforms and experiences with our super 
                simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it 
                to our clientbase.'
                learnMore=''
            />
            <LeftImgSection 
                imageUrl='media/images/varsity.png'
                productName='Varsity'
                productDescription='An easy to grasp, collection of stock market lessons with in-depth 
                coverage and illustrations. Content is broken down into bite-size cards to help you 
                on the go.'
                tryDemo=''
                learnMore=''
                googlePlay=''
                appStore=''
            />

            <div className='p-8 text-center'>
                <p>Want to know more about our technology stack? Check out he trademoneyx.tech blog.</p>
            </div>

            <Universe />
        </>
    );
}

export default ProductsPage;