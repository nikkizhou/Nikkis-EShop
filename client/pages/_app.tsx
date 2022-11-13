import '../styles/globals.css'
import store from '../cart_redux/store'; 
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  )
}

export default MyApp
