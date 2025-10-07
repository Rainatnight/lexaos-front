import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import interact from "interactjs";
import { moveItem } from "@/store/slices/desktopSlice";
import { Folder } from "@/components/DesktopIcons/Folder/Folder";
import cls from "./DraggableItem.module.scss";

interface IProps {
  item: {
    id: string;
    type: any;
    name?: string;
    x: number;
    y: number;
    component?: React.ReactNode;
  };
}

export const DraggableItem = React.memo(({ item }: IProps) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  // храним текущую позицию в ref, чтобы при drag не перерисовывать компонент
  const currentPos = useRef({ x: item.x, y: item.y });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    interact(element).draggable({
      listeners: {
        start(event) {
          event.target.classList.add(cls.dragging); // Добавляем класс dragging
        },
        move(event) {
          const x = currentPos.current.x + event.dx;
          const y = currentPos.current.y + event.dy;

          const parent = element.parentElement!;
          const parentRect = parent.getBoundingClientRect();

          // ограничиваем движение внутри parent
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
        end(event) {
          event.target.classList.remove(cls.dragging);
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

  return (
    <div
      ref={ref}
      className={cls.draggableItem}
      style={{ transform: `translate(${item.x}px, ${item.y}px)` }}
    >
      {item.type === "folder" && <Folder name={item.name || "Новая папка"} />}
      {item.type === "pc" && (item.component || <>PC</>)}
      {item.type === "vs" && (item.component || <>VS</>)}
      {item.type === "trash" && (item.component || <>Trash</>)}
    </div>
  );
});
