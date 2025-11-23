"use client";

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import interact from "interactjs";
import {
  closeFolder,
  moveItem,
  openFolder,
  setSelectedItem,
} from "@/store/slices/desktopSlice";
import { DesktopElement } from "@/components/DesktopIcons/DesktopElement/DesktopElement";
import { RootState } from "@/store";
import cls from "./DraggableItem.module.scss";
import { FolderModal } from "../FolderModal/FolderModal";
import { PC, TrashBin, Vs } from "@/components/DesktopIcons";

interface IProps {
  item: {
    id: string;
    type: string;
    name?: string;
    x: number;
    y: number;
    component?: any;
    parentId?: string | null;
  };
  onContextMenu?: (e: React.MouseEvent, itemId: string) => void;
}

export const DraggableItem = React.memo(({ item, onContextMenu }: IProps) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const currentPos = useRef({ x: item.x, y: item.y });
  const selectedItemId = useSelector(
    (state: RootState) => state.desktop.selectedItemId
  );
  const openFolders = useSelector(
    (state: RootState) => state.desktop.openFolders
  );

  const folderData = openFolders.find((f) => f.id === item.id);
  const isOpen = !!folderData;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const dragEndSound = new Audio("/sounds/snap.mp3");
    dragEndSound.preload = "auto";

    interact(element).draggable({
      listeners: {
        start(event) {
          event.target.classList.add(cls.dragging);
          document.body.classList.add("dragging");
        },
        move(event) {
          const x = currentPos.current.x + event.dx;
          const y = currentPos.current.y + event.dy;

          const parent = element.parentElement!;
          const parentRect = parent.getBoundingClientRect();

          currentPos.current.x = Math.max(
            0,
            Math.min(x, parentRect.width - element.offsetWidth)
          );
          currentPos.current.y = Math.max(
            0,
            Math.min(y, parentRect.height - element.offsetHeight)
          );

          element.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
        },
        end() {
          element.classList.remove(cls.dragging);
          document.body.classList.remove("dragging");
          dragEndSound.currentTime = 0; // на случай, если звук короткий и срабатывает быстро
          dragEndSound.play().catch((err) => console.log(err));

          dispatch(
            moveItem({
              id: item.id,
              x: currentPos.current.x,
              y: currentPos.current.y,
            })
          );
        },
      },
    });

    return () => interact(element).unset();
  }, [dispatch, item.id]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setSelectedItem(item.id));
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onContextMenu) onContextMenu(e, item.id);
  };

  // --- двойной клик открывает окно
  const handleDoubleClick = (e: React.MouseEvent) => {
    if (item.type === "folder") {
      dispatch(
        openFolder({
          id: item.id,
          x: e.clientX,
          y: e.clientY,
        })
      );
    }
  };

  const handleCloseWindow = () => {
    dispatch(closeFolder(item.id));
    const closeSound = new Audio("/sounds/close.mp3");
    closeSound.preload = "auto";
    closeSound.currentTime = 0;
    closeSound.play().catch((err) => console.log(err));
  };

  if (item.parentId) {
    // Значит элемент лежит в папке — тут вообще НЕ должно быть drag на рабочий стол
    return null; // компонент будет отрисован внутри FolderModal
  }

  return (
    <>
      <div
        ref={ref}
        data-id={item.id}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        className={`${cls.draggableItem} draggableItem ${
          selectedItemId === item.id ? cls.selected : ""
        }`}
        onContextMenu={handleContextMenu}
        style={{ transform: `translate(${item.x}px, ${item.y}px)` }}
      >
        {item.type === "pc" && <PC />}
        {item.type === "vs" && <Vs />}
        {item.type === "trash" && <TrashBin />}
        {item.type === "folder" && (
          <DesktopElement
            id={item.id}
            name={item.name || "Новая папка"}
            type="folder"
          />
        )}
        {item.type === "txt" && (
          <DesktopElement
            name={item.name || "Документ"}
            id={item.id}
            type="txt"
          />
        )}
      </div>

      {/* === окно папки === */}
      {isOpen && item.type === "folder" && (
        <FolderModal
          item={item}
          handleCloseWindow={handleCloseWindow}
          position={{ x: folderData!.x, y: folderData!.y }}
        />
      )}
    </>
  );
});

DraggableItem.displayName = "DraggableItem";
