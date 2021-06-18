import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@App/store";
import { IQuestion } from "@Models/Question";

export interface IHomeDataState {
  questions: IQuestion[];
  position: [number, number];
}

const initialState: IHomeDataState = {
  questions: [],
  position: [0, 0],
};

export const homeDataSlice = createSlice({
  name: "homeData",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    storeQuestions: (state, action: PayloadAction<IQuestion[]>) => {
      state.questions.push(...action.payload);
    },
    storePosition: (state, action: PayloadAction<[number, number]>) => {
      // eslint-disable-next-line no-param-reassign
      state.position = action.payload;
    },
  },
});

export const { storeQuestions, storePosition } = homeDataSlice.actions;

export const selectQuestions = (state: RootState): IQuestion[] =>
  state.homeData.questions;

export const selectPosition = (state: RootState): [number, number] =>
  state.homeData.position;

export default homeDataSlice.reducer;
