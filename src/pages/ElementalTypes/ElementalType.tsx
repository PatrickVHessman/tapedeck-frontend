import { useState, useEffect } from 'react';
import { Typography, Divider, Grid2 as Grid } from '@mui/material';
import MovesPageMoveTable from '@/components/MoveTables/MovesPageMoveTable';
import ContentCard from '@/components/ContentCard/ContentCard';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ElementalTypeView } from '../../models/elementalType';
import TypeInteractionTable from '../../components/TypeInteractionTable/TypeInteractionTable';
import MonsterListItem from '../../components/MonsterListItem/MonsterListItem';


const ElementalType = () => {
    const apiUrl = import.meta.env.VITE_CB_API_URL;

    let { elementKey } = useParams();

    const [element, setElement] = useState<ElementalTypeView>(new ElementalTypeView());


    const fetchElement = async () => {
        await fetch(`${apiUrl}ElementalTypes/GetElementalTypeViewByName?name=${elementKey}`, {
            method: 'GET',
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                let res = JSON.parse(data) as unknown as ElementalTypeView;
                setElement(res);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        fetchElement();
    }, []);

    const header = (
        <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h1" style={{ display: "inline-block" }}>
                {element.name}
            </Typography>
            <img
                src={`/icons/types/element_${element.name}.png`}
                style={{ display: "inline-block", margin: "0 .25rem 0 .5rem", width: "40px" }}

            />
        </div>
    );


    return (
        <ContentCard header={header} bootleg={false}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{element.name} - Tapedeck</title>
            </Helmet>
            <Divider textAlign="left"><h3>Species</h3></Divider>
            <Grid container spacing={2} style={{ padding: ".75em" }}>
                {element.monsters.map(x => (
                    <MonsterListItem monster={x} />
                )
                )}

            </Grid>
            <Divider textAlign="left"><h3>Type Interactions</h3></Divider>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }} >
            <h4>Attacking</h4>
                    <TypeInteractionTable interactions={element.inflicts} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} >
            <h4>Defending</h4>
                    <TypeInteractionTable interactions={element.receives} />
                </Grid>
            </Grid>

            

            <Divider textAlign="left"><h3>Moves</h3></Divider>
            <MovesPageMoveTable moves={element.moves} />
        </ContentCard>
    );
};

export default ElementalType;