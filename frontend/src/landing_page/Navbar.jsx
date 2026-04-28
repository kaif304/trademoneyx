import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ onOpenAuth }) {
    const [open, setOpen] = useState(false);

    const navItems = [
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
                        <h1 class="text-3xl md:text-4xl font-extrabold text-blue-500 tracking-wide">
                            TradeMoneyX
                        </h1>
                    </div>

                    {/* Nav Items */}
                    <div>
                        <ul className="hidden bg-white md:flex items-center gap-4 lg:gap-8 text-md md:text-lg font-medium text-gray-700">
                            {navItems.map((item) => (
                                <li key={item} className="hover:text-black transition-colors">
                                    <LinkWithUnderline text={item} path={item.toLowerCase()}/>
                                </li>
                            ))}
                            <li>
                                <button
                                    type="button"
                                    className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 hover:cursor-pointer"
                                    onClick={() => onOpenAuth("login")}
                                >
                                    Log in
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700 hover:cursor-pointer"
                                    onClick={() => onOpenAuth("signup")}
                                >
                                    Sign up
                                </button>
                            </li>
                        </ul>
                        <div className="md:hidden flex items-center gap-2">
                            <button
                                type="button"
                                className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
                                onClick={() => onOpenAuth("login")}
                            >
                                Log in
                            </button>
                            <button
                                type="button"
                                className="rounded-full bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-md transition hover:bg-blue-700"
                                onClick={() => onOpenAuth("signup")}
                            >
                                Sign up
                            </button>
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
                        <li className="w-full max-w-xs pt-2">
                            <button
                                type="button"
                                className="w-full rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
                                onClick={() => {
                                    setOpen(false);
                                    onOpenAuth("login");
                                }}
                            >
                                Log in
                            </button>
                        </li>
                        <li className="w-full max-w-xs">
                            <button
                                type="button"
                                className="w-full rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md"
                                onClick={() => {
                                    setOpen(false);
                                    onOpenAuth("signup");
                                }}
                            >
                                Sign up
                            </button>
                        </li>
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
