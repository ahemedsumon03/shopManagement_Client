import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/animate.min.css'
import '../styles/fontawesome.css'
import React from "react";
import NextNprogress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {

  return(
      <>
          <NextNprogress
              color="#29D"
              startPosition={0.3}
              stopDelayMs={200}
              height={3}
              showOnShallow={true}
          />
          <Component {...pageProps}/>
      </>
  )

}

export default MyApp
