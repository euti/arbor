import React, { useState } from 'react';
import { connect } from 'react-redux';
import './branch.css'
import {
    switchAdd,
    switchDelete,
    selectBranch,
} from "../store/actions";
import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Collapse,
} from '@material-ui/core';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    SubdirectoryArrowRight as SubIcon,
} from '@material-ui/icons';

const Branch = (props) => {
    const [open,setOpen] = useState(false);

    const {
        dispatch,
        branches,
        selectedId,
        id = undefined,
    } = props;

    const item = id
        ? branches.find(branch => branch.id === id)
        : {id:undefined, name:"trunk"}
    const childs = branches
        ? branches.filter(branch => branch.parentId === id)
        : [];
    const hasChilds = childs.length > 0;

    return (
        <div className="tree">
            <ListItem
                button
                key={"item_"+id}
                selected={id === selectedId}
                onClick={()=> {
                    dispatch(selectBranch(id))
                }}
            >
                {id && <SubIcon />}
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                    <IconButton
                        size='small'
                        onClick={()=> {
                            setOpen(!open);
                        }}
                    >
                        {hasChilds
                            ? open
                                ? <ExpandLessIcon />
                                : <ExpandMoreIcon />
                            : undefined
                        }
                    </IconButton>
                    <IconButton
                        size='small'
                        onClick={()=>dispatch(switchAdd(true,item.id))}
                    >
                        <AddIcon />
                    </IconButton>
                    {id && <IconButton
                        size='small'
                        onClick={()=>dispatch(switchDelete(true,item.id))}
                        disabled={hasChilds}
                    >
                        <DeleteIcon />
                    </IconButton>}
                </ListItemSecondaryAction>
            </ListItem>
            {hasChilds && (
                <Collapse
                    in={open}
                    key={"childs_"+id}
                >
                    {childs.map(child=> {
                        return (
                            <Branch
                                dispatch={dispatch}
                                branches={branches}
                                selectedId={selectedId}
                                id={child.id}
                                key={"branch_"+child.id}
                            />
                        )
                    })}
                </Collapse>
            )}
        </div>
    )
};

const mapStateToProps = state => {
    return {
        branches: state.branches,
        selectedId: state.selectedId,
    }
};

export default connect(mapStateToProps, null)(Branch);