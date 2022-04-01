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
     <Text fontSize='3xl'>About Us</Text>
     <Text>What do you want to know? We park you!</Text>
   </Flex>
  </Box>
 );
};

export default Index;
