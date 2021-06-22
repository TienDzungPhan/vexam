import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@App/store";
import { IQuestion, TFilters } from "@Models/Question";
// import { IExam, TCategory } from "@Models/Exam";

export interface IHomeDataState {
  questions: IQuestion[] | null;
  position: [number, number];
  filters: TFilters;
}

const initialState: IHomeDataState = {
  questions: null,
  position: [0, 0],
  filters: {
    examId: "",
    categories: [],
  },
};

export const homeDataSlice = createSlice({
  name: "homeData",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    storeQuestions: (state, action: PayloadAction<IQuestion[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.questions = action.payload;
    },
    storePosition: (state, action: PayloadAction<[number, number]>) => {
      // eslint-disable-next-line no-param-reassign
      state.position = action.payload;
    },
    storeFilters: (state, action: PayloadAction<TFilters>) => {
      // eslint-disable-next-line no-param-reassign
      state.filters = action.payload;
    },
  },
});

export const { storeQuestions, storePosition, storeFilters } =
  homeDataSlice.actions;

export const selectQuestions = (state: RootState): IQuestion[] | null =>
  state.homeData.questions;

export const selectPosition = (state: RootState): [number, number] =>
  state.homeData.position;

export const selectFilters = (state: RootState): TFilters =>
  state.homeData.filters;

export default homeDataSlice.reducer;
