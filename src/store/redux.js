import { createStore } from 'redux';

const initialState = {
    branches: [],
    leaves: [],
    showAdd: false,
    showDelete: false,
    modalId: undefined,
    selectedId: undefined,
    searchTextBranch: '',
};

function reducer(state, action) {
    switch (action.type) {
        case 'LOAD_DATA' : return {
            branches: action.branches,
            leaves: action.leaves,
            showAdd: state.showAdd,
            showDelete: state.showDelete,
            modalId: state.modalId,
            selectedId: state.selectedId,
            searchTextBranch: state.searchTextBranch,
        }
        case 'SWITCH_ADD' : return {
            branches: state.branches,
            leaves: state.leaves,
            showAdd: action.state,
            showDelete: state.showDelete,
            modalId: action.id,
            selectedId: state.selectedId,
            searchTextBranch: state.searchTextBranch,
        }
        case 'SWITCH_DELETE' : return {
            branches: state.branches,
            leaves: state.leaves,
            showAdd: state.showAdd,
            showDelete: action.state,
            modalId: action.id,
            selectedId: state.selectedId,
            searchTextBranch: state.searchTextBranch,
        }
        case 'SELECT_BRANCH' : return {
            branches: state.branches,
            leaves: state.leaves,
            showAdd: state.showAdd,
            showDelete: state.showDelete,
            modalId: state.modalId,
            selectedId: action.id,
            searchTextBranch: state.searchTextBranch,
        }
        case 'ADD_BRANCH' : return {
            branches: [...state.branches,action.branch],
            leaves: state.leaves,
            showAdd: state.showAdd,
            showDelete: state.showDelete,
            modalId: state.modalId,
            selectedId: state.selectedId,
            searchTextBranch: state.searchTextBranch,
        }
        case 'DELETE_BRANCH' : return {
            branches: state.branches.filter(branch=>branch.id !== action.id),
            leaves: state.leaves,
            showAdd: state.showAdd,
            showDelete: state.showDelete,
            modalId: state.modalId,
            selectedId: state.selectedId,
            searchTextBranch: state.searchTextBranch,
        }
        case 'SET_SEARCHTEXT_BRANCH' : return {
            branches: state.branches,
            leaves: state.leaves,
            showAdd: state.showAdd,
            showDelete: state.showDelete,
            modalId: state.modalId,
            selectedId: state.selectedId,
            searchTextBranch: action.text,
        }
        default:
            return state
    }
}

let store = createStore(
    reducer,
    initialState,
);

export default store;
