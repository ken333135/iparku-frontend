import React from "react";

import {
 Table,
 Thead,
 Tbody,
 Tfoot,
 Tr,
 Th,
 Td,
 TableCaption,
} from "@chakra-ui/react";

const Datatable = (props: {
 data: any;
 headerMap: any; // dict of { dataKey: desiredColumnName }
}) => {
    
 const renderTableHeaders = () => {
  if (!props.data || props.data.length == 0) {
    return null
  }

  let headers: string[] = Object.keys(props.data[0]);

  // Keep only columns in headerMap
  headers = headers.filter((_header) =>
   Object.keys(props.headerMap).includes(_header)
  );

  return (
   <Thead>
    <Tr>
     {headers.map((_header) => {
      return <Th>{props.headerMap[_header]}</Th>;
     })}
    </Tr>
   </Thead>
  );
 };

 const renderTableBody = () => {
  return (
   <Tbody>
    {props.data.map((_data: any) => (
     <Tr>
      {Object.keys(_data)
       .filter((_key) => Object.keys(props.headerMap).includes(_key))
       .map((_key) => {
        return <Td>{_data[_key]}</Td>;
       })}
     </Tr>
    ))}
   </Tbody>
  );
 };

 return (
  <Table>
   {renderTableHeaders()}
   {renderTableBody()}
  </Table>
 );
};

export default Datatable;
