import React, { useState } from "react";
import clsx from 'clsx';
import {
    CssBaseline,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    Divider,
    Box,
    Link,
    makeStyles,
} from '@material-ui/core';
import {
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
} from '@material-ui/icons';

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: 0,//theme.spacing(9),
        },
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    appBarSpacer: theme.mixins.toolbar,
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
  }));

const App = () => {
    const classes = useStyles();
    const [showCategories, setShowCategories] = useState(true);

    return (
        <div id="app" className={classes.root}>
            <CssBaseline />
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, showCategories && classes.appBarShift)}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setShowCategories(true)}
                        className={clsx(classes.menuButton, showCategories && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        arbor
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !showCategories && classes.drawerPaperClose),
                }}
                open={showCategories}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={() => setShowCategories(false)}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />         
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Box pt={4}>
                    <Typography variant="body2" color="textSecondary" align="center">
                        {'made with love by '}
                        <Link color="inherit" href="https://euti.es">
                            euti.es
                        </Link>
                    </Typography>
                </Box>
            </main>
        </div>
    );
}

export default App;
