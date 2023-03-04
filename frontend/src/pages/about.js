import React from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import SEO from "../components/seo"

const AboutUs = () => {

  return <main className="grid place-content-center place-items-center overflow-y-hidden">
          <SEO/>
          <div id="main_container" className="w-screen bg-fixed h-auto relative place-content-center place-items-center gap-2 before:bg-gradient-to-t before:from-teal-500/70 before:to-transparent before:blur-xl before:filter ">
            <Header/>
            <div className="min-[601px]:grid grid-cols-4 gap-4 mt-10 ml-10 mr-10 max-[600px]:grid-flow-row" style={{"marginBottom" : "5%"}}>
              <p className="text-white">
                Texto de explicación about us
              </p>
            </div>
            <Footer/>
          </div>
        </main>
}

export default AboutUs