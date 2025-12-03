import { createAsyncThunk } from "@reduxjs/toolkit";
import { addItem, DesktopItem, setItems } from "./desktopSlice";
import { api } from "@/shared/api/api";

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
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.get("/folders/find");
      const userItems: DesktopItem[] = res.data;
      console.log(userItems.length);
      // пушим каждый элемент в Redux
      userItems.forEach((item) => {
        dispatch(addItem(item));
      });

      return userItems;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Server error");
    }
  }
);
