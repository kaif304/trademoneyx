import React from 'react'
import SectionHeading from './SectionHeading';

function Stats( ) {
    let stats = [
        {
            heading: "Customer-first always",
            description: "That's why 1.3+ crore customers trust us with 3.5+ lacks crores worth of equity investments.",
        },
        {
            heading: "No spam or gimmicks",
            description: "No gimmicks, spam, \"gamification\", or annoying push notifications. High quality apps that you use at your pace, the way you like.",
        },
        {
            heading: "The TradeMoneyX universe",
            description: "Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.",
        },
        {
            heading: "Do better with money",
            description: "With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.",
        }
    ]

    return(
        <section className='stats-section mt-14 mb-12'>
            <div className='grid grid-cols-12 px-4 sm:px-6 md:px-10 lg:px-16 place-items-center'>
                <div className="md:col-span-6 col-span-12 order-2 md:order-1 p-4">

                    <SectionHeading text="Trust with confidence" />

                    <div className="grid grid-rows-4 grid-cols-1 place-items-center justify-items-start gap-3 md:gap-4 lg:gap-6 mt-3 md:mt-6 text-gray-700 text-sm md:text-md lg:text-lg">
                        {
                            stats.map((stat, index) => (
                                <div key={index}>
                                    <h2 className='text-md sm:text-lg md:text-xl lg:text-2xl font-semibold'>{stat.heading}</h2>
                                    <p>{stat.description}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="md:col-span-6 col-span-12 order-1 md:order-2 p-8">
                    <img className='w-md md:w-lg' src="/media/images/ecosystem.png" alt="Ecosystem image" />
                    <div className='mt-6 flex justify-center gap-4 text-blue-600 font-semibold text-sm md:text-md lg:text-md'>
                        <a href="#">Explore our products <i className="fas fa-arrow-right"></i></a>
                        <a href="#">Try Kite demo <i className="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Stats;