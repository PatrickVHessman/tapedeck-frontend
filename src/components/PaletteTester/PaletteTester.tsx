import { SwapColorsRgba } from '@/models/sprites';

export const PaletteTester = (props: { palette: SwapColorsRgba[] }) => {
    return (<div style={{ display: "flex" }}>
        {props.palette.map((x, i) => {
            return (<div key={i} style={{ height: "5px", width: "5px", background: `rgb(${x.r8}, ${x.g8}, ${x.b8})` }} />)
        })}
    </div>)
}