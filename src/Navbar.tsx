import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Stack } from "@chakra-ui/react"
import { FaChevronDown } from 'react-icons/fa';
import Image from "next/image"
import Link from "next/link"

const Navbar: React.FC = () => {
  
  return (
    <Stack direction="row" justifyContent="space-between">
      <Flex pt={2} alignSelf="center">
        <Link href="/">
          <a>
            <Image src="/logoNavbar.png" height={25} width={100} alt="giulito logo de navbar" />
          </a>
        </Link>
      </Flex>
      {/* <Menu>
        <MenuButton bg="none" as={Button} rightIcon={<FaChevronDown />}>
          Productos
        </MenuButton>
        <MenuList>
          <MenuItem>Download</MenuItem>
          <MenuItem>Create a Copy</MenuItem>
          <MenuItem>Mark as Draft</MenuItem>
          <MenuItem>Delete</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
        </MenuList>
      </Menu> */}
    </Stack>
  )
}

export default Navbar
