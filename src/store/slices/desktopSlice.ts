import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DesktopItem {
  id: string;
  type: "folder" | "file" | "shortcut";
  name: string;
  x: number;
  y: number;
}

interface DesktopState {
  items: DesktopItem[];
}

const initialState: DesktopState = {
  items: [],
};

const desktopSlice = createSlice({
  name: "desktop",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<DesktopItem>) => {
      state.items.push(action.payload);
    },
    moveItem: (
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.x = action.payload.x;
        item.y = action.payload.y;
      }
    },
    setItems: (state, action: PayloadAction<DesktopItem[]>) => {
      state.items = action.payload;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export const { addItem, moveItem, setItems, removeItem } = desktopSlice.actions;
export default desktopSlice.reducer;
