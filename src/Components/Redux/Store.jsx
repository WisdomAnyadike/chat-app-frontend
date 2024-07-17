import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import firstProfileSlice from './FirstProfileSlice';
import tokenSlice from './tokenSlice';

const persistConfig = {
    key: 'final',
    storage,
    whitelist: ['firstProfileSlice', 'tokenSlice']
};


const rootReducer = combineReducers({
    firstProfileSlice,
    tokenSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore actions from redux-persist
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/REGISTER',
                    'persist/FLUSH',
                    'persist/PAUSE',
                    'persist/PURGE',
                ],
            },
        }),
});

export const persistor = persistStore(Store);