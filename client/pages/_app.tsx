import '../styles/globals.css'
import store from '../cart_redux/store'; 
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app'
import Auth0ProviderWithHistory from '../auth0/authProvider'; 
import { Auth0Provider } from "@auth0/auth0-react";


function MyApp({ Component, pageProps }: AppProps) {
  if (typeof window !== "undefined") {
    var redirectTo = window.location.origin + '/profile'
    console.log(process.env.NEXT_PUBLIC_AUTH0_DOMAIN);
  }

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENTID}
      redirectUri={redirectTo}>
      
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </Auth0Provider>
  )
}

export default MyApp
