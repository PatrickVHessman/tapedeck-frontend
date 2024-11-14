import { Grid2 as Grid } from "@mui/material";
import { Link } from "react-router-dom";

const HomeListItem = (props: { image: string, url: string, name: string }) => {
    return (
        <Grid size={{ xs: 12, md: 4 }} className="skew-neg monsterListItem"  >
            <Link to={props.url} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="skew-pos" style={{ display: "flex", padding: ".3em", alignItems: "center" }}>
                    <div style={{ marginRight: ".5em" }}>
                        <img src={`${props.image ? props.image : "icons/question_icon.png"}`} style={{ maxHeight: "55px" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h4 style={{ fontSize: "20px" }}>{props.name}</h4>
                    </div>
                </div>
            </Link>
        </Grid>
    );
}

export default HomeListItem;