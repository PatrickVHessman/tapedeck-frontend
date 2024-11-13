import { Grid2 as Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { elementColors } from "@/consts";

const ElementListItem = (props: { element: string }) => {
    return (
        <Grid size={{ xs: 12, md: 3 }} className="skew-neg elementListItem" id={`${props.element}`} >
            <style>
                {`
                #${props.element}:hover {
                    background: ${elementColors[props.element.toLowerCase()]};
                
    }

    #${props.element}:hover a {
            animation: clip-noise 0.75s;
            color: #FFF;
        }
                ` }
            </style>
            <Link to={`/elementalTypes/${props.element}`} style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                <div className="skew-pos" style={{ display: "flex", padding: ".3em", alignItems: "center" }}>
                    <div style={{ marginRight: ".5em" }}>
                        <img src={`${props.element ? "/src/icons/types/element_" + props.element + ".png" : "src/icons/question_icon.png"}`} style={{ maxWidth: "55px", clipPath: "inset(13%)" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h4 style={{ fontSize: "20px" }}>{props.element}</h4>
                    </div>
                </div>
            </Link>
        </Grid>
    );
}

export default ElementListItem