import { Stack, Image, Heading, Text, Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { CartItem } from "./types"
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from './context';

interface Props {
  product: CartItem;
}
const ProductItem: React.FC<Props> = ({ product })=> {
  const [, { incrementItem, decrementItem }] = useCart();
  return(
    <Stack direction="row" rounded={10} boxShadow="lg" w="100%" bg="gray.100" h="120px">
      <Image src={product.image} objectFit="cover" h="120px" w="120px" borderLeftRadius={10} alt={product.title} />
      <Stack direction="row" rounded={20} w="100%" h="100%" justifyContent="space-around">
        <Stack spacing={0} w="100%" h="100%" justifyContent="space-around">
          <Heading noOfLines={2} fontSize="md">{product.title}</Heading>
          <Heading noOfLines={2} opacity={0.7} fontSize="md">Talle: {product.size}</Heading>
            <Stack alignSelf="start" spacing={0} direction="row" rounded="full" boxShadow="lg">
              <Button w="20px" h="24px" bg="teal.400" borderLeftRadius="9999" boxShadow="lg" onClick={()=> decrementItem(product.id)}><Icon as={FaMinus} /></Button>
              <Text px={3} color="gray.500">{product.quantity}</Text>
              <Button w="20px" h="24px" bg="teal.400" borderRightRadius="9999" boxShadow="lg" onClick={()=> incrementItem(product.id)}><Icon w={4} h={4} as={FaPlus} /></Button>
            </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
export default ProductItem