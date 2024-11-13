import { useState, useEffect } from 'react';
import { Typography, Grid2 as Grid } from '@mui/material';
import ContentCard from '@/components/ContentCard/ContentCard';
import { Link, useParams } from 'react-router-dom';
import { MoveMonsterListItem } from '../../models/species';
import { Move } from '../../models/moves';
import { elementColors } from '../../consts';
import MovePageMonsterTable from '../../components/MovePageMonsterTable/MovePageMonsterTable';
import { Helmet } from 'react-helmet';
import StatusTable from '../../components/StatusTable/StatusTable';


const Monster = () => {
    const apiUrl = import.meta.env.VITE_CB_API_URL;

    let { moveKey } = useParams();

    const [move, setMove] = useState<Move>(new Move());
    const [monsterList, setMonsterList] = useState<MoveMonsterListItem[]>([]);

    const fetchMoveInfo = async () => {
        await fetch(`${apiUrl}Moves/GetMoveByKey?key=${moveKey}`, {
            method: 'GET',
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                const res = JSON.parse(data) as unknown as Move;
                setMove(res);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const targetStr = () => {
        if (move.targetType == "TARGET_ONE") return "SINGLE ENEMY";
        if (move.targetType == "TARGET_NONE") return "SELF";
        if (move.targetType == "TARGET_ONE_ALLY_NOT_SELF") return "ALLY";
        if (move.targetType == "TARGET_ALL") return "ALL";
        if (move.targetType == "TARGET_ALL") return "ENEMY TEAM";
        if (move.targetType == "TARGET_ONE_ALLY") return "ALLY OR SELF";
        return "";
    }

    const fetchMonsterList = async () => {
        await fetch(`${apiUrl}Species/GetSpeciesViewByMove?move=${moveKey}`, {
            method: 'GET',
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                const res = JSON.parse(data) as unknown as MoveMonsterListItem[];
                setMonsterList(res);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const InitMovePage = async () => {
        await fetchMoveInfo();
        await fetchMonsterList();
    }

    useEffect(() => {
        InitMovePage();
    }, []);

    const header = (
            <Typography variant="h1" style={{ display: "inline-block" }}>
                {move.name}
            </Typography>
    );

    const getElementBg = (elType: string) => {
        return `linear-gradient(135deg, transparent 10px, ${elementColors[elType.toLowerCase()]} 0) top left`;
    }

    return (
        <ContentCard header={header} bootleg={false} subHeader={`${move.category.toUpperCase() } MOVE`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{move.name} - Tapedeck</title>
            </Helmet>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }} >
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Link to={`/elementalTypes/${move.elementalType}`} className="moveDetail" style={{ background: getElementBg(move.elementalType) }}>
                                <div style={{ marginLeft: ".75em"} }>TYPE: {move.elementalType}</div>  <img
                                    src={`/src/icons/types/element_${move.elementalType}.png`}
                                    style={{ margin: "0 .25rem 0 .5rem", width: "25px" }}

                                />
                            </Link>
                            <div className="moveDetail moveDetailLeft"><div style={{ marginRight: ".25rem", marginLeft: ".75em" }}>POWER:</div><div>{move.power}</div>
                            </div>
                            <div className="moveDetail moveDetailLeft"><div style={{ marginRight: ".25rem", marginLeft: ".75em" }}>ACCURACY:</div><div>{move.accuracy}</div>
                            </div>
                            <div className="moveDetail moveDetailLeft"><div style={{ marginRight: ".25rem", marginLeft: ".75em" }}>TARGET:</div><div>{targetStr()}</div>
                            </div>
                        </Grid>
                        <Grid size={{ xs: 12, md: 7 }} >
                            
                            <div className="moveDetail moveDetailRight"><div style={{ marginRight: ".25rem" }}>MAX NO. OF HITS:</div><div>{move.maxHits}</div>
                            </div>
                            <div className="moveDetail moveDetailRight"><div style={{ marginRight: ".25rem" }}>AP COST:</div><div>{move.apCost}</div>
                            </div>
                            <div className="moveDetail moveDetailRight"><div style={{ marginRight: ".25rem" }}>COPYABLE:</div><div>{move.canBeCopied.toString()}</div>
                            </div>
                            <div className="moveDetail moveDetailRight"><div style={{ marginRight: ".25rem" }}>PRIORITY:</div><div>{move.priority}</div>
                            </div>
                            
                        </Grid>
                    </Grid>

                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <div>
                        <h3 style={{ marginTop: "0", marginBottom: "-.75em" }}>Description</h3>
                        <p>{move.description}</p>
                        <h3 style={{ marginTop: "0", marginBottom: "-.75em" }}>How to Obtain</h3>
                        
                            <p>A compatible monster can obtain {move.name} when it levels up or applies a sticker.</p> 
                                {move.tags?.includes(move.elementalType.toLowerCase()) ? <p>{move.name} can be obtained by a <span style={{ fontWeight: 'bold', color: elementColors[move.elementalType.toLowerCase()] }}>{move.elementalType}</span> bootleg monster upon leveling up.</p> : <></>}
                            

                       
                    </div>


                </Grid>
                <Grid size={{ xs: 12, md: 6 }} >
                    <h3>Species that learn {move.name}</h3>
                    <MovePageMonsterTable monsters={monsterList} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <h3>Status Effects</h3>
                    <StatusTable statuses={move.statuses} />
                </Grid>
            </Grid>
        </ContentCard>
    );
};

export default Monster;