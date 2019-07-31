import React, {useState, useEffect} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const MyTicketsTable = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState(props.data);
  useEffect(() => {
    console.log(props);
    console.log(editMode, props.editMode);
    if (props.editMode != editMode) {
      props.data.forEach(row => {
        row['id'] = <button>{row['id']}</button>
      })
      setData(props.data);
    }
    else {
      setData(props.data)
    }
    
  }, []);

  return (
    <BootstrapTable keyField='id' data={data} columns={props.columns}/>
  );
};

export default MyTicketsTable;
