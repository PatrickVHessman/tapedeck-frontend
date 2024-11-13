import { Container} from '@mui/material';
import { ReactNode } from 'react';

const ContentCard = (props: { header: ReactNode, bootleg: boolean, children: ReactNode, subHeader?: string }) => {
    return (
        <Container sx={{ py: 2, position: 'relative', flexGrow: 2 }}>
            <div className="contentCard">
                <div className={props.bootleg ? "cardHeader clippedTopLeftCornerBootleg" : "cardHeader clippedTopLeftCorner"} style={{ textTransform: "uppercase" }}>
                    
                        {props.header}
                    
                </div>
                {
                    props.subHeader ? <div className={`cardSubheader ${props.bootleg ? "cardSubheaderBootleg" : "cardSubheaderNormal"}`}><h3 style={{ margin: "0" }}>{props.subHeader}</h3></div> : <></>
                }
                
                <div className="cardBody">
                    {props.children}

                </div>
            </div>
                </Container>
    );
}

export default ContentCard;