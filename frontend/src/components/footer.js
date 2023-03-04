import React from "react"
import useStickyComponent from "../utils/useStickyComponent";

const Footer = () => {
  const isSticky = useStickyComponent(true);
  const currentYear = new Date().getFullYear();

  return(
  <footer className={`${isSticky ? 'hidden' : 'visible'} bg-midnight fixed bottom-0 left-0 z-20 w-full p-4 border-t border-gray-200 shadow flex items-center justify-center md:p-6 dark:bg-gray-800 dark:border-gray-600`}>
    <ul className="flex flex-wrap items-center mt-3 text-l text-metal dark:text-gray-400 sm:mt-0">
        <li>
          <a target={"_blank"} rel="noreferrer" href="https://www.linkedin.com/in/luis-alberto-riancho-280ba046" className="mr-4 hover:underline md:mr-6 ">© {currentYear} Luis Riancho</a>
        </li>
        <li>
          <a target={"_blank"} rel="noreferrer" href="https://www.linkedin.com/company/76525878" className="mr-4 hover:underline md:mr-6 ">LinkedIn</a>
        </li>
        <li>
          <a target={"_blank"} rel="noreferrer" href="https://twitter.com/luigi_soplete" className="mr-4 hover:underline md:mr-6 ">Twitter</a>
        </li>
    </ul>
    {
      //<a className="flex flex-wrap items-center mt-3 text-l text-metal dark:text-gray-400 sm:mt-0" href="https://www.buymeacoffee.com/wiskonsin"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=wiskonsin&button_colour=573b5f&font_colour=ffffff&font_family=Bree&outline_colour=ffffff&coffee_colour=FFDD00" /></a>
    }
  </footer>
)}

export default Footer