import { useState, useEffect } from 'react';
import { Typography, Switch, FormGroup, FormControlLabel, Grid2 as Grid, FormControl, InputLabel, Select, OutlinedInput, MenuItem, SelectChangeEvent, } from '@mui/material';
import ContentCard from '@/components/ContentCard/ContentCard';
import { MonsterListItemClass } from '../../models/species';
import MonsterListItem from '../../components/MonsterListItem/MonsterListItem';
import { Helmet } from 'react-helmet';

const Monsters = () => {
    const apiUrl = import.meta.env.VITE_CB_API_URL;

    const [monsterList, setMonsterList] = useState<MonsterListItemClass[]>([]);
    const [includeSecret, setIncludeSecret] = useState<boolean>(false);
    const [includeDlc, setIncludeDlc] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>("By Number");

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const sortOptions: string[] = ["By Number","Alphabetically"];

    const fetchSpeciesListData = async (inclSec: boolean = false, inclDlc: boolean = false) => {
        await fetch(`${apiUrl}Species/GetSpeciesListItems?inclSec=${inclSec}&inclDlc=${inclDlc}`, {
            method: 'GET',
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                let res = JSON.parse(data) as unknown as MonsterListItemClass[];
                sortMonsters(sortBy, res);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const InitMonsterPage = async () => {
        await fetchSpeciesListData();
    }

    // @ts-expect-error
    const handleSecretSwitch = (event) => {
        setIncludeSecret(event.target.checked);
        fetchSpeciesListData(event.target.checked, includeDlc);
    }

    // @ts-expect-error
    const handleDlcSwitch = (event) => {
        setIncludeDlc(event.target.checked);
        fetchSpeciesListData(includeSecret, event.target.checked);
    }

    const sortMonsters = (sortKey: string, list: MonsterListItemClass[]) => {
        if (sortKey == "Alphabetically") {
            const sorted: MonsterListItemClass[] = list.sort((a, b) => {
                const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
            setMonsterList(sorted);
        }
        else {
            const sorted: MonsterListItemClass[] = list.sort((a, b) => {
                if (a.bestiaryIndex > b.bestiaryIndex || a.bestiaryIndex < 0) {
                    return 1;
                }
                if (a.bestiaryIndex < b.bestiaryIndex) {
                    return -1;
                }
                
                return 0;
            });
            setMonsterList(sorted);
        }
    }

    const handleSort = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;

        setSortBy(value);
        sortMonsters(value, monsterList);
    }

    useEffect(() => {
        InitMonsterPage();
    }, []);

    const header = <Typography variant="h1">
        Monsters
    </Typography>;

    return (
        <ContentCard header={header} bootleg={false}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Monsters - Tapedeck</title>
                <link rel="canonical" href="https://tapedeck.top/monsters" />
                <meta name="description" content="Monster species of the video game Cassette Beasts" />
                <meta name="og:description" content="Monster species of the video game Cassette Beasts" />
                <meta name="og:title" content="Monsters - Tapedeck" />
            </Helmet>
            <p>In <em>Cassette Beasts</em>, each team member transforms into a unique monster species during battle.</p>

            <p>Players can record an opponent's monster onto a tape, adding it to their roster of available monsters for future battles. Up to six species can be actively prepared for combat, while any extras are stored in the tape inventory and can be swapped in during rest periods.</p>

            <FormGroup row style={{ marginBottom: "1em" }}>
                <FormControlLabel
                    value={includeSecret}
                    control={<Switch color="secondary" />}
                    label="Include Secret Monsters"
                    labelPlacement="end"
                    onChange={handleSecretSwitch}
                    color="secondary"
                />
                <FormControlLabel
                    value={includeDlc}
                    control={<Switch color="secondary" />}
                    label="Include DLC Monsters"
                    labelPlacement="end"
                    onChange={handleDlcSwitch}
                />
                <FormControl sx={{ m: 1, flexGrow: 1, width: "30px" }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                        value={sortBy}
                        onChange={handleSort}
                        input={<OutlinedInput label="Sort By" />}
                        MenuProps={MenuProps}
                    >
                        {sortOptions.map((item) => (
                            <MenuItem
                                key={item}
                                value={item}
                            >
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </FormGroup>

            <Grid container spacing={2} style={{padding: ".75em"} }>
                {monsterList.map(x => (
                        <MonsterListItem monster={x} />
                )
                )}
                
            </Grid>
        </ContentCard>
    );
};

export default Monsters;
