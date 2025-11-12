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

export interface IOpenFolder {
  id: string;
  x: number;
  y: number;
}

interface DesktopState {
  items: DesktopItem[];
  iconSize: number;
  selectedItemId: string | null;
  renamingItemId: null | string;
  openFolders: IOpenFolder[];
  activeFolderId: string | null;
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
  iconSize: 80,
  selectedItemId: null,
  renamingItemId: null,
  openFolders: [],
  activeFolderId: null as string | null,
};

export const desktopSlice = createSlice({
  name: "desktop",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<DesktopItem>) {
      let baseName = action.payload.name;
      let name = baseName;
      let counter = 1;
      const existingNames = state.items.map((i) => i.name);
      while (existingNames.includes(name)) {
        name = `${baseName} (${counter++})`;
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

    moveFolder: (state, action) => {
      const { id, x, y } = action.payload;
      const folder = state.openFolders.find((f) => f.id === id);
      if (folder) {
        folder.x = x;
        folder.y = y;
      }
    },

    setItems(state, action: PayloadAction<DesktopItem[]>) {
      state.items = action.payload;
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    sortItemsByName(state) {
      const spacing = state.iconSize;
      const margin = 0;
      let screenHeight =
        typeof window !== "undefined" ? window.innerHeight : 800;
      state.items.sort((a, b) => russianCompare(a.name, b.name));
      let x = margin,
        y = margin;
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

    setIconSize(state, action: PayloadAction<number>) {
      state.iconSize = action.payload;
      const spacing = state.iconSize;
      const margin = 0;
      let screenHeight =
        typeof window !== "undefined" ? window.innerHeight : 800;
      let x = margin,
        y = margin;
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

    setSelectedItem(state, action: PayloadAction<string | null>) {
      state.selectedItemId = action.payload;
    },

    setRenamingItem(state, action: PayloadAction<string | null>) {
      state.renamingItemId = action.payload;
    },

    renameItem(state, action: PayloadAction<{ id: string; newName: string }>) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.name = action.payload.newName.trim();
      state.renamingItemId = null;
    },

    openFolder: (
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>
    ) => {
      const { id, x, y } = action.payload;

      if (state.openFolders.some((f) => f.id === id)) return;

      //  небольшое смещение, чтобы не перекрывало курсор
      state.openFolders.push({
        id,
        x: x + 10,
        y: y + 10,
      });

      state.activeFolderId = id;
    },

    closeFolder: (state, action: PayloadAction<string>) => {
      state.openFolders = state.openFolders.filter(
        (f) => f.id !== action.payload
      );
    },

    setActiveFolder: (state, action) => {
      state.activeFolderId = action.payload;
    },
  },
});

export const {
  addItem,
  moveItem,
  setItems,
  removeItem,
  sortItemsByName,
  setIconSize,
  setSelectedItem,
  setRenamingItem,
  renameItem,
  openFolder,
  closeFolder,
  setActiveFolder,
  moveFolder,
} = desktopSlice.actions;

export default desktopSlice.reducer;
