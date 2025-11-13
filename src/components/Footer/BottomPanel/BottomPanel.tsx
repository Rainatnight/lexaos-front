import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setActiveFolder, restoreFolder } from "@/store/slices/desktopSlice";
import cls from "./BottomPanel.module.scss";

export const BottomPanel = () => {
  const dispatch = useDispatch();
  const openFolders = useSelector(
    (state: RootState) => state.desktop.openFolders
  );

  const items = useSelector((state: RootState) => state.desktop.items);

  const activeFolderId = useSelector(
    (state: RootState) => state.desktop.activeFolderId
  );

  return (
    <div className={cls.panel}>
      {openFolders.map((folder) => {
        const item = items.find((i) => i.id === folder.id);
        if (!item) return null;

        return (
          <div
            key={folder.id}
            id={`folder-tab-${folder.id}`}
            className={`${cls.tab} ${
              folder.id === activeFolderId ? cls.active : ""
            }`}
            onClick={() => {
              dispatch(restoreFolder(folder.id)); // показываем окно
              dispatch(setActiveFolder(folder.id));
            }}
          >
            {item.component ? item.component : <span>{item.name}</span>}
          </div>
        );
      })}
    </div>
  );
};
