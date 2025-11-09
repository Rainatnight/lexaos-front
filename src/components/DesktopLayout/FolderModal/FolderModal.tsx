import React, { useEffect, useRef } from "react";
import cls from "./FolderModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { moveFolder, setActiveFolder } from "@/store/slices/desktopSlice";
import interact from "interactjs";

export const FolderModal = ({ item, handleCloseWindow, position }: any) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: position.x, y: position.y });

  const activeFolderId = useSelector(
    (state: RootState) => state.desktop.activeFolderId
  );

  const isActive = activeFolderId === item.id;

  // === делаем окно активным при клике ===
  const handleMouseDown = () => {
    dispatch(setActiveFolder(item.id));
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // синхронизируем позицию с Redux / начальными координатами
    pos.current = { x: position.x, y: position.y };
    element.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;

    interact(element).draggable({
      allowFrom: `.${cls.folderHeader}`, // перетаскиваем только за шапку
      listeners: {
        start() {
          dispatch(setActiveFolder(item.id));

          // Считываем transform, если окно уже двигалось
          const transform = element.style.transform.match(
            /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/
          );
          if (transform) {
            pos.current.x = parseFloat(transform[1]);
            pos.current.y = parseFloat(transform[2]);
          }
        },
        move(event) {
          pos.current.x += event.dx;
          pos.current.y += event.dy;

          // ограничиваем перемещение в пределах родителя
          const parent = element.parentElement!;
          const parentRect = parent.getBoundingClientRect();

          pos.current.x = Math.max(
            0,
            Math.min(pos.current.x, parentRect.width - element.offsetWidth)
          );
          pos.current.y = Math.max(
            0,
            Math.min(pos.current.y, parentRect.height - element.offsetHeight)
          );

          element.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
        },
        end() {
          dispatch(
            moveFolder({
              id: item.id,
              x: pos.current.x,
              y: pos.current.y,
            })
          );
        },
      },
    });

    return () => interact(element).unset();
  }, [dispatch, item.id, position.x, position.y]);

  return (
    <div
      ref={ref}
      onMouseDown={handleMouseDown}
      className={`${cls.folderWindow} ${isActive ? cls.active : ""}`}
      style={{
        top: 0,
        left: 0,
        zIndex: isActive ? 1000 : 999,
      }}
    >
      <div className={cls.folderHeader}>
        <span>{item.name || "Папка"}</span>
        <button onClick={handleCloseWindow}>×</button>
      </div>
      <div className={cls.folderContent}>
        <p>Здесь будет содержимое папки</p>
        <p>{item.name}</p>
      </div>
    </div>
  );
};
