import React from 'react';
import { Box } from '@chakra-ui/react';

class Card extends React.Component {
    render() {
        return (
         <Box 
            border="1px" 
            borderColor="gray.200"
            padding={12}
            borderRadius={20}
            background='white'
            className='card'
         >
          {this.props.children}
         </Box>
        );
    }
}

export default Card;