import type { NextPage } from "next";
import Head from "next/head";

import { Box } from '@chakra-ui/react';

import Home from '../components/home'

import { 
    _getZipcode
} from '../services'

const Index: NextPage = () => {
 return (
  <Box>
   <Head key='meta'>
    <title key='meta-title'>iParkU</title>
    <meta key='meta' name="description" content="So Parking Good" />
    <link key='meta-icon' rel="icon" href="/favicon.ico" />
   </Head>
   <Home />
  </Box>
 );
};

// export async function getServerSideProps(context) {

//     console.log("IN SERVER SIDE PROPS")
//     let data = await _getZipcode('543157')
//     console.log(data.data)

//     return {
//         props: {}
//     }
// }

export default Index;
