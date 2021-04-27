import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import clsx from 'clsx';
import {
    CssBaseline,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    Divider,
    List,
    Box,
    Link,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
    makeStyles,
} from '@material-ui/core';
import {
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
} from '@material-ui/icons';
import store from './store/redux';
import {
    loadElements,
    switchAdd,
    switchDelete,
    setSearchTextBranch,
    addBranch,
    deleteBranch,
} from "./store/actions";
import Branch from './components/branch';

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

const App = (props) => {
    const classes = useStyles();
    const [showDrawer, setShowDrawer] = useState(true);
    const {
        dispatch,
        showAdd,
        showDelete,
        modalId,
        modalName,
        selectedId,
        selected,
        searchTextBranch,
    } = props;

    useEffect(
        ()=> loadElements().then(action => store.dispatch(action)),
        []
    );

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setShowDrawer(open);
      };

    const addBranchDialog = (
        <Dialog
            id="addBranchDialog"
            position="absolute"
            open={showAdd}
        >
            <DialogTitle>
                new branch
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {
                        modalId
                            ? `branch of ${modalName}`
                            : "trunk branch"
                    }
                </DialogContentText>
                <TextField id="addName" autoFocus label="name" />
            </DialogContent>
            <DialogActions>
                <Button
                    id="addButtonAdd"
                    onClick={() => {
                        addBranch({
                            name: document.getElementById("addName").value,
                            parentId: modalId,
                        }).then(action => {
                            dispatch(action);
                            dispatch(switchAdd(false));
                        });
                    }}
                >
                    add
                </Button>
                <Button
                    id="addButtonCancel"
                    onClick={() => {
                        dispatch(switchAdd(false))
                    }}
                >
                    cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
    
    const deleteBranchDialog = (
        <Dialog
            id="addCategoryDialog"
            position="absolute"
            open={showDelete}
        >
            <DialogTitle>
                delete branch
            </DialogTitle>
            <DialogContent>
                do you want to delete "{modalName}" branch and ALL its leaves?
            </DialogContent>
            <DialogActions>
                <Button
                    id="deleteCategoryButtonAdd"
                    onClick={() => {
                        deleteBranch(modalId)
                            .then(action => {
                                dispatch(action);
                                dispatch(switchDelete(false));
                            });
                    }}>
                    delete
                </Button>
                <Button
                    id="deleteCategoryButtonCancel"
                    onClick={() => {
                        dispatch(switchDelete(false))
                    }}
                >
                    cancel
                </Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <div
            id="app"
            className={classes.root}
        >
            <CssBaseline />
            {addBranchDialog}
            {deleteBranchDialog}
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, showDrawer && classes.appBarShift)}
            >
                <Toolbar className={classes.toolbar}>
                    {!showDrawer && <IconButton
                        id="openDrawer"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>}
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        arbor
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                open={showDrawer}
                classes={{
                    paper: clsx(classes.drawerPaper, !showDrawer && classes.drawerPaperClose),
                }}
            >
                <div className={classes.toolbarIcon}>
                    <TextField
                        id="searchBranches"
                        autoComplete='off'
                        label="search"
                        value={searchTextBranch}
                        onChange={(e)=>dispatch(setSearchTextBranch(e.target.value))}
                    />
                    <IconButton
                        id="closeDrawer"
                        onClick={toggleDrawer(false)}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />         
                <List dense={true}>
                    <Branch />
                </List>            
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
const mapStateToProps = state => {
    return {
        showAdd: state.showAdd,
        showDelete: state.showDelete,
        modalId: state.modalId,
        modalName: state.branches.find(branch=>branch.id===state.modalId)?.name,
        selectedId: state.selectedId,
        selected: state.branches.find(branch=>branch.id===state.selectedId)?.name,
        searchTextBranch: state.searchTextBranch,
    }
};

export default connect(mapStateToProps, null)(App);
