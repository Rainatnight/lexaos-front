import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import cls from "./DesktopLayout.module.scss";
import { DraggableItem } from "./DraggableItem/DraggableItem";
import { PC } from "../DesktopIcons/PC/PC";
import { Vs } from "../DesktopIcons/Vs/Vs";
import { TrashBin } from "../DesktopIcons/TrashBin/TrashBin";

export const DesktopLayout = () => {
  const items = useSelector((state: RootState) => state.desktop.items);

  const defaultIcons = [
    { id: "pc", type: "pc", x: 0, y: 0, component: <PC /> },
    { id: "vs", type: "vs", x: 0, y: 80, component: <Vs /> },
    { id: "trash", type: "trash", x: 0, y: 160, component: <TrashBin /> },
  ];

  return (
    <div className={cls.desktopWrapper}>
      {defaultIcons.map((icon) => (
        <DraggableItem key={icon.id} item={icon} />
      ))}

      {items.map((item) => (
        <DraggableItem key={item.id} item={item} />
      ))}
    </div>
  );
};
