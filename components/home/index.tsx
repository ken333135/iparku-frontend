import React from "react";
import { debounce } from "lodash";

import Image from "next/image";
import {
  Box,
  Flex,
  VStack,
  Text,
  Input,
  Link
} from "@chakra-ui/react";

import Table from "../common/table";
import SearchResults, { T_SearchResult } from './search-results';

import { 
  _getSearchSuggestions,
  _getCarparkByXY
} from "../../services";

type I_HomeState = {
  searchResults: any[];
  carparks: any[];
  isError: Boolean;
};

const data = [{
  location: 'CP11, BIZ',
  distance: 550,
  availability: true,
  rate: '$0.0214/min',
  fee: 11.56
}, {
  location: 'CP13, COM1',
  distance: 700,
  availability: true,
  rate: '$0.0214/min',
  fee: 11.56
}, {
  location: 'CP12, BIZ',
  distance: 900,
  availability: false,
  rate: '$0.03/min',
  fee: 15.22
}]

const searchResults = [
  {
    "SEARCHVAL": "RIVERVALE ARC",
    "BLK_NO": "180",
    "ROAD_NAME": "RIVERVALE CRESCENT",
    "BUILDING": "RIVERVALE ARC",
    "ADDRESS": "180 RIVERVALE CRESCENT RIVERVALE ARC SINGAPORE 540180",
    "POSTAL": "540180",
    "X": "36539.8273033211",
    "Y": "41313.8317777533",
    "LATITUDE": "1.38990087889263",
    "LONGITUDE": "103.910055555959",
    "LONGTITUDE": "103.910055555959"
  },
  {
    "SEARCHVAL": "RIVERVALE ARC",
    "BLK_NO": "179",
    "ROAD_NAME": "RIVERVALE CRESCENT",
    "BUILDING": "RIVERVALE ARC",
    "ADDRESS": "179 RIVERVALE CRESCENT RIVERVALE ARC SINGAPORE 540179",
    "POSTAL": "540179",
    "X": "36566.2828528807",
    "Y": "41328.2196638137",
    "LATITUDE": "1.39003098987253",
    "LONGITUDE": "103.910293283677",
    "LONGTITUDE": "103.910293283677"
  },
  {
    "SEARCHVAL": "RIVERVALE ARC",
    "BLK_NO": "178D",
    "ROAD_NAME": "RIVERVALE CRESCENT",
    "BUILDING": "RIVERVALE ARC",
    "ADDRESS": "178D RIVERVALE CRESCENT RIVERVALE ARC SINGAPORE 544178",
    "POSTAL": "544178",
    "X": "36613.6460424615",
    "Y": "41218.7302874699",
    "LATITUDE": "1.38904079413305",
    "LONGITUDE": "103.91071884624",
    "LONGTITUDE": "103.91071884624"
  },
  {
    "SEARCHVAL": "RIVERVALE ARC",
    "BLK_NO": "178",
    "ROAD_NAME": "RIVERVALE CRESCENT",
    "BUILDING": "RIVERVALE ARC",
    "ADDRESS": "178 RIVERVALE CRESCENT RIVERVALE ARC SINGAPORE 540178",
    "POSTAL": "540178",
    "X": "36531.902812236",
    "Y": "41138.5829669517",
    "LATITUDE": "1.38831599524616",
    "LONGITUDE": "103.909984297227",
    "LONGTITUDE": "103.909984297227"
  },
  {
    "SEARCHVAL": "RIVERVALE ARC",
    "BLK_NO": "180A",
    "ROAD_NAME": "RIVERVALE CRESCENT",
    "BUILDING": "RIVERVALE ARC",
    "ADDRESS": "180A RIVERVALE CRESCENT RIVERVALE ARC SINGAPORE 541180",
    "POSTAL": "541180",
    "X": "36491.902945322",
    "Y": "41353.4402493704",
    "LATITUDE": "1.39025909742147",
    "LONGITUDE": "103.909624930156",
    "LONGTITUDE": "103.909624930156"
  },
  {
    "SEARCHVAL": "RIVERVALE ARC",
    "BLK_NO": "178A",
    "ROAD_NAME": "RIVERVALE CRESCENT",
    "BUILDING": "RIVERVALE ARC",
    "ADDRESS": "178A RIVERVALE CRESCENT RIVERVALE ARC SINGAPORE 541178",
    "POSTAL": "541178",
    "X": "36494.8740203353",
    "Y": "41211.2562747858",
    "LATITUDE": "1.38897323682802",
    "LONGITUDE": "103.909651586289",
    "LONGTITUDE": "103.909651586289"
  },
  {
    "SEARCHVAL": "RIVERVALE ARC",
    "BLK_NO": "180C",
    "ROAD_NAME": "RIVERVALE CRESCENT",
    "BUILDING": "RIVERVALE ARC",
    "ADDRESS": "180C RIVERVALE CRESCENT RIVERVALE ARC SINGAPORE 543180",
    "POSTAL": "543180",
    "X": "36495.8559742635",
    "Y": "41268.5634655934",
    "LATITUDE": "1.38949150176116",
    "LONGITUDE": "103.90966042653",
    "LONGTITUDE": "103.90966042653"
  },
  {
    "SEARCHVAL": "RIVERVALE ARC",
    "BLK_NO": "180D",
    "ROAD_NAME": "RIVERVALE CRESCENT",
    "BUILDING": "RIVERVALE ARC",
    "ADDRESS": "180D RIVERVALE CRESCENT RIVERVALE ARC SINGAPORE 544180",
    "POSTAL": "544180",
    "X": "36577.9525831994",
    "Y": "41253.8588553518",
    "LATITUDE": "1.3893584945611",
    "LONGITUDE": "103.910398123408",
    "LONGTITUDE": "103.910398123408"
  },
  {
    "SEARCHVAL": "RIVERVALE ARC",
    "BLK_NO": "178B",
    "ROAD_NAME": "RIVERVALE CRESCENT",
    "BUILDING": "RIVERVALE ARC",
    "ADDRESS": "178B RIVERVALE CRESCENT RIVERVALE ARC SINGAPORE 542178",
    "POSTAL": "542178",
    "X": "36537.4381908299",
    "Y": "41164.1146771144",
    "LATITUDE": "1.38854689304718",
    "LONGITUDE": "103.910034044279",
    "LONGTITUDE": "103.910034044279"
  },
  {
    "SEARCHVAL": "RIVERVALE ARC",
    "BLK_NO": "181",
    "ROAD_NAME": "RIVERVALE CRESCENT",
    "BUILDING": "RIVERVALE ARC",
    "ADDRESS": "181 RIVERVALE CRESCENT RIVERVALE ARC SINGAPORE 540181",
    "POSTAL": "540181",
    "X": "36512.5431071706",
    "Y": "41385.657158291",
    "LATITUDE": "1.39055044929064",
    "LONGITUDE": "103.909810407326",
    "LONGTITUDE": "103.909810407326"
  }
]

