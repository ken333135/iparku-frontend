import React from "react";
import moment from 'moment';
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
class Home extends React.Component<{}, I_HomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchResults: [
        {
          "SEARCHVAL": "INTERNATIONAL PLAZA",
          "BLK_NO": "10",
          "ROAD_NAME": "ANSON ROAD",
          "BUILDING": "INTERNATIONAL PLAZA",
          "ADDRESS": "10 ANSON ROAD INTERNATIONAL PLAZA SINGAPORE 079903",
          "POSTAL": "079903",
          "X": "29402.860423184",
          "Y": "28706.5974581633",
          "LATITUDE": "1.27588674266836",
          "LONGITUDE": "103.845923793168",
          "LONGTITUDE": "103.845923793168"
        }
      ],
      carparks: [],
      datetime: moment(),
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
              <Link href="/upgrade" fontSize='sm' color='orange.500' as='i'>Upgrade to premium to check more options</Link>
            </Box>
          </Box>
          
          <Box cursor='pointer' onClick={() => window.location.href = 'https://www.rentalcars.com/'}>
            <Image
              src="/images/ad.png"
              alt="ad"
              width={500}
              height={100} />
            <Box width='100%' textAlign='right'>
              <Link href="/upgrade" fontSize='sm' color='orange.500' as='i'>Upgrade to premium to remove ads</Link>
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

      const RADIUS = 150
      const carparkResponse = await _getCarparkByXY(selectedResult.X, selectedResult.Y, `${RADIUS}`)
      console.table(carparkResponse.data)
      const carparks = carparkResponse.data.map(_carpark => {

        return {
          location: _carpark.address,
          lots_available: _carpark.lots_available,
          total_lots: _carpark.total_lots,
          availability: _carpark.lots_available < _carpark.total_lots,
          rates: _carpark.rates,
          ..._carpark,
          distance: _carpark.distance.toFixed(0),
        }
      })
      .sort((a,b) => {
          if (parseInt(a.distance) > parseInt(b.distance)) {
            return 1
          }
          if (parseInt(a.distance) < parseInt(b.distance)) {
            return -1
          }
          return 0
      })

      this.setState({
        carparks: carparks
      })
    } catch (e) { 
      console.error(e)
    }
  

  }

  onChange = (e) => {
    console.log({e})

    return
  }
}

export default Home;
