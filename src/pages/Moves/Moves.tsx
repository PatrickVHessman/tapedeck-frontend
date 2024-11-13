import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import ContentCard from '@/components/ContentCard/ContentCard';
import { MoveView } from '@/models/moves';
import MovesPageMoveTable from '@/components/MoveTables/MovesPageMoveTable';
import { Helmet } from 'react-helmet';

const Moves = () => {
    const apiUrl = import.meta.env.VITE_CB_API_URL;

    const [moveList, setMoveList] = useState<MoveView[]>([]);

    const fetchMoves= async () => {
        await fetch(`${apiUrl}Moves/GetAllMoveListViews`, {
            method: 'GET',
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                const res = JSON.parse(data) as unknown as MoveView[];
                setMoveList(res);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const InitMovesPage = async () => {
        await fetchMoves();
    }

    useEffect(() => {
        InitMovesPage();
    }, []);

    const header = <Typography variant="h1">
        Moves
    </Typography>;

    return (
        <ContentCard header={header} bootleg={false}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Moves - Tapedeck</title>
            </Helmet>
            <div>
                <p>
                    In <em>Cassette Beasts</em>, players have a range of <strong>Moves</strong> to choose from in battle:</p>
                <ul>
                    <li><strong>Melee and Ranged attacks</strong> deal direct damage to opponents.</li>
                    <li><strong>Status Effect moves</strong> apply conditions to opponents, impacting their abilities or stats.</li>
                    <li><strong>Miscellaneous moves</strong> create other strategic effects within the battlefield.</li>
                </ul>
                <p>Each move is classified as either active or passive. <strong>Active moves</strong> require a turn to use, while <strong>Passive moves</strong> automatically trigger under specific conditions during battle.</p>
            </div>
            <MovesPageMoveTable moves={moveList} />
        </ContentCard>
    );
};

export default Moves;
