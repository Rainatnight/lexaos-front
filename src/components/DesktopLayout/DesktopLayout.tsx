import React from "react";
import { Rnd } from "react-rnd";
import { useSelector, useDispatch } from "react-redux";
import { moveItem } from "@/store/slices/desktopSlice";
import { RootState } from "@/store";
import { PC } from "../DesktopIcons/PC/PC";
import { Vs } from "../DesktopIcons/Vs/Vs";
import { TrashBin } from "../DesktopIcons/TrashBin/TrashBin";
import { Folder } from "../DesktopIcons/Folder/Folder";
import cls from "./DesktopLayout.module.scss";

export const DesktopLayout = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.desktop.items);

  // Дефолтные иконки
  const defaultIcons = [
    { id: "pc", component: <PC />, x: 0, y: 0 },
    { id: "vs", component: <Vs />, x: 0, y: 80 },
    { id: "trash", component: <TrashBin />, x: 0, y: 160 },
  ];

  const handleDragStop = (id: string, x: number, y: number) => {
    dispatch(moveItem({ id, x, y }));
  };

  return (
    <div className={cls.desktopWrapper}>
      {/* Статические иконки */}
      {defaultIcons.map((icon) => (
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
      ))}

      {/* Динамические папки */}
      {items.map((item) => (
        <Rnd
          key={item.id}
          default={{
            x: item.x,
            y: item.y,
            width: 80,
            height: 80,
          }}
          onDragStop={(e, d) => handleDragStop(item.id, d.x, d.y)}
          bounds="parent"
        >
          <div className={cls.draggableItem}>
            {item.type === "folder" && <Folder name={item.name} />}
          </div>
        </Rnd>
      ))}
    </div>
  );
};
