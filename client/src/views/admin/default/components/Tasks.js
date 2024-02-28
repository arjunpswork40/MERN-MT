// Chakra imports
import {
  Flex,
} from "@chakra-ui/react";
// Custom components
import Card from "../../../../components/card/Card.js";

// Assets
import React from "react";
import Face from '../../../../givenAssets/cover.svg'
import Twitter from '../../../../givenAssets/twitter.svg'
import Instagram from '../../../../givenAssets/instagram.svg'
import Facebook from '../../../../givenAssets/facebook.svg'

export default function Conversion(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  return (
    <Card p='0px' align='center' direction='column' w='100%' {...rest}>
      <Flex alignItems='center' w='100%' mb='20px'>
        <img src={Face} alt="not found" style={{borderRadius: '10px 10px 0 0'}}></img>        
      </Flex>
      <div style={{textAlign: 'center'}}>
          <div style={{fontWeight: 'bold'}}>John Doe</div>
          <div>CEO</div>
          <Flex justifyContent='center' marginTop='10px'>
            <span style={{ marginRight: '10px' }}>
              <img src={Facebook} alt="Facebook Icon" />
            </span>
            <span style={{ marginRight: '10px' }}>
              <img src={Instagram} alt="Instagram Icon" />
            </span>
            <span style={{ marginRight: '10px' }}>
              <img src={Twitter} alt="Twitter Icon" />
            </span>
          </Flex>
        </div>
    </Card>
  );
}
