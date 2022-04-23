import {
  Box,
  Flex,
  Grid,
  Heading,
  Stack,
  Image,
  Text,
  Button,
  IconButton,
  Container,
  Badge,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Divider,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link"

import api from "../src/api";
import { CartItem, Product } from "../src/types";
import { useCart } from "../src/context";
import { currency } from "../src/utils";
import { GetStaticProps, NextPage } from "next";
import ProductItem from "../src/ProductItem";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "../src/Navbar";

interface Props {
  products: Product[];
}

const Home: NextPage<Props> = ({ products }) => {
  const [category, setCategory] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure()

  const filterProducts = (category === "") ? products : products.filter(product => product.category === category)

  function groupBy(objectArray: any, property: any) {
    return objectArray.reduce((acc: any, obj: any) => {
      const key = obj[property];
      if (!acc[key]) {
          acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }
  const groupByCategory = groupBy(products, 'category');
  
  const categories = Object.keys(groupByCategory)
  //uncomment when client add categories in db (change products.map to filterProducts.map line 82)

  const [{cart, quantity, total, message}, {addItem, incrementItem, decrementItem, removeAll}] =
    useCart();
  const cartArray: CartItem[] = Array.from(cart.values())

  return (
    <Container boxShadow={"xl"} m={"auto"} maxW="container.xl" minH={"100vh"} bg="teal.50">
      <Navbar />
      <Box display={"flex"} flexDirection="column" justifyContent={"space-beetwen"}>
        <Image my={10} alignSelf="center" src="logo.png" h={{base: 200, md: 300}} w={{base: 200, md: 300}} alt="giulito tienda de ropas logo" />
        <Stack alignSelf="start" my={4}>
          <Heading my={5} fontSize="xl" opacity={0.8}>NUESTROS PRODUCTOS</Heading>
          <Select 
            bg="white" 
            mt={10} 
            isRequired 
            onChange={(e)=>setCategory(e.target.value)} 
            placeholder='Todos los productos'>
              {categories.map(category=><option key={category} value={category}>{category}</option>)}
          </Select>
        </Stack>
        <Grid gridGap={8} templateColumns="repeat(auto-fill, minmax(320px, 1fr))">
          {filterProducts.map((product) => (
            <Stack key={product.id} gap={3} bg="gray.100" rounded={10} overflow="hidden">
              <Image alt={product.title} objectFit="contain" src={product.image} width="100%" />
              <Flex flex={1} flexDirection="column" px={4} gap={"6px"} h="100%">
                <Badge bg="gray.300" alignSelf="start" px={2}>Talle: {product.size}</Badge>
                <Heading fontSize="xl" opacity={0.9}>{currency(product.price)}</Heading>
                <Text>{product.title}</Text>
                <Badge bg="gray.300" alignSelf="start" px={2}>{product.stock}</Badge>
                <Text fontSize="xs" opacity={0.7}>{product.description}</Text>
              </Flex>
              {!cart.has(product.id) ? (
                <Button
                  colorScheme="teal"
                  onClick={() => addItem(product.id, {...product, quantity: 1})}
                >
                  Agregar
                </Button>
              ) : (
                <Flex alignItems="center" justifyContent="center">
                  <Button
                    colorScheme="teal"
                    fontSize="lg"
                    roundedRight={0}
                    onClick={() => decrementItem(product.id)}
                  >
                    -
                  </Button>
                  <Text
                    alignItems="center"
                    color="black"
                    display="flex"
                    h="100%"
                    justifyContent="center"
                    px={4}
                  >
                    {cart.get(product.id)?.quantity}
                  </Text>
                  <Button
                    colorScheme="teal"
                    fontSize="lg"
                    roundedLeft={0}
                    onClick={() => incrementItem(product.id)}
                  >
                    +
                  </Button>
                </Flex>
              )}
            </Stack>
          ))}
        </Grid>
        <Box bottom={0} margin="auto" paddingBottom="16px" position="sticky">
          {Boolean(quantity) && (
            <Flex>
              <Button colorScheme="whatsapp" maxW="320px" mx="auto" p={3} roundedRight={0} onClick={onOpen}>
                {quantity} productos (total: {currency(total)})
              </Button>
              <Button
                colorScheme="whatsapp"
                maxW="320px"
                mx="auto"
                p={3}
                roundedLeft={0}
                onClick={() => removeAll()}
              >
                X
              </Button>
            </Flex>
          )}
        </Box>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent bg="teal.50">
          <DrawerCloseButton />
          <DrawerHeader alignSelf="center">Tu pedido</DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              {(cartArray.length > 0) ? cartArray.map((product) => <ProductItem key={product.title} product={product} />) : <Heading opacity={0.7} fontSize="md" textAlign="center">Agregue productos a su pedido</Heading> }
            </Stack>
          </DrawerBody>
          <Divider color="black" />
          <DrawerFooter w="100%" justifyContent="center">
            <Stack>
              <Stack justifyContent="space-between" direction="row" py={6}>
                <Heading fontSize="lg" opacity={0.7}>Pedido total:</Heading>
                <Heading fontSize="lg" opacity={0.7}>{currency(total)}</Heading>
              </Stack>
              <Link href={message}>
                <a>
                  <Button leftIcon={<FaWhatsapp />} colorScheme="whatsapp" px={20}>Completar pedido</Button>
                </a>
              </Link>
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  return {
    props: {
      products,
    },
  };
};
export default Home