import React from 'react'

function TicketOptionListing({title="", titleIconClass="", options=[]}) {
  return (
    <div>
        <h3 className='text-lg font-medium mb-8 text-gray-800'><i className={titleIconClass}></i>{title}</h3>
        <ul>
            {options.map((item) => (
                <li key={item} className='text-sm text-blue-500 font-medium leading-10'><a href="#">{item}</a></li>
            ))}
        </ul>
    </div>
  )
}

export default TicketOptionListing;