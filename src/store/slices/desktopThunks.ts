import { createAsyncThunk } from "@reduxjs/toolkit";
import { addItem, DesktopItem, renameItem, setItems } from "./desktopSlice";
import { api } from "@/shared/api/api";
import { RootState } from "..";

export const createFolderThunk = createAsyncThunk(
  "desktop/createFolder",
  async (
    {
      name,
      x,
      y,
      parentId,
    }: { name: string; x: number; y: number; parentId?: string | null },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const res = await api.post("/folders/create", {
        name,
        x,
        y,
        parentId: parentId ?? null,
      });

      const folder = res.data;

      dispatch(addItem(folder));

      return folder;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Server error");
    }
  }
);

// Загружает все элементы рабочего стола пользователя
export const loadDesktopThunk = createAsyncThunk(
  "desktop/loadDesktop",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const res = await api.get("/folders/find");
      const userItems: DesktopItem[] = res.data;

      const state = getState() as RootState;
      const existingItems = state.desktop.items;

      userItems.forEach((item) => {
        const exists = existingItems.some((i) => i.id === item.id);
        if (!exists) {
          dispatch(addItem(item));
        }
      });

      return userItems;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Server error");
    }
  }
);

export const renameFolderThunk = createAsyncThunk(
  "desktop/renameFolder",
  async (
    { id, newName }: { id: string; newName: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      await api.put("/folders/rename", { id, newName });

      // обновляем Redux только после успешного ответа
      dispatch(renameItem({ id, newName }));

      return { id, newName };
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Rename error");
    }
  }
);
