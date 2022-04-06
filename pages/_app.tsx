import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app'
import CartContext from "../src/context";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <CartContext>
      <ChakraProvider>
        <Component {...pageProps} /> 
      </ChakraProvider>
    </CartContext>
    </>
  )
}

export default MyApp
