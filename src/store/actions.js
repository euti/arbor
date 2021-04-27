import db from './db';

export function loadElements() {
    return db.branches
        .toArray()
        .then(branches => {
            return db.leaves
                .toArray()
                .then(leaves => {
                    return {
                        type: 'LOAD_DATA',
                        branches,
                        leaves,
                    };
                });
        });
};

export function switchAdd(state, id) {
    return {
        type: 'SWITCH_ADD',
        state,
        id,
    }
};

export function switchDelete(state, id) {
    return {
        type: 'SWITCH_DELETE',
        state,
        id,
    }
};

export function selectBranch(id) {
    return {
        type: 'SELECT_BRANCH',
        id,
    }
}

export function addBranch(newObj) {
    return db.branches.add(newObj)
        .then(id=> {
            return {
                type: 'ADD_BRANCH',
                branch: Object.assign({id},newObj),
            }
        })
};

export function deleteBranch(id) {
    return db.branches.where("id").equals(id).delete()
        .then(()=> {
            return {
                type: 'DELETE_BRANCH',
                id,
            }
        })
};

export function setSearchTextBranch(text) {
    return {
        type: 'SET_SEARCHTEXT_BRANCH',
        text,
    }
}
