import { BrowserRouter, Link as RouterLink } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import Routing from './routes/Routing';
import { useState, MouseEvent } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Helmet } from "react-helmet";
import { Footer } from './components/Footer/Footer';

const App = () => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleMenu = (event: MouseEvent<HTMLElement>) => {
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
          <AppBar position="static" style={{ marginBottom: ".6em", paddingRight: "0" }} id="navHeader">
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
                          <MenuItem onClick={handleClose} component={RouterLink} to="/">Home</MenuItem>
                          <MenuItem onClick={handleClose} component={RouterLink} to="/monsters">Monsters</MenuItem>
                          <MenuItem onClick={handleClose} component={RouterLink} to="/fusions">Fusions</MenuItem>
                          <MenuItem onClick={handleClose} component={RouterLink} to="/elementalTypes">Elemental Types</MenuItem>
                          <MenuItem onClick={handleClose} component={RouterLink} to="/moves">Moves</MenuItem>
                          <MenuItem onClick={handleClose} component={RouterLink} to="/statuses">Status Effects</MenuItem>
                          <MenuItem onClick={handleClose} component={RouterLink} to="/acknowledgements">Acknowledgements</MenuItem>
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
