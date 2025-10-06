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
    { id: "pc", component: <PC />, x: 0, y: 0 },
    { id: "vs", component: <Vs />, x: 0, y: 80 },
    { id: "trash", component: <TrashBin />, x: 0, y: 160 },
  ];

  return (
    <div className={cls.desktopWrapper}>
      {/* Статические иконки */}
      {/* {defaultIcons.map((icon) => (
        <Rnd
          key={icon.id}
          default={{
            x: icon.x,
            y: icon.y,
            width: 80,
            height: 80,
          }}
          className={cls.staticIcon}
          onDragStop={(e, d) => handleDragStop(icon.id, d.x, d.y)}
          bounds="parent"
        >
          {icon.component}
        </Rnd>
      ))} */}

      {/* Динамические папки */}
      {items.map((item) => (
        <DraggableItem item={item} />
      ))}
    </div>
  );
};
