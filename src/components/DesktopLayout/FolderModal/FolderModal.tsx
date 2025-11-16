import { useEffect, useRef } from "react";
import cls from "./FolderModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  moveFolder,
  setActiveFolder,
  setFolderWindowState,
} from "@/store/slices/desktopSlice";
import interact from "interactjs";

export const FolderModal = ({ item, handleCloseWindow, position }: any) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: position.x, y: position.y });

  const folderState = useSelector((state: RootState) =>
    state.desktop.openFolders.find((f) => f.id === item.id)
  );

  const windowState = folderState?.windowState || "normal";

  const minimized = windowState === "minimized";
  const maximized = windowState === "maximized";

  const activeFolderId = useSelector(
    (state: RootState) => state.desktop.activeFolderId
  );
  const isActive = activeFolderId === item.id;

  // === делаем окно активным при клике ===
  const handleMouseDown = () => {
    dispatch(setActiveFolder(item.id));
  };

  const changeState = (state: "normal" | "minimized" | "maximized") => {
    dispatch(
      setFolderWindowState({
        id: item.id,
        windowState: state,
      })
    );
  };

  // === сворачивание ===
  const handleMinimize = () => {
    changeState("minimized");
    dispatch(setActiveFolder(null)); // убираем фокус
  };

  // === разворачивание на весь экран ===
  const handleMaximize = () => {
    changeState(maximized ? "normal" : "maximized");
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // В normal режиме используем transform для позиции
    if (windowState === "normal") {
      element.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
    }

    // Инициализация interact
    const interactInstance = interact(element)
      .draggable({
        allowFrom: `.${cls.folderHeader}`,
        enabled: windowState === "normal",
        listeners: {
          start() {
            dispatch(setActiveFolder(item.id));

            const transform = element.style.transform.match(
              /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/
            );
            if (transform) {
              pos.current.x = parseFloat(transform[1]);
              pos.current.y = parseFloat(transform[2]);
            }
          },
          move(event) {
            if (windowState !== "normal") return;

            pos.current.x += event.dx;
            pos.current.y += event.dy;

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
            if (windowState !== "normal") return;

            dispatch(
              moveFolder({
                id: item.id,
                x: pos.current.x,
                y: pos.current.y,
              })
            );
          },
        },
      })
      .resizable({
        edges: { right: true, bottom: true },
        invert: "none",
        enabled: windowState === "normal",
        listeners: {
          move(event) {
            if (windowState !== "normal") return;

            const { width, height } = event.rect;

            // применяем новые размеры
            element.style.width = `${width}px`;
            element.style.height = `${height}px`;

            pos.current.x += event.deltaRect.left;
            pos.current.y += event.deltaRect.top;
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
        modifiers: [
          interact.modifiers!.restrictSize({
            min: { width: 300, height: 200 },
          }),
        ],
      });

    return () => {
      interactInstance.unset();
    };
  }, [windowState, item.id, dispatch]);

  return (
    <div
      ref={ref}
      onMouseDown={handleMouseDown}
      className={`${cls.folderWindow} ${isActive ? cls.active : ""} ${
        minimized ? cls.minimized : ""
      } ${maximized ? cls.maximized : ""}`}
      style={{
        top: 0,
        left: 0,
        zIndex: isActive ? 1000 : 999,
      }}
    >
      <div className={cls.folderHeader}>
        <span>{item.name || "Папка"}</span>
        <div className={cls.controls}>
          <button onClick={handleMinimize}>−</button>

          {/* □ меняется на ⧉ при максимизации */}
          <button onClick={handleMaximize}>{maximized ? "⧉" : "□"}</button>

          <button onClick={handleCloseWindow}>×</button>
        </div>
      </div>

      <div className={cls.folderContent}>
        <p>Здесь будет содержимое папки</p>
      </div>
    </div>
  );
};
