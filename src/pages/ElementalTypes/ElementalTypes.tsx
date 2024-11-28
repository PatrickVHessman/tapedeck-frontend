import { useState, useEffect } from 'react';
import { Typography, Divider, Grid2 as Grid } from '@mui/material';
import ContentCard from '@/components/ContentCard/ContentCard';
import { Helmet } from 'react-helmet';
import ElementListItem from '../../components/ElementListItem/ElementListItem';



const ElementalTypes = () => {
    const apiUrl = import.meta.env.VITE_CB_API_URL;

    const [elements, setElements] = useState<string[]>([]);

    const fetchElements = async () => {
        await fetch(`${apiUrl}ElementalTypes/GetElementalTypesDropdown`, {
            method: 'GET',
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                let res = JSON.parse(data) as unknown as string[];
                res.shift();
                setElements(res);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        fetchElements();
    }, []);

    const header = (
            <Typography variant="h1" style={{ display: "inline-block" }}>
                Elemental Types
            </Typography>
    );


    return (
        <ContentCard header={header} bootleg={false}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Elemental Types - Tapedeck</title>
                <link rel="canonical" href="https://tapedeck.top/elementalTypes/" />
                <meta name="description" content="In Cassette Beasts, every monster and move has an elemental type that defines its unique strengths, weaknesses, and abilities." />
            </Helmet>

            <p>Every monster and move has an elemental type that defines its unique strengths, weaknesses, and abilities. Monsters that differ in type from their typical species are known as <em>bootlegs</em>.</p>

            <p>Some moves are <strong>Typeless</strong>, meaning they adopt the elemental type of the monster using them. In battles, untransformed humans are also considered typeless, making them unaffected by type-based interactions.</p>


            <Divider textAlign="left"><h3>Elemental Types</h3></Divider>
            <Grid container spacing={2} style={{ padding: ".75em" }}>
                {elements.map((x, i) => <ElementListItem key={i} element={x} />)}
            </Grid>
        </ContentCard>
    );
};

export default ElementalTypes;