
import {
  Box,
  Grid,
} from "@chakra-ui/react";
// Assets
// Custom components
import React from "react";
import ComplexTable from "../../../views/admin/default/components/ComplexTable";
import PieCard from "../../../views/admin/default/components/PieCard";
import Tasks from "../../../views/admin/default/components/Tasks";
import TotalSpent from "../../../views/admin/default/components/TotalSpent";
import {
  columnsDataComplex,
} from "../../../views/admin/default/variables/columnsData";
import tableDataComplex from "../../../views/admin/default/variables/tableDataComplex.json";

export default function UserReports() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      
      <Grid templateColumns="8fr 4fr" gap='20px' mb='20px'>
        <TotalSpent />
        <PieCard />
      </Grid>
     
      <Grid templateColumns="10fr 2fr" gap='20px' mb='20px'>

        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
          <Tasks />
      </Grid>
    </Box>
  );
}
