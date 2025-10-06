import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import interact from "interactjs";
import { moveItem } from "@/store/slices/desktopSlice";
import { Folder } from "@/components/DesktopIcons/Folder/Folder";
import cls from "./DraggableItem.module.scss";

interface IProps {
  item: { id: string; type: string; name?: string; x: number; y: number };
}

export const DraggableItem = React.memo(({ item }: IProps) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  // Локальное хранение позиции
  const [pos] = useState(() => ({ x: item.x, y: item.y }));

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let currentPos = { ...pos };

    interact(element).draggable({
      listeners: {
        move(event) {
          const x = (parseFloat(element.dataset.x!) || currentPos.x) + event.dx;
          const y = (parseFloat(element.dataset.y!) || currentPos.y) + event.dy;

          const parent = element.parentElement!;
          const parentRect = parent.getBoundingClientRect();

          // ограничиваем движение внутри parent
          currentPos.x = Math.max(
            0,
            Math.min(x, parentRect.width - element.offsetWidth)
          );
          currentPos.y = Math.max(
            0,
            Math.min(y, parentRect.height - element.offsetHeight)
          );

          element.style.transform = `translate(${currentPos.x}px, ${currentPos.y}px)`;
          element.dataset.x = currentPos.x.toString();
          element.dataset.y = currentPos.y.toString();
        },
        end() {
          dispatch(moveItem({ id: item.id, x: currentPos.x, y: currentPos.y }));
        },
      },
    });

    return () => {
      interact(element).unset();
    };
  }, [dispatch, item.id, pos]);

  return (
    <div
      ref={ref}
      className={cls.draggableItem}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      data-x={pos.x}
      data-y={pos.y}
    >
      {item.type === "folder" && <Folder name={item.name || "new"} />}
      {item.type === "pc" && <>PC</>}
      {item.type === "vs" && <>VS</>}
      {item.type === "trash" && <>Trash</>}
    </div>
  );
});
