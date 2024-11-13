import { BrowserRouter, Link } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import Routing from './routes/Routing';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Helmet } from "react-helmet";
import { Footer } from './components/Footer/Footer';

const App = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
  return (
      <BrowserRouter>
          <Helmet>
              <meta charSet="utf-8" />
              <title>Home - Tapedeck</title>
          </Helmet>
          <AppBar position="static" style={{ marginBottom: ".6em", paddingRight: "0" }}>
              <Toolbar>
                  <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                      onClick={handleMenu}
                  >
                      <MenuIcon />
                  </IconButton>
                  <Typography variant="h3" sx={{ flexGrow: 1 }} style={{ fontFamily: "Atomic Marker", fontWeight: "normal" }}>
                      Tapedeck
                  </Typography>
                  <div>
                      <Menu
                          id="menu-appbar"
                          anchorEl={anchorEl}
                          anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                          }}
                          keepMounted
                          transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                          }}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                      >
                          <MenuItem onClick={handleClose}><Link to="/home">Home</Link></MenuItem>
                          <MenuItem onClick={handleClose}><Link to="/monsters">Monsters</Link></MenuItem>
                          <MenuItem onClick={handleClose}><Link to="/fusions">Fusions</Link></MenuItem>
                          <MenuItem onClick={handleClose}><Link to="/elementalTypes">Elemental Types</Link></MenuItem>
                          <MenuItem onClick={handleClose}><Link to="/moves">Moves</Link></MenuItem>
                          <MenuItem onClick={handleClose}><Link to="/statuses">Status Effects</Link></MenuItem>
                          <MenuItem onClick={handleClose}><Link to="/acknowledgements">Acknowledgements</Link></MenuItem>
                      </Menu>
                  </div>
              </Toolbar>
          </AppBar>
      <CssBaseline />
          <Routing /><Footer />
      <div id="checkeredBg" />
    </BrowserRouter>
  );
};

export default App;
