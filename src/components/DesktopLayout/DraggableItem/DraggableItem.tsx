"use client";
import { Folder } from "@/components/DesktopIcons/Folder/Folder";
import React from "react";
import { Rnd } from "react-rnd";
import cls from "./DraggableItem.module.scss";
import { useDispatch } from "react-redux";
import { moveItem } from "@/store/slices/desktopSlice";

interface IProps {
  item: { id: string; type: string; name?: string; x: number; y: number };
}

const DraggableItemComponent = ({ item }: IProps) => {
  const dispatch = useDispatch();

  const handleDragStop = (x: number, y: number) => {
    dispatch(moveItem({ id: item.id, x, y }));
  };

  return (
    <Rnd
      default={{ x: item.x, y: item.y, width: 80, height: 80 }}
      bounds="parent"
      onDragStop={(e, d) => handleDragStop(d.x, d.y)}
      enableResizing={false}
    >
      <div className={cls.draggableItem}>
        {item.type === "folder" && <Folder name={item.name} />}
      </div>
    </Rnd>
  );
};

// мемоизация, чтобы ререндер других элементов не трогал drag
export const DraggableItem = React.memo(DraggableItemComponent);
