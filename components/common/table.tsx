import React from 'react';

import {
  Grid,
  Box,
  Text
} from '@chakra-ui/react';

type T_TableData = {
  location: string,
  distance: number,
  availability?: boolean,
  lots_available?: number,
  total_lots?: number,
  rates?: any[],
  rate?: string,
  fee?: number
}

interface I_TableProps {
  data: T_TableData[]
}

type T_CellData = {
  text: string,
  backgroundColor: string,
  textColor?: string,
}

const cell = ({ text, backgroundColor, textColor }: T_CellData) => {
  return (
    <Box padding={2} borderRadius={6} background={backgroundColor} verticalAlign='center' textAlign='center'>
      <Text fontSize='sm' fontWeight={600} color={textColor ? textColor : 'black'}>{text}</Text>
    </Box>
  )
}

const headers = [
  { text: 'Location', backgroundColor: '#b6b7b9' },
  { text: 'Distance', backgroundColor: '#b6b7b9' },
  { text: 'Availability', backgroundColor: '#b6b7b9' },
  { text: 'Rate', backgroundColor: '#b6b7b9' },
  { text: 'Fee (est.)', backgroundColor: '#b6b7b9' },
]

class Table extends React.Component<I_TableProps> {

  render() {

    const cells: T_CellData[] = []

    this.props.data.map(_data => {

      /* location */
      cells.push({ 
        text: _data.location,
        backgroundColor: '#e6e6e6',
      })
      /* Distance */
      cells.push({ 
        text: `${_data.distance}`,
        backgroundColor: '#e6e6e6',
      })
      /* Availability */
      cells.push({ 
        text: `${_data.lots_available} / ${_data.total_lots}`,
        textColor: _data.availability ? 'green': 'red',
        backgroundColor: '#e6e6e6',
      })
      /* Rate */
      cells.push({ 
        text: `${_data.rate}`,
        backgroundColor: '#e6e6e6',
      })
      /* Fee */
      cells.push({ 
        text: `${_data.fee}`,
        backgroundColor: '#e6e6e6',
      })
    })

    return (
      <Grid
        templateColumns='3fr repeat(4, 1fr)'
        rowGap={2}
        columnGap={2}>
        {headers.map(_header => cell(_header))}
        {cells.map(_cell => cell(_cell))}
      </Grid>
    )
  }
}

export default Table;