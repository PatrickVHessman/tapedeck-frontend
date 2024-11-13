import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import StatusTable from '../../components/StatusTable/ExpandedStatusTable';
import { Status } from '../../models/status';
import ContentCard from '@/components/ContentCard/ContentCard';
import { Link } from 'react-router-dom';

const Statuses = () => {
    const apiUrl = import.meta.env.VITE_CB_API_URL;

    const [statusList, setStatusList] = useState<Status[]>([]);

    const fetchStatuses = async () => {
        await fetch(`${apiUrl}Status/GetAllStatuses`, {
            method: 'GET',
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                const res = JSON.parse(data) as unknown as Status[];
                setStatusList(res);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const InitStatusesPage = async () => {
        await fetchStatuses();
    }

    useEffect(() => {
        InitStatusesPage();
    }, []);

    const header = <Typography variant="h1">
        Status Effects
    </Typography>;

    return (
        <ContentCard header={header} bootleg={false}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Status Effects - Tapedeck</title>
            </Helmet>
            <div>
                <p><strong>Status Effects</strong> are unique conditions that can be applied to <Link to="/monsters">Monsters</Link> through different <Link to="/moves">Moves</Link>, each affecting them in distinct ways. There are four main types of status effects:</p>

                <ul>
                    <li><strong>Buff:</strong> Provides a positive boost to the monster it's applied to.</li>
                    <li><strong>Debuff:</strong> Causes a negative impact on the affected monster.</li>
                    <li><strong>Transmutation:</strong> Alters the monster's type, changing its strengths and weaknesses.</li>
                    <li><strong>Miscellaneous Effects:</strong> Have varied effects that can either benefit or hinder the target in unique ways.</li>
                </ul>
            </div>
            <StatusTable statuses={statusList} />
        </ContentCard>
    );
};

export default Statuses;
