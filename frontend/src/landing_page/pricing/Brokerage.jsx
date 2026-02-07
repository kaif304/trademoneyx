import React from 'react'

function Brokerage( ) {
    return(
        <section className='brokerage-section mb-20 mt-20'>
            <div className='px-32'>
                <div className='border-t border-gray-300'>
                    <div className='grid grid-cols-12 px-20 mt-14 justify-center'>
                        <div className="col-span-8">
                            <a href="#" className='text-center text-blue-500 text-xl font-medium'><h2>Brokerage calculator</h2></a>
                            <ul className='text-gray-500 font-medium list-disc leading-8 mt-8'>
                                <li>Call & Trade and RMS auto-squareoff:Additional charges of 50+GST per order.</li>
                                <li>
                                    Digital contact notes will be sent via e-mail.
                                </li>
                                <li>
                                    Physical copies of contract notes, if required, shall be charged 
                                    <i className='fa-solid fa-indian-rupee-sign text-[0.8rem]'></i>20 
                                    per contract note. Courier charges apply. 
                                </li>
                                <li>
                                    For NRI account non-PIS 0.5% or <i className='fa-solid fa-indian-rupee-sign text-[0.8rem]'></i>100 
                                    per executed order for equity.
                                </li>
                                <li>
                                    For NRI account PIS 0.5% or <i className='fa-solid fa-indian-rupee-sign text-[0.8rem]'></i>200 
                                    per executed order for equity.
                                </li>
                                <li>If the account is in debit balance, any order placed will be charged 
                                    <i className='fa-solid fa-indian-rupee-sign text-[0.8rem]'></i>40 per 
                                    executed order instead of <i className='fa-solid fa-indian-rupee-sign text-[0.8rem]'></i>20
                                    per executed order.
                                </li>
                            </ul>
                        </div>
                        <div className="col-span-4">
                            <a href="#" className='text-center text-blue-500 text-xl font-medium'><h2>Brokerage calculator</h2></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Brokerage;