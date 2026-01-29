import React from 'react'

function NotFound() {
    return(
        <div className="flex flex-col items-center text-center space-y-2 md:space-y-3 lg:space-y-4 px-4 py-15">
            <h1 className="text-lg md:text-3xl lg:text-4xl m-2 font-bold text-gray-900 leading-tight">
                404 Not Found
            </h1>

            <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
                Sorry, the page you are looking for does not exist.
            </p>
        </div>
    );
}

export default NotFound;