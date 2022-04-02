import React from 'react';
import moment from 'moment';

import {
  Grid,
  Box,
  Text
} from '@chakra-ui/react';

type T_TableData = {
  location: string,
  distance: number,
  availability?: boolean,
  predictedAvailability?: number,
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
  { text: 'Avail', backgroundColor: '#b6b7b9' },
  { text: 'Avail (in 1 hour)', backgroundColor: '#b6b7b9' },
  { text: 'Rate', backgroundColor: '#b6b7b9' },
  // { text: 'Fee (est.)', backgroundColor: '#b6b7b9' },
]

class Table extends React.Component<I_TableProps> {

  render() {

    const cells: T_CellData[] = []
    const dow = moment().isoWeekday()
    const hour = moment().hour()

    let rateKeyPublic: string;
    let rateKeyPrivate: string;


    switch(dow) {
      case(1):
      case(2):
      case(3):
      case(4):
      case(5):
        rateKeyPublic = 'weekday_rate'
        if (hour < 17 ) { rateKeyPrivate = 'weekday_before_5' }
        if (hour >= 17 ) { rateKeyPrivate = 'weekday_after_5' }
        break;
      case(6):
        rateKeyPublic = 'sat_rate'
        rateKeyPrivate = 'sat'
        break;
      case(7):
        rateKeyPublic = 'sun_rate'
        rateKeyPrivate = 'sun'
        break;
      default:
        rateKeyPublic = 'weekday_rate';
        rateKeyPrivate = 'weekday_rate';
    }

    
    this.props.data.map(_data => {

      const rateTextPublic = _data.rates && `$${_data.rates[rateKeyPublic]}/min` 
      const rateTextPrivate = `${_data[rateKeyPrivate]}` 
      const rateText = _data.rates ? rateTextPublic : rateTextPrivate

      /* default */
      let availability = 'No data'
      /* If both total and avail  */
      if (_data.lots_available && _data.total_lots) {
        availability = `${_data.lots_available} / ${_data.total_lots}`
      }
      /* only lots avail */
      if (_data.lots_available) {
        availability = `${_data.lots_available}`
      }

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
        text: availability,
        textColor: availability !== 'No data' ? 'green': 'red',
        backgroundColor: '#e6e6e6',
      })
      /* Predicted Availability */
      cells.push({ 
        text: `${_data.predictedAvailability}` || '0',
        textColor: _data.predictedAvailability ? 'green': 'red',
        backgroundColor: '#e6e6e6',
      })
      /* Rate */
      cells.push({ 
        text: rateText as string,
        backgroundColor: '#e6e6e6',
      })
      // /* Fee */
      // cells.push({ 
      //   text: `${_data.fee}`,
      //   backgroundColor: '#e6e6e6',
      // })
    })

    return (
      <Grid
        templateColumns='3fr 1fr 1fr 1fr 2fr'
        rowGap={2}
        columnGap={2}>
        {headers.map(_header => cell(_header))}
        {cells.map(_cell => cell(_cell))}
      </Grid>
    )
  }
}

export default Table;