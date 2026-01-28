import React from 'react'

function FooterLinks({ heading, links = [] }) {
  return (
    <div>
      {heading && (
        <h4 className="mb-2 sm:mb-4 text-md font-semibold text-gray-900">
          {heading}
        </h4>
      )}

      <ul className="space-y-1 sm:space-y-2">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-gray-700 text-sm hover:text-black transition-colors"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterLinks