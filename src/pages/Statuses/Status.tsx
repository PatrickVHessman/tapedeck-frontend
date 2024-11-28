import { useState, useEffect} from 'react';
import { Typography, Grid2 as Grid, Divider } from '@mui/material';
import MoveTable from '@/components/MoveTables/MoveTable';
import ContentCard from '@/components/ContentCard/ContentCard';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { StatusView } from '../../models/status';
import TypeInteractionTable from '../../components/TypeInteractionTable/TypeInteractionTable';


const Monster = () => {
    const apiUrl = import.meta.env.VITE_CB_API_URL;

    let { statusKey } = useParams();

    const [status, setStatus] = useState<StatusView>(new StatusView());

    const fetchStatus = async () => {
        await fetch(`${apiUrl}Status/GetStatusViewByName?name=${statusKey}`, {
            method: 'GET',
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                const res = JSON.parse(data) as unknown as StatusView;
                setStatus(res);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const InitStatusPage = () => {
        fetchStatus();
    }

    useEffect(() => {
        InitStatusPage();
    }, []);

    const header = (
        <div style={{display: "flex", alignItems: "center"} }>
            <Typography variant="h1" style={{ display: "inline-block" }}>
                {status.name}
            </Typography>
    </div>
    );

    return (
        <ContentCard header={header} bootleg={false} subHeader={`${status.category} Status Effect`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{status.name} - Tapedeck</title>
                <link rel="canonical" href={`https://tapedeck.top/statuses/${status.key}`} />
                <meta name="description" content={status.description} />
                <meta name="og:description" content={status.description} />
                <meta name="og:title" content={`${status.name} - Tapedeck`} />
            </Helmet>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }} >
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 5 }} style={{display: "flex"} }>
                    <div className="monsterHighlightContainer">
                        <div className="monsterHighlightBody">
                            
                        <img
                            src={`/icons/statusEffects/${status.key}.png`}
                            style={{ display: "inline-flex" }}
                        />
                                </div>
                            </div>
                        </Grid>
                        <Grid size={{ xs: 12, md: 7 }} >
                            <div className={`monsterDetail ${status.category != "Transmutation" ? status.category.toLowerCase() : 'transmute'}Cell`}>
                                <div style={{ marginRight: ".25rem" }}>CATEGORY: {status.category}</div>
                            </div>
                            <div className="monsterDetail monsterDetailNeutral"><div style={{ marginRight: ".25rem" }}>DURATION:</div>
                                {status.hasDuration ? "Limited" : "Unlimited"}
                            </div>
                            <div className="monsterDetail monsterDetailNeutral"><div style={{ marginRight: ".25rem" }}>REMOVABLE:</div>
                                {status.isRemovable ? "Yes" : "No"}</div>
                    </Grid>
                </Grid>
                    
                    </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <div>
                        <h3 style={{ marginTop: "0" }}>Description</h3>
                        <p>{status.description}</p>
                    </div>
               
                    
                </Grid></Grid>
            <Divider sx={{ marginTop: "1.5em"}} />
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }} >
                    <h3>Associated Moves</h3>
                    <MoveTable monSelected={true} moves={status.associatedMoves} selectMessage="" noResultsMessage="No moves are associated with this status effect." />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <h3>Associated Type Matchups</h3>
                    <TypeInteractionTable interactions={status.typeInteractions} key={status.key } />
                </Grid>
                </Grid>
        </ContentCard>
    );
};

export default Monster;