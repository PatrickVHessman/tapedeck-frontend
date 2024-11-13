import { Typography } from '@mui/material';
import ContentCard from '@/components/ContentCard/ContentCard';
import { Helmet } from 'react-helmet';

const Acknowledgements = () => {
    const header = <Typography variant="h1">
        Acknowledgements
    </Typography>;

    return (
        <ContentCard header={header} bootleg={false}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Acknowledgements and Credits - Tapedeck</title>
            </Helmet>
            <div>
                <p>This project would not have been possible without the following projects, utilities and individuals:</p>
                <ul>
                    <li><a href="https://github.com/excaliburzero" target="_blank">ExcaliburZero</a> for technical advice and his <a href="https://github.com/ExcaliburZero/cbpickaxe" target="_blank">cbpickaxe</a> project for giving me a starting place in implementing the bootleg recolor animations</li>
                    <li><a href="https://jnordberg.github.io/gif.js/" target="_blank">Gif.js</a> used for creating sprite animations</li>
                    <li><a href="https://www.flaticon.com/free-icon/cassette-tape_4178735" target="_blank">Freepik</a> for the cassette icon used for the site's favicon</li>
                    <li>The <a href="https://wiki.cassettebeasts.com/wiki/Modding:Mod_Developer_Guide#Decompiling_Cassette_Beasts" target="_blank">Cassette Beasts wiki's modding guide</a> for guidance in decompiling and data mining the game.</li>
                    <li><a href="https://mui.com/" target="_blank">MUI React</a> used for layout components and data grids</li>
                    <li><a href="https://www.chartjs.org/" target="_blank">Chart.js</a> used for statblock charts</li>
                    <li>And of course, <a href="https://bytten-studio.com/" target="_blank">Bytten Studio</a> for creating the amazing game this is all based on</li>
                </ul>
            </div>
        </ContentCard>
    );
};

export default Acknowledgements;
