import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "../../../components/icons/Icons";
import { HSeparator } from "../../../components/separator/Separator";
import LogoTxt from '../../../givenAssets/StatBoard.png'

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("white", "navy.700");

  return (
    <Flex align='center' direction='column'>
      <HorizonLogo h='175px' w='175px' my='32px' position='relative' left='43px' color={logoColor} />
      <img src={LogoTxt} alt="not found" style={{position:'relative',bottom:'40px'}}></img>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
