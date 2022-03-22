import React from 'react';

import {
  Grid,
  Box,
  Text
} from '@chakra-ui/react';

type T_TableData = {
  location: string,
  distance: number,
  availability: boolean,
  rate: string,
  fee: number
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
      Object.keys(_data).map(_key => {
        return (
          cells.push({
            text: `${_data[_key]}`,
            backgroundColor: '#e6e6e6',
            textColor: _key === 'availability' ?
              (_data[_key] ? 'green' : 'red') :
              undefined
          })
        )
      })
    })

    return (
      <Grid
        templateColumns='repeat(5, 1fr)'
        rowGap={2}
        columnGap={2}>
        {headers.map(_header => cell(_header))}
        {cells.map(_cell => cell(_cell))}
      </Grid>
    )
  }
}

export default Table;