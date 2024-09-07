import React, { useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css'; 

const Table = ({ data }) => {
  const gridApiRef = useRef(null);

  const columnDefs = useMemo(() => [
    { headerName: 'System', field: 'system', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Error Category', field: 'error_category', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Error Code', field: 'error_code', sortable: true, filter: 'agNumberColumnFilter', floatingFilter: true },
    { headerName: 'Error Description', field: 'error_description', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Duration (seconds)', field: 'duration_seconds', sortable: true, filter: 'agNumberColumnFilter', floatingFilter: true },
    { headerName: 'Created At', field: 'created_at', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Resolved At', field: 'resolved_at', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Channel', field: 'channel', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Location', field: 'location', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
  ], []);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true,
  }), []);

  return (
    <div className="ag-theme-alpine flex-1 pt-3 pb-6 overflow-y-auto">
      <AgGridReact
        ref={gridApiRef}
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true} 
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50, 100]}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default Table;
