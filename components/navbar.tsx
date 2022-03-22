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
  { href: '/about', text: 'About' },
  { href: '/', text: 'Home' },
  { href: '/support', text: 'Support' },
]

function Navbar() {

  const router = useRouter()

  console.log({ router })
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
        {links.map(_link => {
          return (
            <Link
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