
import {
  Box,
  Grid,
} from "@chakra-ui/react";
// Assets
// Custom components
import React, { useState, useEffect, useCallback} from "react";
import ComplexTable from "../../../views/admin/default/components/ComplexTable";
import PieCard from "../../../views/admin/default/components/PieCard";
import Tasks from "../../../views/admin/default/components/Tasks";
import TotalSpent from "../../../views/admin/default/components/TotalSpent";
import {
  columnsDataComplex,
} from "../../../views/admin/default/variables/columnsData";
import stockManageController from "../../../stocksController/stockManage"

export default function UserReports() {

  const [ stockDetailsForTable,setStockDetailsForTable ] = useState(null)
  const [ stockDetailsForChart,setStockDetailsForChart ] = useState([])
  const [ detailValues, setDetailValues ] = useState({
    totalPrice:'0 ₹',
    totalQuantity: '0'
  })
 
 
  // this function will format the response from api inorder to suit with our needs.
  const formatDataForChart = useCallback((data) => {
    let finalArray = [];
    let finalArrayForTable = [];

    const validMonths = [
      "january",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
  ];

    const sumQuantity = data.reduce((sum, item) => sum + item.quantity, 0);
    const sumPrice = data.reduce((sum, item) => sum + item.price, 0);

    let updatedDetailValue = {
      totalPrice:`${sumPrice} ₹`,
      totalQuantity: sumQuantity
    }

    setDetailValues(updatedDetailValue)

    validMonths.forEach((item, index) => {
      const neededValue = data.find(entry => entry.month.toLowerCase() === item.toLowerCase());
      if(neededValue && typeof neededValue.quantity === 'number'){
        finalArray.push(neededValue.quantity)
        finalArrayForTable.push({
          id: index+1,
          month:item,
          quantity:neededValue.quantity,
          price:neededValue.price,
          action: index
        })
      }else {
        finalArray.push(0)
        finalArrayForTable.push({
          id: index+1,
          month:item,
          quantity:0,
          price:0,
          action: index
        })
      }
    });

    setStockDetailsForChart(finalArray)
    setStockDetailsForTable(finalArrayForTable)

  },[])
    
  // on the time of load calling data for chart and table
  useEffect(() => {
    const fetchData = async () => {
      try{
        let result = await stockManageController.getStockDetails()
        if(result.success){
          formatDataForChart(result.data.data)  
        }
      } catch(error) {
        console.log(error)
      }
    }
    fetchData();
  },[formatDataForChart])

  // when update happens, also update chart values in the state, which is helpful for live update of chart.
  const handleUpdateClick = async (id,editedRows) => {
    const updatedRow = editedRows.find(item=>item.id === id)

    try{
      await stockManageController.updateStockDetails(updatedRow);
      formatDataForChart(editedRows)
    } catch(error) {
      console.log(error);
    }

  };
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      
      <Grid templateColumns="8fr 4fr" gap='20px' mb='20px'>
        <TotalSpent stockDetailsForLineChart={stockDetailsForChart} detailValues={detailValues} />
        <PieCard stockDetailsForPieChart={stockDetailsForChart} detailValues={detailValues} />
      </Grid>

      {stockDetailsForTable && stockDetailsForTable.length > 0 && (
        <Grid templateColumns="10fr 2fr" gap="20px" mb="20px">
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={stockDetailsForTable}
            handleUpdateClick={handleUpdateClick}
          />
          <Tasks />
        </Grid>
      )}
    </Box>
  );
}
