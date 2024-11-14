import { GridRenderCellParams } from '@mui/x-data-grid';

export function SpeciesTableCell(
    params: GridRenderCellParams<{ name: string; key: string }, any, any>,
) {
    if (params.value == null) {
        return '';
    }

    return (
        <div style={{ display: "flex" }}>
            <div style={{ width: "75px"}}><img src={`/sprites/monsters/${params.value.key}.gif`} style={{ maxHeight: "50px" }} /></div> {params.value.name}
        </div>
    );
}