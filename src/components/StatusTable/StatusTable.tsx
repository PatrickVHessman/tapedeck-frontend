
import { styled } from '@mui/material/styles';
import { Paper, Box } from '@mui/material';
import { DataGrid, GridCellParams, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { Status } from '../../models/status';
import { StatusTableCell } from './StatusTableCell';

const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .no-rows-primary': {
        fill: '#3D4751',
        ...theme.applyStyles('light', {
            fill: '#AEB8C2',
        }),
    },
    '& .no-rows-secondary': {
        fill: '#1D2126',
        ...theme.applyStyles('light', {
            fill: '#E8EAED',
        }),
    },
}));

const columns: GridColDef[] = [

    {
        field: 'name',
        headerName: 'Status',
        headerAlign: 'center',
        align: "center",
        // @ts-expect-error
        valueGetter: (value, row) =>
            row.name == null || row.key == null
                ? null
                : { name: row.name, key: row.key },
        renderCell: StatusTableCell,
        width: 150
    } as GridColDef<any, { name: string }>,
    {
        field: 'category',
        headerName: 'Category',
        headerAlign: 'center',
        type: 'string',
        // @ts-expect-error
        cellClassName: (params: GridCellParams<string>) => {
            if (params.value == "Transmutation") return 'transmuteCell';
            if (params.value == "Buff") return 'buffCell';
            if (params.value == "Debuff") return 'debuffCell';
            return 'miscCell';
        },
        align: "center",

    },
    {
        field: 'hasDuration',
        headerName: 'Duration',
        headerAlign: 'center',
        type: 'string',
        valueFormatter: (value) => {
            if (value == true) return 'Limited';
            return 'Unlimited';
        },
        align: "center",

    },
];

const paginationModel = { page: 0, pageSize: 25 };

const StatusTable = (props: { statuses: Status[] }) => {

    const handleRowClick: GridEventListener<'rowClick'> = (
        params, // GridRowParams
    ) => {
        window.location.href = `/statuses/${params.row.key}`
    };

    const CustomNoRowsOverlay = () => {
        return (
            <StyledGridOverlay>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width={96}
                    viewBox="0 0 452 257"
                    aria-hidden
                    focusable="false"
                >
                    <path
                        className="no-rows-primary"
                        d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
                    />
                    <path
                        className="no-rows-primary"
                        d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
                    />
                    <path
                        className="no-rows-primary"
                        d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
                    />
                    <path
                        className="no-rows-secondary"
                        d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
                    />
                </svg>
                <Box sx={{ mt: 2 }}>No status effects are associated with this move.</Box>
            </StyledGridOverlay>
        );
    }

    return (
        <>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={props.statuses}
                    columns={columns}
                    sx={{
                        border: 0,
                        '& .MuiDataGrid-footerContainer': {
                            background: '#eaecf0',
                        },
                        '& .MuiDataGrid-row:hover': {
                            cursor: 'pointer'
                        }
                    }}
                    getRowId={(row) => row.key}
                    initialState={{ pagination: { paginationModel } }}
                    isRowSelectable={() => false}
                    slotProps={{
                        loadingOverlay: {
                            variant: 'skeleton',
                            noRowsVariant: 'skeleton',
                        },
                    }}
                    slots={{ noRowsOverlay: CustomNoRowsOverlay, }}
                    disableRowSelectionOnClick={true}
                    onRowClick={handleRowClick}
                />

            </Paper>

        </>
    );
}

export default StatusTable;
