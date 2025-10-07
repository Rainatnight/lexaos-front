import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { DraggableItem } from "./DraggableItem/DraggableItem";
import cls from "./DesktopLayout.module.scss";

export const DesktopLayout = () => {
  const items = useSelector((state: RootState) => state.desktop.items);

  return (
    <div className={cls.desktopWrapper}>
      {items.map((item) => (
        <DraggableItem key={item.id} item={item} />
      ))}
    </div>
  );
};
