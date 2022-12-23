import {createAction, createSlice} from "@reduxjs/toolkit";
import userService from "../service/user.service";
import userBasketService from "../service/basket.service";
import userFavoriteService from "../service/favorite.service";


const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: true,
        entities: null,
        error: null,
        auth: null,
        isLoggedIn: false,
    },
    reducers: {
        userCreateRequested: (state) => {
            state.error = null;
            state.isLoading = true;
        },
        userRequestedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        userCreated: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.isLoggedIn = true;
        },
        guestCreated: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.isLoggedIn = false;
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
        },
        addToFavoriteRequestedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        addToFavoriteReceived: (state, action) => {
            state.entities.favorite = action.payload;
            state.isLoading = false;
        },
        removeToFavoriteRequestedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        removeToFavoriteReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        addToBasketReceived: (state, action) => {
            state.entities.basket = action.payload;
            state.isLoading = false;
        },
        addToBasketRequestedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        removeFromBasketReceived: (state, action) => {
            state.entities.basket = action.payload;
            state.isLoading = false;
        },
        removeFromBasketFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    }

});
const {reducer: userReducer, actions} = userSlice;
const {
    userCreateRequested,
    userRequestedFailed,
    guestCreated,
    userCreated,
    userLoggedOut,
    addToFavoriteReceived,
    addToFavoriteRequestedFailed,
    removeToFavoriteReceived,
    removeToFavoriteRequestedFailed,
    addToBasketReceived,
    addToBasketRequestedFailed,
    removeFromBasketReceived,
    removeFromBasketFailed

} = actions;


const guestCreateRequested = createAction("user/guestCreateRequested");
const userCreateReceived = createAction("user/userCreateReceived");
const addToFavoriteRequested = createAction("user/addToFavoriteRequested");
const removeFromFavoriteRequested = createAction("user/removeToFavoriteRequested");
const addToBasketRequested = createAction("user/addToBasketRequested");
const removeFromBasketRequested = createAction("user/removeFromBasketRequested");

export function createUser() {
    return async function(dispatch) {
        dispatch(userCreateRequested());
        try {
            const userData = await userService.getCurrentUser();
            if(!userData) {
                dispatch(createGuest());
            } else {
                const {userBasket} = await userBasketService.getById(userData.basket);
                const {modelsId} = await userFavoriteService.getById(userData.favorite);

                dispatch(userCreated({
                    currentUser: userData,
                    basket: userBasket,
                    favorite: modelsId
                }));
                dispatch(userCreateReceived());
            }
        } catch(error) {
            dispatch(userRequestedFailed(error.message));

        }
    };
}

export const createGuest = () => async (dispatch) => {
    const guest = {
        username: "guest",
        role: ["GUEST"],
    };
    dispatch(guestCreateRequested());
    try {
        dispatch(guestCreated({
            currentUser: guest,
            basket: [],
            favorite: []
        }));
        dispatch(userCreateReceived());
    } catch(error) {
        dispatch(userRequestedFailed(error.message));

    }
};
export const addToFavorite = (modelId) => async (dispatch) => {
    dispatch(addToFavoriteRequested());
    try {
        const data = await userFavoriteService.addModelToFavorite(modelId);
        dispatch(addToFavoriteReceived(data));
        if(data) {
            dispatch(addToFavoriteReceived(data));
        }

    } catch(error) {
        dispatch(addToFavoriteRequestedFailed(error.message));

    }
};
export const removeFromFavorite = (modelId) => async (dispatch) => {
    dispatch(removeFromFavoriteRequested());
    try {
        const data = await userFavoriteService.removeToFavorite(modelId);
        dispatch(removeToFavoriteReceived(data));
    } catch(error) {
        dispatch(removeToFavoriteRequestedFailed(error.message));

    }
};
export const addToBasket = (model) => async (dispatch) => {
    dispatch(addToBasketRequested());
    try {
        const data = await userBasketService.addBasket(model);
        dispatch(addToBasketReceived(data));
    } catch(error) {
        dispatch(addToBasketRequestedFailed(error.message));

    }

};
export const removeFromBasket = (modelId) => async (dispatch) => {

    dispatch(removeFromBasketRequested());
    try {
        const data = await userBasketService.removeFromBasket(modelId);
        dispatch(removeToFavoriteReceived(data))
    } catch(error) {
        dispatch(removeFromBasketFailed(error.message));

    }
};

export const userLogOut = () => async (dispatch) => {
    dispatch(userLoggedOut());
};
export const getUserLoadingStatus = () => (state) => state.user.isLoading;


export const getCurrentUser = () => (state) => {
    if(state.user.entities.currentUser) {
        return state.user.entities.currentUser;
    }
};

export const getUserBasket = () => (state) => {
    if(state.user.entities.basket) {
        return state.user.entities.basket;
    } else {
        return [];
    }
};

export const getUserFavorite = () => (state) => {
    if(state.user.entities.favorite) {
        return state.user.entities.favorite;
    } else {
        return [];
    }

};


export default userReducer;