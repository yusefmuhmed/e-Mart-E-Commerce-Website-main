import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
    
    
import '../../public/styles/bootstrap.min.css'
import '../../public/styles/animate.min.css'
import '../../public/styles/remixicon.css'
import '../../public/styles/styles.css'
import '../../public/styles/responsive.css'
import '../../public/styles/rtl.css'


import "keen-slider/keen-slider.min.css"

 
 
import "./globals.css";
 import "/node_modules/mdb-react-ui-kit/dist/css/mdb.min.css";
import "/node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import Script from "next/script";
import RootLayoutHeader from "../components/RootLayoutHeader";
import Footer from "../components/Footer";
import AuthProvider from "../components/AuthProvider";
import AllContext from "../contexts/AllContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "hardsteleco | B2bB",
  description: "Online shopping platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        suppressHydrationWarning={true}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <AuthProvider>
           <AllContext>
            {children}
            {/* <Footer /> */}
          </AllContext>
        </AuthProvider>
        <Script
          defer
          type="text/javascript"
          src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.1/mdb.min.js"
        ></Script>
      </body>
    </html>
  );
}

