import { useState, useEffect, useRef } from 'react';
import { Typography, Select, SelectChangeEvent, OutlinedInput, InputLabel, MenuItem, FormControl, Grid2 as Grid, RadioGroup, Divider } from '@mui/material';
import MoveTable from '@/components/MoveTables/MoveTable';
import Statblock from '@/components/Statblock/Statblock';
import ContentCard from '@/components/ContentCard/ContentCard';
// @ts-expect-error
import GIF from "gif.js.optimized";
// @ts-expect-error
import workerStr from "@/gifWorker.js";
import { Link, useParams } from 'react-router-dom';
import { BootlegSpecies, EvolvesTo } from '../../models/species';
import { Helmet } from 'react-helmet';


const Monster = () => {
    const apiUrl = import.meta.env.VITE_CB_API_URL;

    let { monsterKey } = useParams();

    const [monster, setMonster] = useState<BootlegSpecies>(new BootlegSpecies());
    const [bootlegDropdownMenuItems, setBootlegDropdownMenuItems] = useState<string[]>([]);
    const [bootlegType, setBootlegType] = useState<string>("None");
    const [firstLoaded, setFirstLoaded] = useState<boolean>(false);

    const [spriteImg, setSpriteImg] = useState<HTMLImageElement>(new Image());

    const resultRef = useRef(null);

    const workerBlob = new Blob([workerStr], {
        type: "application/javascript"
    });

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

    const canv = document.createElement("canvas");
    const ctx = canv.getContext('2d', { willReadFrequently: true });
    const draw = () => {
        let animateCounter = 0;
        const gif = new GIF({
            workers: 2,
            workerScript: URL.createObjectURL(workerBlob),
            quality: 10,
            width: monster.spriteWidth,
            height: monster.spriteHeight,
            transparent: "#000000",
        });
        if (ctx != null && monster.spriteParams.length > 0) {
            for (let i = 0; i < monster.spriteParams.length; i++) {
                ctx.clearRect(0, 0, 200, 200);
                ctx.drawImage(spriteImg, monster.spriteParams[i].sx, monster.spriteParams[i].sy, monster.spriteParams[i].swidth, monster.spriteParams[i].sheight, monster.spriteParams[i].dx, monster.spriteParams[i].dy, monster.spriteParams[i].dwidth, monster.spriteParams[i].dheight);

                const imageData = ctx.getImageData(0, 0, 200, 200);
                const data = imageData.data;

                
                for (let i = 0; i < data.length; i += 4) {
                    if (bootlegType != "None") {
                        const resIndex: number = monster.swapColorsRgba.findIndex(x => x.r8 == data[i] && x.g8 == data[i + 1] && x.b8 == data[i + 2]);
                        if (resIndex >= 0) {
                            imageData.data[i] = monster.recolorsRgba[resIndex].r8;
                            imageData.data[i + 1] = monster.recolorsRgba[resIndex].g8;
                            imageData.data[i + 2] = monster.recolorsRgba[resIndex].b8;
                        }
                    }
                        if (data[i] == 0 && data[i + 1] == 0 && data[i + 2] == 0) {
                            imageData.data[i] = 1;
                            imageData.data[i + 1] = 1;
                            imageData.data[i + 2] = 1;
                        }
                    } 
                

                ctx.putImageData(imageData, 0, 0);

                if (animateCounter == 6) {
                    animateCounter = 0;
                }
                else animateCounter++;
                gif.addFrame(ctx, { delay: 100, copy: true });
            }
        }
        gif.on("finished", (blob: Blob | MediaSource) => {
            
            const url = URL.createObjectURL(blob);
            // @ts-expect-error
            resultRef.current.src = url;

            });

            gif.render();
        }
    

    const fetchBootlegListData = async () => {
        await fetch(`${apiUrl}ElementalTypes/GetElementalTypesDropdown`, {
            method: 'GET',
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                let res = JSON.parse(data) as unknown as string[];
                setBootlegDropdownMenuItems(res);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const fetchBootlegMonster = async (bootleg: string = "none") => {
        await fetch(`${apiUrl}Species/GetSpeciesBootlegViewByName?name=${monsterKey}&bootleg=${bootleg}`, {
            method: 'GET',
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                const res = JSON.parse(data) as unknown as BootlegSpecies;
                setMonster(res);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const InitMonsterPage = async () => {
        await fetchBootlegMonster();
        await fetchBootlegListData();
        loadImage();
        setFirstLoaded(true);
    }

    const loadImage = () => {
        const img = new Image();
        const src: string = `/sprites/monsters/${monsterKey?.toLowerCase()}.png`;
        img.src = src;
        if (img.complete) {
            img.src = src;
            setSpriteImg(img);
        } else {
            img.onload = () => {
                setSpriteImg(img);
            };
        }
        img.src = src;
    }

    useEffect(() => {
        InitMonsterPage();
    }, []);

    useEffect(() => {
        draw();
    }, [spriteImg]);

    useEffect(() => {
        if (firstLoaded) {
            draw();
        }
    }, [monster]);

    const handleBootlegSelect = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;
        setBootlegType(value);
        fetchBootlegMonster(value);
    }

    const header = (
        <div style={{display: "flex", alignItems: "center"} }>
            <Typography variant="h1" style={{ display: "inline-block" }}>
        {`#${monster.bestiaryIndex >= 0 ? monster.bestiaryIndex : "???"} ${monster.name}`}
            </Typography>
            <img
                src={`/icons/monsters/${monster.key.toLowerCase()}.png`}
                style={{ display: "inline-block", margin: "0 .25rem 0 .5rem", width: "40px" }}

            />
    </div>
    );

    const evolvesFrom = (evos: string[]) => {
        if (evos.length > 0) {
            return evos.map((x, i) => <><Link to={`/monsters/${x.replace(" ", "_")}`} onClick={() => {
                window.location.href = `/monsters/${x.replace(" ", "_")}`;
            }} style={{ display: "flex", alignItems: "center" }}><div>{x}</div><img
                    src={`/icons/monsters/${x.toLowerCase().replace(" ", "_")}.png`}
                style={{ margin: "0 0 0 .25rem", width: "25px" }}

            /></Link>{i != (evos.length - 1) ? <div style={{ marginRight: ".25rem" }}>,</div> : <></>}</>)
        }
        else return (<span>NONE</span>)
    }

    const evolvesTo = (evos: EvolvesTo[]) => {
        if (evos.length > 0) {
            return evos.map((x, i) => <><Link to={`/monsters/${x.evolvedForm.replace(" ", "_")}`} onClick={() => {
                window.location.href = `/monsters/${x.evolvedForm.replace(" ", "_")}`;
            }} style={{ display: "flex", alignItems: "center" }}><div>{x.evolvedForm}</div><img
                    src={`/icons/monsters/${x.evolvedForm.toLowerCase().replace(" ", "_")}.png`}
                style={{ margin: "0 0 0 .25rem", width: "25px" }}

            /></Link>{i != (evos.length - 1) ? <div style={{marginRight: ".25rem"} }>,</div> : <></>}</>)
        }
        else return (<span>NONE</span>)
    }

    return (
        <ContentCard header={header} bootleg={bootlegType != "None"}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{monster.name} - Tapedeck</title>
            </Helmet>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }} >
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 5 }} style={{display: "flex"} }>
                    <div className="monsterHighlightContainer">
                        <div className="monsterHighlightBody">
                            
                        <img
                            ref={resultRef}

                            src="/icons/question_icon.png"
                            style={{ display: "inline-flex" }}
                        />
                        
                        <div className="monsterHighlightHeader">
                            <Typography variant="body1" style={{ fontWeight: 500, display: "inline-block", fontSize: "1.2rem" }}>
                                {`"${monster.description}"`}
                            </Typography>
                           
                                    </div>
                                
                                
                                </div>
                            </div>
                        </Grid>
                        <Grid size={{ xs: 12, md: 7 }} >
                            <Link to={`/elementalTypes/${monster.elementalType}`} className={`monsterDetail ${monster.elementalType.toLowerCase()}Detail`}>
                                <div>TYPE: {monster.elementalType}</div>  <img
                                    src={`/icons/types/element_${monster.elementalType.toLowerCase()}.png`}
                                    style={{ margin: "0 .25rem 0 .5rem", width: "25px" }}

                                />
                            </Link>
                            <div className="monsterDetail monsterDetailNeutral"><div style={{ marginRight: ".25rem" }}>REMASTER FROM:</div>

                                {
                                    evolvesFrom(monster.evolvesFrom)
                                }

                            </div>
                            <div className="monsterDetail monsterDetailNeutral"><div style={{ marginRight: ".25rem" }}>REMASTER TO:</div>

                                {
                                    evolvesTo(monster.evolvesTo)
                                }

                            </div>
                            <RadioGroup row style={{ marginTop: ".75rem" }}>
                                <FormControl sx={{flexGrow: 1 }}>
                                    <InputLabel color="warning">Bootleg Type</InputLabel>
                                    <Select
                                        value={bootlegType}
                                        onChange={handleBootlegSelect}
                                        input={<OutlinedInput label="Bootleg Type" color="warning" />}
                                        MenuProps={MenuProps}
                                        color="warning"
                                    >
                                        {bootlegDropdownMenuItems.map((item) => (
                                            <MenuItem
                                                key={item}
                                                value={item}
                                            >
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </RadioGroup>
                    </Grid>
                </Grid>
                    
                    </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                    <div>
                        <h3 style={{ marginTop: "0" }}>Description</h3>
                        {monster.bestiaryBios.map((x, i) => <p key={i}>{x}</p>)}
                    </div>
               
                    
                </Grid>
                </Grid>

                <Divider sx={{ marginTop: "1.5em" }} />

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }} >
                    <h3>Moveset</h3>
                    <MoveTable moves={[...new Set([...monster.moves.learnedMoves, ...monster.moves.stickerMoves])]} monSelected={monster.name != ""} selectMessage="Select monster" noResultsMessage="No moves found" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <h3>Stats</h3>
                    <Statblock stats={monster.stats} />
                </Grid>
            </Grid>
        </ContentCard>
    );
};

export default Monster;