import React from "react"
import { Link } from "gatsby"

const Header = (props) => {
  return  <header className="sticky bg-midnight text-metal pt-5 text-center fixed w-screen top-0 z-50 justify-center transition duration-1000 ease-in-out justify-center">
              <h1 className="bg-midnight font-semibold font-montserrat lg:text-5xl sm:text-4xl text-2xl pb-4">
                Micro Trend Tales {//<span className="visible md:hidden mr-4 hover:underline md:mr-6 text-xs"> por Luis Riancho</span>
                }
              </h1>
              <nav className="justify-center w-auto flex items-center justify-center bg-midnight font-semibold font-montserrat lg:text-2xl sm:text-xl text-xl pb-4">
                <ul className="flex flex-wrap items-center mt-3 text-l text-metal dark:text-gray-400 sm:mt-0">
                  {
                    props.home ? 
                      <li>
                        <Link to="/" className="mr-4 hover:underline md:mr-6 " activeClassName="active" partiallyActive={true}>RELATOS</Link>
                      </li>
                    :
                      null
                  }
                  {
                    props.how ? 
                      <li>
                        <Link to="/how" className="mr-4 hover:underline md:mr-6 " activeClassName="active" partiallyActive={true}>¿CÓMO FUNCIONA?</Link>
                      </li>
                    :
                      null
                  }
                </ul>
            </nav>
            <p className="bg-tahiti text-white lg:text-2xl sm:text-lg text-sm font-sans p-5 ">Una colección de microhistorias e imágenes basadas en los TTs de cada momento y generadas automáticamente a través de OpenAI.</p>
          </header>
}

export default Header