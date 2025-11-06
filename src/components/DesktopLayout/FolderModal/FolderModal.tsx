import React from "react";
import cls from "./FolderModal.module.scss";

export const FolderModal = ({ item, handleCloseWindow }: any) => {
  return (
    <div className={cls.folderWindow}>
      <div className={cls.folderHeader}>
        <span>{item.name || "Папка"}</span>
        <button onClick={handleCloseWindow}>×</button>
      </div>
      <div className={cls.folderContent}>
        <p>Здесь будет содержимое папки</p>
        <p>{item.name}</p>
      </div>
    </div>
  );
};
