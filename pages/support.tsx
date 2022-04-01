import type { NextPage } from "next";
import Head from "next/head";

import { Box, Flex, Text } from '@chakra-ui/react';

const Index: NextPage = () => {
 return (
  <Box>
   <Head key='meta'>
    <title key='meta-title'>iParkU</title>
    <meta key='meta' name="description" content="So Parking Good" />
    <link key='meta-icon' rel="icon" href="/favicon.ico" />
   </Head>
   <Flex alignItems='center' justifyContent='center' flexDir='column'>
     <Text fontSize='3xl'>Support</Text>
     <Text>Help us to help you. Drop us an email at iparku@gmail.com</Text>
   </Flex>
  </Box>
 );
};

export default Index;
