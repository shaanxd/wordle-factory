import { createSlice } from "@reduxjs/toolkit";

import { SolvedState } from "../constants";

const initialState = {
  wordles: {},
};

const slice = createSlice({
  name: "data",
  initialState,
  reducers: {
    createSolution: (state, { payload: { id, solution } }) => {
      state.wordles[id] = { status: SolvedState.UNSOLVED, solution };
    },
    updateSolution: (state, { payload: { id, solution } }) => {
      state.wordles[id].solution = solution;
    },
  },
});

export const { createSolution, updateSolution } = slice.actions;

export default slice.reducer;
