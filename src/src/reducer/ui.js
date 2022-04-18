import { createSlice } from "@reduxjs/toolkit";

import { ThemeType } from "../theme";

const initialState = {
  theme: ThemeType.DARK,
};

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    switchTheme: (state) => {
      state.theme =
        state.theme === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK;
    },
  },
});

export const { switchTheme } = slice.actions;

export default slice.reducer;
