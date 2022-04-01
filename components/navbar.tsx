import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';

import {
  Box,
  Link,
  VStack,
  HStack,
} from '@chakra-ui/react'

const links = [
  { href: '/', text: 'Home' },
  { href: '/about', text: 'About' },
  { href: '/support', text: 'Support' },
]

function Navbar() {

  const router = useRouter()

  return (
    <VStack width='100%' padding={4}>
      <HStack columnGap={16}>
        <Box
          width='100%'
          marginRight='auto'>
          <Image
            src='/images/iparku-logo.png'
            alt='logo'
            width={120}
            height={35} />
        </Box>
        {links.map((_link, idx) => {
          return (
            <Link
              key={`link-${idx}`}
              href={_link.href}
              fontWeight={700}
              color={_link.href === router.asPath ? 'red' : 'black'}>{_link.text}</Link>
          )
        })}
      </HStack>
    </VStack>
  )

}

export default Navbar;