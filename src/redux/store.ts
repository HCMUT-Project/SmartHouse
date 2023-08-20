import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import userReducer from './reducer/user.reducer';
// import categoryReducer from './reducers/categorySlice';
// import newsReducer from './reducers/newsSlice';
// import reportReducer from './reducers/reportSlice';

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    // category: categoryReducer,
    // news: newsReducer,
    // report: reportReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
