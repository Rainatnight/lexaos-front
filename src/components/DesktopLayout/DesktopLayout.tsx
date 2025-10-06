import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { PC } from "../DesktopIcons/PC/PC";
import { Vs } from "../DesktopIcons/Vs/Vs";
import { TrashBin } from "../DesktopIcons/TrashBin/TrashBin";
import cls from "./DesktopLayout.module.scss";
import { DraggableItem } from "./DraggableItem/DraggableItem";

export const DesktopLayout = () => {
  const items = useSelector((state: RootState) => state.desktop.items);

  // Дефолтные иконки
  const defaultIcons = [
    { id: "pc", component: <PC />, x: 0, y: 0, type: "pc" },
    { id: "vs", component: <Vs />, x: 0, y: 80, type: "vs" },
    { id: "trash", component: <TrashBin />, x: 0, y: 160, type: "trash" },
  ];

  return (
    <div className={cls.desktopWrapper}>
      {/* Статические иконки */}
      {defaultIcons.map((icon) => (
        <DraggableItem item={icon} />
      ))}

      {/* Динамические папки */}
      {items.map((item) => (
        <DraggableItem item={item} />
      ))}
    </div>
  );
};
