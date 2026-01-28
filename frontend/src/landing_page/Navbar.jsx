import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const navItems = [
    "Dashboard",
    "Markets",
    "Portfolio",
    "Orders",
    "Profile",
  ];

    return (
        <>
        <nav className="w-full bg-white shadow-md fixed top-0 z-50">
            <div className="w-full lg:max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <img className="h-6 w-auto" src="media/images/logo.svg" alt="Logo" />
                </div>

                {/* Nav Items */}
                <ul className="hidden bg-white md:flex items-center gap-4 lg:gap-8 text-md md:text-lg font-medium text-gray-700">
                    {navItems.map((item) => (
                        <li className="hover:text-black transition-colors">
                            <AnchorWithUnderline text={item} />
                        </li>
                    ))}
                </ul>

                {/* Menu Button */}
                <button className="md:hidden focus:outline-none" onClick={ () => setOpen(!open) }>
                    { open ? (<i className="fa-solid fa-xmark text-2xl"></i>) :
                        (<i className="fa-solid fa-bars text-2xl"></i>)
                    }
                </button>
            </div>
            <div className={
                `md:hidden bg-white transition-all duration-300 ease-in-out
                ${open ? "max-h-60 opacity-100 translate-y-0" : 
                "max-h-0 opacity-0"}`
                }>
                <ul className="flex flex-col items-center gap-4 px-6 py-4 text-gray-700 font-medium">
                    {navItems.map((item) => (
                        <li className=""><AnchorWithUnderline text={item}/></li>
                    ))}
                </ul>
            </div>
            {/* { open && (
                <div className="md:hidden shadow-md">
                    <ul className="flex flex-col items-center gap-4 px-6 py-4 text-gray-700 font-medium">
                        {navItems.map((item) => (
                            <li className=""><AnchorWithUnderline text={item}/></li>
                        ))}
                    </ul>
                </div>
            )} */}
        </nav>

        <SpacerDiv />
        </>
    )
}

function AnchorWithUnderline({text}) {
    return (
        <a 
            href="#"
            className="
                relative
                after:content-['']
                after:absolute
                // after:left-1/2
                after:-translate-x-1/2
                after:h-0.5
                after:w-0
                after:bg-black
                after:bottom-[-2px]
                after:transition-all
                after:duration-400
                hover:after:w-full
                ">
            {text}
        </a>
    )
}

function SpacerDiv() {
    return (
        <div className="bg-red-600 w-full h-8">

        </div>
    )
}