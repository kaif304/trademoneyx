import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Menu() {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  }

  const handleProfileClick = (index) => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  }

  const menuClass = "menu"
  const activeMenuClass = "menu active"

  const menus = [
    { name: "Dashboard", path: "dashboard" },
    { name: "Orders", path: "orders" },
    { name: "Holdings", path: "holdings" },
    { name: "Positions", path: "positions" },
    { name: "Funds", path: "funds" },
    { name: "Apps", path: "apps" }
  ];
  
  return (
    <div className='menu-container'>
      <img src="logo.png" alt="logo" className='h-6' />

      <div className="menus">
        <ul>
          {menus.map((menu, index) => (
            <li key={index}>
              <Link to={`/${menu.path}`} onClick={() => handleMenuClick(index)}>
                <p className={selectedMenu === index ? activeMenuClass : menuClass}>{menu.name}</p>
              </Link>
            </li>
          ))}

          
          {/* <li>
            <Link to="/" onClick={() => handleMenuClick(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li> */}
          {/* <li>
            <Link to="/orders" onClick={() => handleMenuClick(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link to="/holdings" onClick={() => handleMenuClick(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link to="/positions" onClick={() => handleMenuClick(3)}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link to="/funds" onClick={() => handleMenuClick(4)}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
          <li>
            <Link to="/apps" onClick={() => handleMenuClick(6)}>
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>Apps</p>
            </Link>
          </li> */}
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">ZU</div>
          <p className="username">USERID</p>
        </div>
      </div>

    </div>
  )
}

export default Menu