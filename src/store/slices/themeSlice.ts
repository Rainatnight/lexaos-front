import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  background: string;
}

const initialState: ThemeState = {
  background: "#ffffff", // белый по умолчанию
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setBackground: (state, action: PayloadAction<string>) => {
      state.background = action.payload;
    },
  },
});

export const { setBackground } = themeSlice.actions;
export default themeSlice.reducer;
