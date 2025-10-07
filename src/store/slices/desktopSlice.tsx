import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PC, Vs, TrashBin } from "@/components/DesktopIcons";
import { russianCompare } from "@/helpers/russianSort";

export interface DesktopItem {
  id: string;
  type: "pc" | "vs" | "trash" | "folder" | string;
  name: string;
  x: number;
  y: number;
  component?: React.ReactNode;
}

interface DesktopState {
  items: DesktopItem[];
}

const defaultIcons: DesktopItem[] = [
  {
    id: "pc",
    type: "pc",
    name: "Этот компьютер",
    x: 0,
    y: 0,
    component: <PC />,
  },
  {
    id: "vs",
    type: "vs",
    name: "Visual Studio",
    x: 0,
    y: 80,
    component: <Vs />,
  },
  {
    id: "trash",
    type: "trash",
    name: "Корзина",
    x: 0,
    y: 160,
    component: <TrashBin />,
  },
];

const initialState: DesktopState = {
  items: [...defaultIcons],
};

export const desktopSlice = createSlice({
  name: "desktop",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<DesktopItem>) {
      let baseName = action.payload.name;
      let name = baseName;
      let counter = 1;

      // Проверяем, есть ли уже элементы с таким именем
      const existingNames = state.items.map((i) => i.name);

      while (existingNames.includes(name)) {
        name = `${baseName} (${counter})`;
        counter++;
      }

      state.items.push({ ...action.payload, name });
    },
    moveItem(
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>
    ) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.x = action.payload.x;
        item.y = action.payload.y;
      }
    },
    setItems(state, action: PayloadAction<DesktopItem[]>) {
      state.items = action.payload;
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    sortItemsByName(state) {
      const spacing = 80;
      const margin = 0;
      let screenHeight = 800; // дефолт
      if (typeof window !== "undefined") {
        screenHeight = window.innerHeight;
      }

      state.items.sort((a, b) => russianCompare(a.name, b.name));

      // расставляем сеткой
      let x = margin;
      let y = margin;

      for (const item of state.items) {
        item.x = x;
        item.y = y;
        y += spacing;

        if (y + spacing > screenHeight) {
          y = margin;
          x += spacing;
        }
      }
    },
  },
});

export const { addItem, moveItem, setItems, removeItem, sortItemsByName } =
  desktopSlice.actions;

export default desktopSlice.reducer;
