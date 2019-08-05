import React from 'react';
import ReactTable from 'react-table';

const DisplayTicketsTable = (props) => {
  
  return (
    <ReactTable data={props.rows} columns={props.columns} />
  )

}

export default DisplayTicketsTable;