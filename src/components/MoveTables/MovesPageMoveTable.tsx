
import { styled } from '@mui/material/styles';
import { MoveView } from '@/models/moves';
import { Paper, Box, Popover, Typography } from '@mui/material';
import {
    DataGrid, GridCellParams, GridColDef, GridEventListener, useGridApiRef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { MovePopoverView } from '../../models/moves';

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
    { field: 'name', headerName: 'Move', headerAlign: 'center', align: "center"  } ,
    {
        field: 'elementalType',
        headerName: 'Type',
        headerAlign: 'center',
        align: "center",
        cellClassName: (params: GridCellParams) => `${(params.value as string).toLowerCase()}Cell`,
    },
    { field: 'moveCategory', headerName: 'Category', headerAlign: 'center', align: "center" },
    {
        field: 'power',
        headerName: 'Power',
        type: 'number',
        headerAlign: 'center',
        align: "center",
    },
    { field: 'accuracy', headerName: 'Accuracy', headerAlign: 'center', align: "center" },
    {
        field: 'apCost',
        headerName: 'Use Cost',
        type: 'number',
        headerAlign: 'center',
        align: "center",
    },
    { field: 'description', headerName: 'Description', headerAlign: 'center', align: "center", flex: 4, cellClassName: "descriptionCell", display: "flex" },
];



const MovesPageMoveTable = (props: { moves: MoveView[], pageSize: number }) => {

    const paginationModel = {
        page: 0, pageSize: props.pageSize
    };

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [value, setValue] = useState<MovePopoverView>();

    useEffect(() => {
        apiRef.current.autosizeColumns({
            columns: ['description'],
            includeOutliers: true,
            includeHeaders: false,
        });
    }, [value]);

    const apiUrl = import.meta.env.VITE_CB_API_URL;

    const apiRef = useGridApiRef();

    const fetchMovePopoverData = async (key: string) => {
        await fetch(`${apiUrl}Moves/GetMoveByKey?key=${key}`, {
            method: 'GET',
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                let res = JSON.parse(data) as unknown as MovePopoverView;
                setValue(res);
                
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const handlePopoverOpen = async (event: React.MouseEvent<HTMLElement>) => {
        if (event.currentTarget.dataset.field == "name") {
            const id = event.currentTarget.parentElement!.dataset.id!;
            if (id != undefined) await fetchMovePopoverData(id);
            // @ts-expect-error
            setAnchorEl(event.target);
        }
        
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const handleRowClick: GridEventListener<'rowClick'> = (
        params, // GridRowParams
    ) => {
        window.location.href = `/moves/${params.row.key}`
    };


    const open = Boolean(anchorEl);

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
                <Box sx={{ mt: 2 }}>No moves found</Box>
            </StyledGridOverlay>
        );
    }

    return (
        <>
        <Paper sx={{ width: '100%' }}>
                <DataGrid
                    apiRef={apiRef}
                    autosizeOptions={{
                        columns: ['description'],
                        includeOutliers: true,
                        includeHeaders: false,
                    }}
                rows={props.moves}
                columns={columns}
                    sx={{
                        border: 0,
                        '& .MuiDataGrid-footerContainer': {
                            background: '#eaecf0',
                        },
                        '& .MuiDataGrid-row:hover': {
                            cursor: 'pointer'
                        },
                    }}
                    getRowId={(row) => row.key}
                    
                initialState={{ pagination: { paginationModel } }}
                isRowSelectable={() => false}
                slotProps={{
                    loadingOverlay: {
                        variant: 'skeleton',
                        noRowsVariant: 'skeleton',
                    },
                    cell: {
                        onMouseEnter: handlePopoverOpen,
                        onMouseLeave: handlePopoverClose,
                    },
                }}
                slots={{ noRowsOverlay: CustomNoRowsOverlay, }}
                    disableRowSelectionOnClick={true}
                    onRowClick={handleRowClick}
                />
                <Popover
                    sx={{
                        pointerEvents: 'none',
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Typography sx={{ p: 1 }}>{`${value?.description}`}</Typography>
                </Popover>
            </Paper>
            
            </>
    );
}

export default MovesPageMoveTable;
