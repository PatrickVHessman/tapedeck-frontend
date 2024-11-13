import { GridRenderCellParams } from '@mui/x-data-grid';

export function StatusTableCell(
    params: GridRenderCellParams<{ name: string; key: string }, any, any>,
) {
    if (params.value == null) {
        return '';
    }

    return (
        <div style={{ display: "flex" }}>
            <div style={{ width: "75px" }}><img src={`/src/icons/statusEffects/${params.value.key}.png`} style={{ maxHeight: "50px" }} /></div> {params.value.name}
        </div>
    );
}