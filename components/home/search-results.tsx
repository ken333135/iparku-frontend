import React, { ReactElement } from 'react'
import {
  Grid,
  Box,
  Text
} from '@chakra-ui/react';

type T_SearchResult = {
  SEARCHVAL: string,
  BLK_NO: string,
  ROAD_NAME: string,
  BUILDING: string,
  ADDRESS: string,
  POSTAL: string,
  X: string,
  Y: string,
  LATITUDE: string,
  LONGITUDE: string,
  LONGTITUDE: string,
}

interface I_SearchResultProps {
  searchResults: T_SearchResult[]
}

const MAX_RESULTS = 5

class SearchResults extends React.Component<I_SearchResultProps> {
  render() {
    return (
      <Grid 
        templateColumns='1fr'
        rowGap={0}
        width='100%'
        borderRadius='3xl'>
        {this.props.searchResults.slice(0,MAX_RESULTS).map((_searchResult: T_SearchResult): ReactElement => {
          return (
            <Box 
              textAlign='left' 
              background='white' 
              padding={2} 
              borderRadius='lg' 
              border='0.25px outset grey' 
              cursor='pointer'
              >
              <Text fontSize='sm'>{_searchResult.ADDRESS}</Text>
            </Box>
          )
        })}
      </Grid>

    )
  }
}

export default SearchResults;