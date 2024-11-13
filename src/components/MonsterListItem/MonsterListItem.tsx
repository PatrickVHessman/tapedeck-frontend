import { Grid2 as Grid } from "@mui/material";
import { MonsterListItemClass } from "../../models/species";
import { Link } from "react-router-dom";

const MonsterListItem = (props: { monster: MonsterListItemClass }) => {
    return (
        <Grid size={{ xs: 6, md: 3 }} className="skew-neg monsterListItem"  >
            <Link to={`/monsters/${props.monster.key}`} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="skew-pos" style={{ display: "flex", padding: ".3em", alignItems: "center" }}>
                <div style={{marginRight: ".5em"} }>
                    <img src={`${props.monster.key ? "/src/sprites/monsters/" + props.monster.key + ".gif" : "src/icons/question_icon.png"}`} style={{ maxWidth: "55px" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                        <h4 style={{ fontSize: "20px" }}>#{props.monster.bestiaryIndex >= 0 ? props.monster.bestiaryIndex : "???"} {props.monster.name}</h4>
                        <img src={`/src/icons/types/element_${props.monster.elementalType}.png`} style={{ width: "33px", clipPath: "inset(13%)" }} />
                </div>
                </div>
            </Link>
        </Grid>
    );
}

export default MonsterListItem