import React from 'react'
import TicketOptionListing from './TicketOptionListing'

function CreateTicket() {
    let ticketOptions1 = [
    "Online Account Opening",
    "Offline Account Opening",
    "Company, Partnership and HUF Account",
        "NRI Account Opening",
        "Charges at TradeMoneyX",
        "TradeMoneyX IDFC FIRST Bank 3-in-1 Account",
        "Getting Started"
    ]
    let ticketOptions2 = [
        "Login Credentials",
        "Account Modification and Segment Addition",
        "DP ID and bank details",
        "Your Profile",
        "Transfer and conversion of shares"
    ]
    let ticketOptions3 = [
        "Margin/leverage, Product and Order types",
        "Kite Web and Mobile",
        "Trading FAQs",
        "Corporate Actions",
        "Sentinel",
        "Kite API",
        "Pi and other platform",
        "Stockreports+",
        "GTT"
    ]
  return (
    <section className='createticket-section mt-16'>
        <div className='px-24'>
            <div>
                <h1 className='text-2xl text-gray-800 font-medium'>To create a ticket, select a relevant topic</h1>
            </div>
            <div className="grid grid-cols-12 mt-8">
                <div className="col-span-4">
                    <TicketOptionListing 
                        title='Account Opening'
                        titleIconClass='fa fa-circle-plus' 
                        options={ticketOptions1}
                    />
                </div>
                <div className="col-span-4">
                    <TicketOptionListing 
                        title='Account Opening'
                        titleIconClass='fa fa-circle-plus' 
                        options={ticketOptions2}
                    />
                </div>
                <div className="col-span-4">
                    <TicketOptionListing 
                        title='Account Opening'
                        titleIconClass='fa fa-circle-plus' 
                        options={ticketOptions3}
                    />
                </div>
            </div>
        </div>
    </section>
  )
}

export default CreateTicket