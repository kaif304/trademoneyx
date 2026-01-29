import { useState } from "react";
import { href, Link } from "react-router-dom";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const navItems = [
    "Signup",
    "About",
    "Products",
    "Pricing",
    "Support"
  ];

    return (
        <>
            <nav className="w-full bg-white shadow-md fixed top-0 z-50">
                <div className="w-full lg:max-w-7xl mx-auto px-5 py-5 flex items-center justify-between">
                    {/* Menu Button */}
                    <button className="md:hidden focus:outline-none hover:cursor-pointer" onClick={ () => setOpen(!open) }>
                        { open ? (<i className="fa-solid fa-xmark text-2xl"></i>) :
                            (<i className="fa-solid fa-bars text-2xl"></i>)
                        }
                    </button>
                    {/* Logo */}
                    <div className="flex items-center">
                        <img className="h-6 w-auto" src="media/images/logo.svg" alt="Logo" />
                    </div>

                    {/* Nav Items */}
                    <div>
                        <ul className="hidden bg-white md:flex items-center gap-4 lg:gap-8 text-md md:text-lg font-medium text-gray-700">
                            {navItems.map((item) => (
                                <li key={item} className="hover:text-black transition-colors">
                                    <LinkWithUnderline text={item} path={item.toLowerCase()}/>
                                </li>
                            ))}
                            <div className="bg-gray-100 text-gray-800 hover:text-black border border-gray-300 hover:border-gray-400 rounded-full px-4 py-1 transition-all duration-300 ease-in-out">
                                <a href="#">Profile</a>
                            </div>
                        </ul>
                        <div className="md:hidden bg-gray-100 text-2xl text-gray-800 hover:text-black border border-gray-300 hover:border-gray-400 rounded-full px-2 py-1 transition-all duration-400 ease-in-out">
                            <a href="#"><i className="fa-solid fa-circle-user"></i></a>
                        </div>
                    </div>

                </div>
                <div className={
                    `md:hidden bg-white transition-all duration-300 ease-in-out
                    ${open ? "max-h-60 opacity-100 translate-y-0" : 
                    "max-h-0 opacity-0"}`
                    }>
                    <ul className="flex flex-col items-center gap-4 px-6 py-4 text-gray-700 font-medium">
                        {navItems.map((item) => (
                            <li key={item} className=""><LinkWithUnderline text={item} path={item.toLowerCase()}/></li>
                        ))}
                    </ul>
                </div>
            </nav>

            <SpacerDiv />
        </>
    )
}

// function AnchorWithUnderline({text}) {
// return (
//         <a 
//             href="#"
//             className="
//                 relative
//                 after:content-['']
//                 after:absolute
//                 after:left-1/2
//                 after:-translate-x-1/2
//                 after:h-0.5
//                 after:w-0
//                 after:bg-black
//                 after:bottom-[-2px]
//                 after:transition-all
//                 after:duration-400
//                 hover:after:w-full
//                 ">
//             {text}
//         </a>
//     )
// }
function LinkWithUnderline({text, path}) {
    return (
        <Link
            to={'/'+path}
            className="
                relative
                after:content-['']
                after:absolute
                after:left-1/2
                after:-translate-x-1/2
                after:h-0.5
                after:w-0
                after:bg-black
                after:bottom-[-2px]
                after:transition-all
                after:duration-300
                hover:after:w-full
                ">
            {text}
        </Link>
    )
}

function SpacerDiv() {
    return (
        <div className="w-full h-18 mb-2">

        </div>
    )
}