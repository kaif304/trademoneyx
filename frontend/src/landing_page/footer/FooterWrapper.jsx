import React from 'react'
import FooterLinks from './FooterLinks';

function FooterWrapper( ) {
    return(
        <footer className='bg-gray-100 border border-gray-300 px-8 md:px-24 py-6 md:py-12 mt-10 md:mt-14'>
            <div className='grid grid-cols-6 md:grid-cols-12 gap-6'>
                <div className='col-span-6 sm:col-span-3 text-gray-700 text-sm md:text-md'>
                    <img src="media/images/logo.svg" alt="Logo" className='h-4 mb-4 md:mb-4'/>
                    <p>&copy; 2010 - 2024, Not Zwrodha Broking Ltd.</p>
                    <p>All rights reserved.</p>
                </div>

                <div className='col-span-6 sm:col-span-3'>
                    <FooterLinks 
                        heading="Company"
                        links={["About","Products","Pricing","Referal program","Careers","Zerodha.tech","Press & media","Zerodha cares CSR"]} 
                    />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                    <FooterLinks 
                        heading="Support"
                        links={["Contact","Support portal","Z-Connect blog","List of charges","Downloads & resources"]} 
                    />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                    <FooterLinks 
                        heading="Account"
                        links={["Open an account","Fund transer","60 day challenge"]} 
                    />
                </div>
            </div>
        </footer>
    );
}

export default FooterWrapper;