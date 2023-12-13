import { UPDATE_TICKETS } from "./action";

const initialState = {
    updateCount: 0,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TICKETS:
            return {
                ...state,
                updateCount: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;