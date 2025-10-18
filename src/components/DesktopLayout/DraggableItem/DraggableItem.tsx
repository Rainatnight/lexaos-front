import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import interact from "interactjs";
import { moveItem, setSelectedItem } from "@/store/slices/desktopSlice";
import { DesktopElement } from "@/components/DesktopIcons/DesktopElement/DesktopElement";
import { RootState } from "@/store";
import cls from "./DraggableItem.module.scss";

interface IProps {
  item: {
    id: string;
    type: string;
    name?: string;
    x: number;
    y: number;
    component?: any;
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

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    interact(element).draggable({
      listeners: {
        start(event) {
          event.target.classList.add(cls.dragging);
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

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={`${cls.draggableItem} ${
        selectedItemId === item.id ? cls.selected : ""
      }`}
      onContextMenu={handleContextMenu}
      style={{ transform: `translate(${item.x}px, ${item.y}px)` }}
    >
      {item.type === "pc" && (item.component || <>PC</>)}
      {item.type === "vs" && (item.component || <>VS</>)}
      {item.type === "trash" && (item.component || <>Trash</>)}
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
  );
});

DraggableItem.displayName = "DraggableItem";
