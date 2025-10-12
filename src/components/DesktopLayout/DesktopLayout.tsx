import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { DraggableItem } from "./DraggableItem/DraggableItem";
import { setSelectedItem } from "@/store/slices/desktopSlice";
import cls from "./DesktopLayout.module.scss";

export const DesktopLayout = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.desktop.items);

  // Сброс выделения при клике по фону
  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Проверяем, что клик был именно по фону, а не по дочернему элементу
    if (e.target === e.currentTarget) {
      dispatch(setSelectedItem(null));
    }
  };

  return (
    <div className={cls.desktopWrapper} onClick={handleBackgroundClick}>
      {items.map((item) => (
        <DraggableItem key={item.id} item={item} />
      ))}
    </div>
  );
};
