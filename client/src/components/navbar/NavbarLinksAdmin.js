// Chakra Imports
import {
	Avatar,
	Button,
	Flex,
	Icon,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
// Custom Components
import { SidebarResponsive } from '../../components/sidebar/Sidebar';
import PropTypes from 'prop-types';
import React from 'react';
// Assets
import { MdInfoOutline } from 'react-icons/md';
import routes from '../../routes.js';
import { ThemeEditor } from './ThemeEditor';
export default function HeaderLinks(props) {
	const { secondary } = props;
	// Chakra Color Mode
	const navbarIcon = useColorModeValue('gray.400', 'white');
	let menuBg = useColorModeValue('white', 'navy.800');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);
	const borderButton = useColorModeValue('secondaryGray.500', 'whiteAlpha.200');
	return (
		<Flex
			w={{ sm: '100%', md: 'auto' }}
			alignItems="center"
			flexDirection="row"
			bg={menuBg}
			flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
			p="10px"
			borderRadius="30px"
			boxShadow={shadow}>
			
			<SidebarResponsive routes={routes} />
			<div style={{marginRight:'10px'}}>
				<Menu>
					<MenuButton p="0px">
						<p style={{ textAlign: 'left', margin: 0 }}><b>Arjun P S</b></p>
						<p style={{ textAlign: 'left', margin: 0 }}>arjun@gmail.com</p>
					</MenuButton>				
				</Menu>
			</div>

      <Menu>
        <MenuButton p='0px'>
          <Icon
            mt='6px'
            as={MdInfoOutline}
            color={navbarIcon}
            w='18px'
            h='18px'
            me='10px'
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p='20px'
          me={{ base: "30px", md: "unset" }}
          borderRadius='20px'
          bg={menuBg}
          border='none'
          mt='22px'
          minW={{ base: "unset" }}
          maxW={{ base: "360px", md: "unset" }}>
          {/* <Image src={navImage} borderRadius='16px' mb='28px' /> */}
          <Flex flexDirection='column'>
            <Link
              w='100%'
              href='https://arjunpswork40.github.io/'>
              <Button w='100%' h='44px' mb='10px' variant='brand'>
                Arjun P S
              </Button>
            </Link>
            <Link
              w='100%'
              href='https://www.linkedin.com/in/arjun-p-s-320517173/'>
              <Button
                w='100%'
                h='44px'
                mb='10px'
                border='1px solid'
                bg='transparent'
                borderColor={borderButton}>
                LinkedIn Profile
              </Button>
            </Link>
            <Link
              w='100%'
              href='https://github.com/arjunpswork40'>
              <Button
                w='100%'
                h='44px'
                variant='no-hover'
                color={textColor}
                bg='transparent'>
                GitHub Profile
              </Button>
            </Link>
          </Flex>
        </MenuList>
      </Menu>

			<ThemeEditor navbarIcon={navbarIcon} />

			<Menu>
				<MenuButton p="0px">
					<Avatar
						_hover={{ cursor: 'pointer' }}
						color="white"
						name="Arjun P S"
						bg="#11047A"
						size="sm"
						w="40px"
						h="40px"
					/>
				</MenuButton>
				<MenuList boxShadow={shadow} p="0px" mt="10px" borderRadius="20px" bg={menuBg} border="none">
					<Flex w="100%" mb="0px">
						<Text
							ps="20px"
							pt="16px"
							pb="10px"
							w="100%"
							borderBottom="1px solid"
							borderColor={borderColor}
							fontSize="sm"
							fontWeight="700"
							color={textColor}>
							👋&nbsp; Hey, Arjun
						</Text>
					</Flex>
					<Flex flexDirection="column" p="10px">
						<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius="8px" px="14px">
							<Text fontSize="sm">Support</Text>
						</MenuItem>
						<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius="8px" px="14px">
							<Text fontSize="sm">Plugins</Text>
						</MenuItem>
						<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius="8px" px="14px">
							<Text fontSize="sm">Help</Text>
						</MenuItem>	
						<MenuItem
							_hover={{ bg: 'none' }}
							_focus={{ bg: 'none' }}
							color="red.400"
							borderRadius="8px"
							px="14px">
							<Text fontSize="sm">Log out</Text>
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu>
		</Flex>
	);
}

HeaderLinks.propTypes = {
	variant: PropTypes.string,
	fixed: PropTypes.bool,
	secondary: PropTypes.bool,
	onOpen: PropTypes.func
};