class Home extends React.Component<{}, I_HomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchResults: [],
      carparks: [],
      isError: false,
    };
  }

  render() {
    return (
      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        justifyContent="center"
        alignContent="center"
        columnGap={8}
        rowGap={8}
      >
        <VStack rowGap={2}>

          <Box width='100%' textAlign='left'>
            <Text fontWeight={700} fontSize='2xl'>Where do you want to go today?</Text>
          </Box>

          <Box 
            background='#e6e6e6'
            width='100%'
            p={8}
            borderRadius='2xl'>
            <Input
              placeholder="Search Here.."
              onChange={(e) => this.onInputChange(e)} 
              background='white'
              mb={2}/>
            <SearchResults 
              searchResults={this.state.searchResults}
              onResultSelect={this.onResultSelect} 
              />
          </Box>

          <Box>
            <Table data={this.state.carparks} />
            <Box width='100%' textAlign='right'>
              <Link href="/upgrade" fontSize='sm' color='orange.500' as='i'  >Upgrade to premium to check more options</Link>
            </Box>
          </Box>
          
          <Box cursor='pointer' onClick={() => window.location.href = 'https://www.rentalcars.com/'}>
            <Image
              src="/images/ad.png"
              alt="ad"
              width={500}
              height={100} />
            <Box width='100%' textAlign='right'>
              <Link href="/upgrade" fontSize='sm' color='orange.500' as='i'  >Upgrade to premium to remove ads</Link>
            </Box>
          </Box>

        </VStack>

        {/** Map Display */}
        {/* <Card>
     <iframe
      width="600"
      height="450"
      style={{border:0}}
      loading="lazy"
    //   allowfullscreen={true}
      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAGr7i62T8v04YHwkkiT5LL35bYIEFpPhM&q=543157"
     ></iframe>
    </Card> */}

      </Flex>
    );
  }

  debouncedInputChange = debounce(async (value) => {

    try {

      let searchResults = await _getSearchSuggestions(value);

      this.setState({
        searchResults: searchResults.data.results,
        isError: false,
      });

    } catch (e) {
      this.setState({
        searchResults: [],
        isError: true,
      });
    }
  }, 1000);

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.debouncedInputChange(e.target.value);
  };

  onResultSelect = async (selectedResult: T_SearchResult) => {

    try {

      const RADIUS = 20
      const carparkResponse = await _getCarparkByXY(selectedResult.X, selectedResult.Y, `${RADIUS}`)
      console.table(carparkResponse.data)
      const carparks = carparkResponse.data.map(_carpark => {
        return {
          location: _carpark.address,
          distance: 0,
          lots_available: _carpark.lots_available,
          total_lots: _carpark.total_lots,
          availability: _carpark.lots_available < _carpark.total_lots,
          rate: '$0.14/min',
          fee: '$1.11'
        }
      })

      this.setState({
        carparks: carparks
      })
    } catch (e) { 
      console.error(e)
    }
  

  }
}

export default Home;
