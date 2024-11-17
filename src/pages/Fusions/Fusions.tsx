import { useState, useEffect, useRef} from 'react';
import { Typography, Select, SelectChangeEvent, OutlinedInput, InputLabel, MenuItem, FormControl, Switch, FormGroup, FormControlLabel, TextField, Button, Grid2 as Grid, RadioGroup, Divider } from '@mui/material';;
import { DropdownMenuItem, Fusion, ImageObj, NodeFrame } from '@/models/fusion';
import { elementColors, baseFusionRgb } from '@/consts';
import MoveTable from '@/components/MoveTables/MoveTable';
import Statblock from '@/components/Statblock/Statblock';
import ContentCard from '@/components/ContentCard/ContentCard';
// @ts-expect-error
import GIF from "gif.js.optimized";
// @ts-expect-error
import workerStr from "@/gifWorker.js";
import { Helmet } from 'react-helmet';

const Fusions = () => {
    const apiUrl = import.meta.env.VITE_CB_API_URL;

    const [dropdownMenuItems, setDropdownMenuItems] = useState<DropdownMenuItem[]>([]);
    const [monster1, setMonster1] = useState<string>("");
    const [monster2, setMonster2] = useState<string>("");

    const [fusion, setFusion] = useState<Fusion>(new Fusion());
    const [imageFrames, setImageFrames] = useState<ImageObj[]>([]);

    const [includeSecret, setIncludeSecret] = useState<boolean>(false);
    const [includeDlc, setIncludeDlc] = useState<boolean>(false);

    const [seedNumber, setSeedNumber] = useState<number>(0);

    const [showBootlegDropdown, setShowBootlegDropdown] = useState<boolean>(false); 
    const [bootlegDropdownMenuItems, setBootlegDropdownMenuItems] = useState<string[]>([]);
    const [monster1Bootleg, setMonster1Bootleg] = useState<string>("None");
    const [monster2Bootleg, setMonster2Bootleg] = useState<string>("None");

    const [firstLoaded, setFirstLoaded] = useState<boolean>(false);

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
            width: fusion.spriteWidth,
            height: fusion.spriteHeight,
            transparent: "#000000",  
        });
        if (ctx != null && imageFrames.length > 0) {
            for (let i = 0; i < 6; i++) {
                ctx.clearRect(0, 0, 200, 200);
                imageFrames.forEach(x => {
                    if (x.frames.length > 0) {
                        ctx.drawImage(x.img, x.frames[animateCounter].sx, x.frames[animateCounter].sy, x.frames[animateCounter].swidth, x.frames[animateCounter].sheight, x.frames[animateCounter].dx, x.frames[animateCounter].dy, x.frames[animateCounter].dwidth, x.frames[animateCounter].dheight);
                    }
                }
                );
                const imageData = ctx.getImageData(0, 0, 200, 200);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    const resIndex: number = baseFusionRgb.findIndex(x => x.r == data[i] && x.g == data[i + 1] && x.b == data[i + 2]);
                    if (resIndex >= 0) {
                        data[i] = fusion.swapColorsRgba[resIndex].r8;
                        data[i + 1] = fusion.swapColorsRgba[resIndex].g8;
                        data[i + 2] = fusion.swapColorsRgba[resIndex].b8;
                    }
                    if (data[i] == 0 && data[i + 1] == 0 && data[i + 2] == 0) {
                        data[i] = 1;
                        data[i + 1] = 1;
                        data[i + 2] = 1;
                    }
                }

                ctx.putImageData(imageData, 0, 0);
                if (animateCounter == 6) {
                    animateCounter = 0;
                }
                else animateCounter++;
                gif.addFrame(ctx, { delay: 110, copy: true });
            }

            gif.on("finished", (blob: Blob | MediaSource) => {
               const url = URL.createObjectURL(blob);
               setFirstLoaded(true);
               // @ts-expect-error
               resultRef.current.src = url;
               
            });

            gif.render();
        }
    }

    const fetchSelectListData = async (inclSec: boolean = false, inclDlc: boolean = false) => {
        await fetch(`${apiUrl}Species/GetSpeciesNameDropdownList?inclSec=${inclSec}&inclDlc=${inclDlc}`, {
            method: 'GET',
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                let res = JSON.parse(data) as unknown as DropdownMenuItem[];
                res = res.sort((a, b) => {
                    // @ts-expect-error
                    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                    // @ts-expect-error
                    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
                const defaultItem: DropdownMenuItem = { name: "-- Select a Monster --", key: "", disabled: true };
                res.unshift(defaultItem);
                setDropdownMenuItems(res);
            })
            .catch((error) => {
                console.log(error)
            });
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

    const fetchFusion = async (mon1: string, mon2: string, seed: number = 0, bootleg1: string = "none", bootleg2: string = "none") => {
        await fetch(`${apiUrl}Fusion/GetFusion?monster1=${mon1}&monster2=${mon2}&seed=${seed}&mon1bootleg=${bootleg1}&mon2bootleg=${bootleg2}`, {
            method: 'GET',
        })
            .then((res) => {
                return res.text()
            })
            .then((data) => {
                let res = JSON.parse(data) as unknown as Fusion;
                res.highlightBg = getFusionHighlightBg(res);
                setFusion(res);
                composeImageFrames(res);
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const InitFusionPage = async () => {
        await fetchSelectListData();
        await fetchBootlegListData();
    }

    // @ts-expect-error
    const handleSecretSwitch = (event) => {
        setIncludeSecret(event.target.checked);
        fetchSelectListData(event.target.checked, includeDlc);
    }

    // @ts-expect-error
    const handleDlcSwitch = (event) => {
        setIncludeDlc(event.target.checked);
        fetchSelectListData(includeSecret, event.target.checked);
    }

    // @ts-expect-error
    const handleBootlegSwitch = (event) => {
        setShowBootlegDropdown(event.target.checked);
        if (!event.target.checked) {
            setMonster1Bootleg("None");
            setMonster2Bootleg("None");
            fetchFusion(monster1, monster2, seedNumber, "None", "None");
        }
    }

    const composeImageFrames = (fusion: Fusion) => {
        var tempFrames: ImageObj[] = [];
        var loadedImages = 0;
        let numImages = 0;

        fusion.nodeFrames.forEach((x: NodeFrame) => {
            numImages++;
            let spriteName: string = x.params[0].name;
            let path = x.params[0] ? x.params[0].path : "";

            const img = new Image();
            img.onload = () => {
                loadedImages++;
                const imgObj: ImageObj = {
                    key: spriteName,
                    img: img,
                    frames: x.params,
                    stackOrder: x.stackOrder
                }
                tempFrames.push(imgObj);
                if (loadedImages == numImages) {
                    tempFrames = tempFrames.sort((a, b) => a.stackOrder - b.stackOrder);
                    setImageFrames(tempFrames);
                }
            };
            img.src = `/${path}`;
        });


};

    useEffect(() => {
        InitFusionPage();
    }, []);

    useEffect(() => {
        setFirstLoaded(false);
        draw();
    }, [imageFrames])

    const handleSelect1 = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;
        setMonster1(value);
        if (value !== "" && monster2 !== "") {
            fetchFusion(value, monster2, seedNumber, monster1Bootleg, monster2Bootleg);
        }
    };

    const handleSelect2 = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;
        setMonster2(value);
        if (monster1 !== "" && value !== "") {
            fetchFusion(monster1, value, seedNumber, monster1Bootleg, monster2Bootleg);
        }
    };

    // @ts-expect-error
    const handleSeedChange = (event) => {
        setSeedNumber(event.target.value);
        fetchFusion(monster1, monster2, event.target.value, monster1Bootleg, monster2Bootleg);
    }

    const handleMon1BootlegSelect = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;
        setMonster1Bootleg(value);
        fetchFusion(monster1, monster2, seedNumber, value, monster2Bootleg);
    }

    const handleMon2BootlegSelect = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;
        setMonster2Bootleg(value);
        fetchFusion(monster1, monster2, seedNumber, monster1Bootleg, value);
    }

    const reset = () => {
        setSeedNumber(0);
        setMonster1Bootleg("None");
        setMonster2Bootleg("None");
        fetchFusion(monster1, monster2, 0, "None", "None");
    }

    const getFusionHighlightBg = (fus: Fusion) => {
        if (fus.elementalTypes.length == 0) return "linear-gradient(135deg, transparent 10px, #3fbb9f 2%, #3fbb9f 98%, transparent 10px)";

        else if (fus.elementalTypes.length == 1 || (fus.elementalTypes.length == 2 && fus.elementalTypes[0] == fus.elementalTypes[1])) {
            return `linear-gradient(135deg, transparent 10px, ${elementColors[fus.elementalTypes[0].toLowerCase()]} 2%, ${elementColors[fus.elementalTypes[0].toLowerCase()]} 98%, transparent 10px)`
            ;
        }
        else if (fus.elementalTypes.length == 2) {
            return `linear-gradient(135deg, transparent 10px, ${elementColors[fus.elementalTypes[0].toLowerCase()]} 2%, ${elementColors[fus.elementalTypes[1].toLowerCase()]} 98%, transparent 10px)`
        }
        return "linear-gradient(135deg, transparent 10px, #3fbb9f 2%, #3fbb9f 98%, transparent 10px)";
    }

    const BootlegSelect = () => (<RadioGroup row>
        <FormControl sx={{ m: 1, flexGrow: 1 }}>
            <InputLabel color="warning">Monster 1 Bootleg</InputLabel>
            <Select
                value={monster1Bootleg}
                onChange={handleMon1BootlegSelect}
                input={<OutlinedInput label="Monster 1 Bootleg" color="warning" />}
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
        <FormControl sx={{ m: 1,flexGrow: 1 }}>
            <InputLabel color="warning">Monster 2 Bootleg</InputLabel>
            <Select
                value={monster2Bootleg}
                onChange={handleMon2BootlegSelect}
                input={<OutlinedInput label="Monster 2 Bootleg" color="warning" />}
                MenuProps={MenuProps}
                color="warning"
            >
                {bootlegDropdownMenuItems.map((item) => (
                    <MenuItem
                        key={item}
                        value={item}
                        color="warning"
                    >
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </RadioGroup>);

    const header = <Typography variant="h1">
        Fusions
    </Typography>;

    return (
        <ContentCard header={header} bootleg={showBootlegDropdown}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Fusions - Tapedeck</title>
            </Helmet>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }} >
                    <div className="fusionHighlightBody" style={{ background: fusion.highlightBg }}>

                            <div className="fusionNameHeader">
                                <Typography variant="h2" style={{ fontWeight: 500, display: "inline-block", fontSize: "1.6rem" }}>
                                    {fusion.monsterName ? fusion.monsterName : "Select Monsters for Fusion"}
                                </Typography>
                            {

                            }
                            <img
                                src={fusion.elementalTypes.length > 0 ? `/icons/types/element_${fusion.elementalTypes[0].toLowerCase()}.png` : ''}
                                style={{ margin: "0 .25rem 0 .5rem" }}
                                className={fusion.elementalTypes.length == 0 ? "none" : "fusionElementIcon"}
                                    />
                                    
                                    <img
                                src={fusion.elementalTypes.length > 1 ? `/icons/types/element_${fusion.elementalTypes[1].toLowerCase()}.png` : ''}
                                className={fusion.elementalTypes.length > 1 ? "fusionElementIcon" : "none" }
                                    />
                                       
                            </div>
                            <div className="fusionComponentSprites">
                                <img
                                src={`${monster1 ? "/sprites/monsters/" + monster1.toLowerCase().replace(" ", "_") + ".gif" : "/icons/question_icon.png"}`}
                                style={{ display: "inline-flex", gridArea: "mon1" }}
                                    className={monster1 ? "" : "unselectedFusionMonster"}
                                />
                                <img ref={resultRef}
                                    src="/static_150.gif"
                                    id="resultImage"
                                    className={firstLoaded ? 'fusionResultImg' : 'blob'}
                                    />
                                <img
                                src={`${monster2 ? "/sprites/monsters/" + monster2.toLowerCase().replace(" ", "_") + ".gif" : "/icons/question_icon.png"}`}
                                style={{ display: "inline-flex", gridArea: "mon2" }}
                                    className={monster2 ? "" : "unselectedFusionMonster"}
                                    />
                            </div>


                    </div>
                    <div>
                    <FormGroup row>
                        <FormControlLabel
                            value={includeSecret}
                            control={<Switch color="secondary" />}
                            label="Include Secret Monsters"
                            labelPlacement="end"
                            onChange={handleSecretSwitch}
                        />
                        <FormControlLabel
                            value={includeDlc}
                            control={<Switch color="secondary" />}
                            label="Include DLC Monsters"
                            labelPlacement="end"
                            onChange={handleDlcSwitch}
                        />
                        <FormControlLabel
                            value={showBootlegDropdown}
                            control={<Switch color="warning" value={showBootlegDropdown} />}
                            label="Bootleg Tapes"
                            labelPlacement="end"
                            onChange={handleBootlegSwitch}
                        />

                    </FormGroup>
                    <RadioGroup row>
                        <FormControl sx={{ m: 1, flexGrow: 1 }}>
                            <InputLabel>Monster 1</InputLabel>
                            <Select
                                value={monster1}
                                onChange={handleSelect1}
                                input={<OutlinedInput label="Monster 1" />}
                                MenuProps={MenuProps}
                            >
                                {dropdownMenuItems.map((item) => (
                                    <MenuItem
                                        key={item.key}
                                        value={item.key}
                                        disabled={item.disabled}
                                    >
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>

                        </FormControl>
                        <FormControl sx={{ m: 1, flexGrow: 1 }}>
                            <InputLabel>Monster 2</InputLabel>
                            <Select
                                value={monster2}
                                onChange={handleSelect2}
                                input={<OutlinedInput label="Monster 2" />}
                                MenuProps={MenuProps}
                            >
                                {dropdownMenuItems.map((item) => (
                                    <MenuItem
                                        key={item.key}
                                        value={item.name}
                                    >
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </RadioGroup>
                    {
                        showBootlegDropdown ? <BootlegSelect /> : <></>
                    }
                    <FormGroup row>
                        <FormControl sx={{ m: 1, width: "45%" }}>
                            <TextField
                                type="number"
                                name="seedNumber"
                                label="Seed"
                                variant="outlined"
                                value={seedNumber}
                                onChange={handleSeedChange}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: "45%", justifyContent: "center" }}>
                            <Button sx={{ height: "fit-content", alignSelf: "center", fontSize: "1.25rem", color: "#FFF" }}
                                variant="contained"
                                disableElevation
                                color="secondary"
                                onClick={reset}>RESET</Button>
                        </FormControl>
                        </FormGroup>
                    </div>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} >
                    
                    <Typography typography="h3">Base Stats</Typography>
                    <Statblock stats={fusion.fusionStats} />
                </Grid>
            </Grid>
            <Divider textAlign="left" style={{ marginBottom: "1em", marginTop: "1em" }}><Typography typography="h3">Moveset</Typography></Divider>
                    <MoveTable moves={[...new Set([...fusion.moves.learnedMoves, ...fusion.moves.stickerMoves])]} monSelected={fusion.monsterName != ""} selectMessage="Select monsters for fusion" noResultsMessage="No moves found" />
                    
            
        </ContentCard>
  );
};

export default Fusions;
