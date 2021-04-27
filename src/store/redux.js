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
            ...state,
            branches: action.branches,
            leaves: action.leaves,
        }
        case 'SWITCH_ADD' : return {
            ...state,
            showAdd: action.state,
            modalId: action.id,
        }
        case 'SWITCH_DELETE' : return {
            ...state,
            showDelete: action.state,
            modalId: action.id,
        }
        case 'SELECT_BRANCH' : return {
            ...state,
            selectedId: action.id,
        }
        case 'ADD_BRANCH' : return {
            ...state,
            branches: [...state.branches,action.branch],
        }
        case 'DELETE_BRANCH' : return {
            ...state,
            branches: state.branches.filter(branch=>branch.id !== action.id),
        }
        case 'SET_SEARCHTEXT_BRANCH' : return {
            ...state,
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
