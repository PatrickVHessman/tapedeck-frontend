import { Link } from "react-router-dom";

export const Footer = () => {
    return (<footer id="footer">Created by <Link to="https://www.patrickvhessman.com/" target="_blank">Patrick Hessman</Link> | <Link to="https://github.com/PatrickVHessman/tapedeck-api" target="_blank">View API source code</Link> | <Link to="https://github.com/PatrickVHessman/tapedeck-frontend" target="_blank">View frontend source code</Link></footer>);
}