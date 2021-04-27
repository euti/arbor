import React, { useEffect } from "react";
import { connect } from 'react-redux';
import SimpleMDE from "simplemde";
import {
    deleteLeaf,
} from "../store/actions";

const Leaf = (props) => {
    const {
        dispatch,
        leaf,
    } = props;

    useEffect(
        ()=> {
            var mdEditor = new SimpleMDE({
                element: document.getElementById("mdEditor_"+leaf.id),
                promptURLs: true,
            });

            mdEditor.value(leaf.text);

            mdEditor.gui.toolbar.remove();
            mdEditor.toolbar.push({
                name: 'delete',
                action: ()=>{
                    deleteLeaf(leaf.id)
                        .then(action => {
                            dispatch(action);
                        })
                },
                className: 'fa fa-trash no-disable',
                title: 'delete leaf '+leaf.id,
            });
            mdEditor.createToolbar();

            mdEditor.togglePreview();
        },
        [leaf, dispatch]
    )

    return (
        <div id={leaf.id} key={leaf.id}>
            <textarea
                id={"mdEditor_"+leaf.id}
            />
        </div>
    )
}

export default connect()(Leaf);
