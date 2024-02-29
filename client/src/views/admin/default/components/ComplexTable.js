  import {
    Flex,
    Table,
    Progress,
    Icon,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Button,
    Input
  } from "@chakra-ui/react";
  import React, { useMemo, useState } from "react";
  import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
  } from "react-table";

  // Custom components
  import Card from "../../../../components/card/Card";
  import Menu from "../../../../components/menu/MainMenu";

  import stockManage from "../../../../stocksController/stockManage";

  // Assets
  import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
  export default function ColumnsTable(props) {
    const { columnsData, tableData,handleUpdateClick } = props;
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
  

    const [editedRows, setEditedRows] = useState(tableData);

    const handleInputChange = (rowIndex, column, value, row, cell) => {
      // Clone the current state of editedRows to avoid mutating it directly
      const newEditedRows = [...editedRows];
  
      // Find the index of the row being edited
      const editedRowIndex = newEditedRows.findIndex((item) => item.id === row.original.id);
  
      // If the row is found, update its value
      if (editedRowIndex !== -1) {
        newEditedRows[editedRowIndex][column] = parseInt(value);
      } else {
        // If the row is not found, create a new entry for it
        newEditedRows.push({
          id: row.original.id,
          [column]: value,
        });
      }

      // Update the state with the modified editedRows
      setEditedRows(newEditedRows);
    };
  

  const handleClick = (id) => {
    handleUpdateClick(id,editedRows);
  };
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      gotoPage,
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
      pageOptions,
      setPageSize,
      pageSize,
      pageIndex,
    } = useTable(
      {
        columns,
        data,
        initialState: { pageSize: 3 }, // Set your initial page size here
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    );


    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    return (
      <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="10px" align="center">
        <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
          Analyse Table
        </Text>
        <Menu />
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "ID") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "MONTH") {
                    data = (
                      <Flex align="center">
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      </Flex>
                    );
                  } else if (cell.column.Header === "QUANTITY") {
                    data = (
                      
                      <Input 
                        color={textColor} 
                        width='80px' 
                        fontSize="sm" 
                        fontWeight="700"
                        value={
                          editedRows.find((item) => item.id === row.original.id)?.['quantity'] ||
                          cell.value
                        }
                        onChange={(e) => handleInputChange(index, 'quantity', e.target.value, row, cell)}

                        ></Input>
                    );
                  } else if (cell.column.Header === "PRICE") {
                    data = (
                      
                      <Input 
                        color={textColor}
                        fontSize="sm" 
                        fontWeight="700"  
                        width='80px'
                        value={
                          editedRows.find((item) => item.id === row.original.id)?.['price'] ||
                          cell.value
                        }
                        onChange={(e) => handleInputChange(index, 'price', e.target.value, row, cell)}
                      ></Input>

                    );
                  } else if (cell.column.Header === "ACTION") {
                    data = (
                     
                      <Button
                        variant='darkBrand'
                        color='white'
                        fontSize='sm'
                        fontWeight='500'
                        borderRadius='70px'
                        onClick={() => handleClick(row.original.id)}
                      >
                        Update values
                      </Button>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      maxH="30px !important"
                      py="8px"
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {/* Pagination Controls */}
      <Flex mt="20px" justify="space-between" align="center">
        <Flex ml="20px">
          <Text mr="2">Page</Text>
          <select
            value={pageIndex}
            onChange={(e) => {
              const selectedPage = e.target.value ? Number(e.target.value) : 0;
              gotoPage(selectedPage);
            }}
          >
            {pageOptions.map((page, index) => (
              <option key={index} value={index}>
                {index + 1}
              </option>
            ))}
          </select>
          <Text ml="2">of {pageOptions.length}</Text>
        </Flex>
        <Flex>
          {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"0"}
          </button> */}
          <Button
                  variant='darkBrand'
                  color='white'
                  fontSize='sm'
                  fontWeight='500'
                  borderRadius='70px'
                  px='24px'
                  py='5px'
                  marginRight='18px'
                  onClick={() => previousPage()} disabled={!canPreviousPage}
                  >
                  Previous
                </Button>
          
          <Button
                  variant='darkBrand'
                  color='white'
                  fontSize='sm'
                  fontWeight='500'
                  borderRadius='70px'
                  px='24px'
                  py='5px'
                  onClick={() => nextPage()} disabled={!canNextPage}
                  >
                  Next
                </Button>
        
          {/* <button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>
            {pageOptions.length - 1}
          </button> */}
        </Flex>
        <Flex mr="20px">
          <Text mr="2">Page Size:</Text>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[3,5, 10, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </Flex>
      </Flex>
    </Card>
    );
  }
