import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { VStack, Container } from "@chakra-ui/react";

import Navbar from "../components/navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <VStack
        justifyContent="center"
        alignContent="center"
      >
        <Container maxW='container.sm'>
          <Navbar />
          <Component {...pageProps} />
        </Container>
      </VStack>
    </ChakraProvider >
  );
}

export default MyApp;
