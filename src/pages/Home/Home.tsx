import { Typography, Grid2 as Grid,} from '@mui/material';
import ContentCard from '@/components/ContentCard/ContentCard';
import { Helmet } from 'react-helmet';
import HomeListItem from '../../components/HomeListItem/HomeListItem';
import { Link } from 'react-router-dom';

class HomeLink {
    public image: string = "";
    public name: string = "";
    public url: string = "";
}

const Home = () => {
    const homeLinks: HomeLink[] = [
        {
            name: "Monsters",
            url: "/monsters",
            image: "/sprites/monsters/springheel.gif"
        },
        {
            name: "Fusions",
            url: "/fusions",
            image: "/icons/fusion_radar.png"
        },
        {
            name: "Moves",
            url: "/moves",
            image: "/icons/statusEffects/locked_on.png"
        },
        {
            name: "Elemental Types",
            url: "/statuses",
            image: "/icons/statusEffects/astral_coating.png"
        },
        {
            name: "Status Effects",
            url: "/statuses",
            image: "/icons/statusEffects/sleep.png"
        },
    ]

    const header = <Typography variant="h1">
        Home
    </Typography>;

    return (
        <ContentCard header={header} bootleg={false}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home - Tapedeck</title>
            </Helmet>
            <p>Welcome to Tapedeck, an interactive and informational resource for Bytten Studios's monster collecting RPG <em>Cassette Beasts</em>. Learn about monsters and moves or experment with bootlegs and fusions!</p>
            <p>Have suggestions? Contact me on the <Link to="https://discord.gg/byttenstudio" target="_blank">Bytten Studios Discord community</Link> at the tag RaptorMcAwesome.</p>
            <Grid container spacing={2} style={{ padding: ".75em", justifyContent: "center" }}>
                {homeLinks.map(x => (
                    <HomeListItem name={x.name} url={x.url} image={x.image} key={x.name} />
                )
                )}

            </Grid>
        </ContentCard>
    );
};

export default Home;
