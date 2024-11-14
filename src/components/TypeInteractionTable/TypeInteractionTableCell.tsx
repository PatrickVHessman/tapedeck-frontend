import { GridRenderCellParams } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

export function TypeInteractionTableCell(
    params: GridRenderCellParams<{ name: string; key: string }, any, any>,
) {
    if (params.value == null) {
        return '';
    }

    return (
        <Link to={`/statuses/${params.value.name}`} style={{ display: "flex" }}>
            <div style={{ width: "25px", display: "inline-flex", alignItems: "center", marginRight: ".5em" }}><img src={`/icons/statusEffects/${params.value.key}.png`} style={{ maxHeight: "25px" }} /></div> <div style={{ display: "inline-block" }}>{params.value.name}</div>
        </Link>
    );
}