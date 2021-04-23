import { createStore } from 'redux';

const initialState = {
};

function reducer(state, action) {
    switch (action.type) {
        default:
            return state
    }
}

let store = createStore(
    reducer,
    initialState,
);

export default store;
