import {
  configureStore,
  ThunkAction,
  Action,
  AnyAction,
  ThunkDispatch,
  Dispatch,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import homeDataReducer from "@Reducers/homeData";

export const store = configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["homeData/storeQuestions"],
    },
  }),
  reducer: {
    homeData: homeDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = (): ThunkDispatch<unknown, null, AnyAction> &
  ThunkDispatch<unknown, undefined, AnyAction> &
  Dispatch<AnyAction> => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
