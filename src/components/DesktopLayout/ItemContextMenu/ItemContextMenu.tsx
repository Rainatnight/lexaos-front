import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setSelectedItem } from "@/store/slices/desktopSlice";
import cls from "../../ContextMenu/Main/ContextMenu.module.scss";

interface Props {
  x: number;
  y: number;
  itemId: string;
  onClose: () => void;
}

export const ItemContextMenu: React.FC<Props> = ({ x, y, itemId, onClose }) => {
  const ref = useRef<HTMLUListElement>(null);
  const [pos, setPos] = useState({ top: y, left: x });
  const dispatch = useDispatch();

  const item = useSelector((state: RootState) =>
    state.desktop.items.find((i) => i.id === itemId)
  );

  useEffect(() => {
    const menu = ref.current;
    if (!menu) return;

    const { innerWidth, innerHeight } = window;
    const rect = menu.getBoundingClientRect();

    let newX = x;
    let newY = y;

    if (x + rect.width > innerWidth) newX = innerWidth - rect.width;
    if (y + rect.height > innerHeight) newY = innerHeight - rect.height;

    setPos({ top: newY, left: newX });

    const handleOutsideEvent = (e: MouseEvent) => {
      // если клик вне меню
      if (menu && !menu.contains(e.target as Node)) {
        e.stopPropagation();

        onClose();
        dispatch(setSelectedItem(null));
      }
    };

    // ✅ Слушаем оба события с capture, чтобы сработало раньше, чем preventDefault
    document.addEventListener("click", handleOutsideEvent, true);
    document.addEventListener("contextmenu", handleOutsideEvent, true);

    return () => {
      document.removeEventListener("click", handleOutsideEvent, true);
      document.removeEventListener("contextmenu", handleOutsideEvent, true);
    };
  }, [x, y, onClose, dispatch]);

  if (!item) return null;

  const handleRename = () => {
    console.log("Переименовать", item.name);
    onClose();
  };

  const handleDelete = () => {
    console.log("Удалить", item.name);
    onClose();
  };

  const handleProperties = () => {
    console.log("Свойства", item);
    onClose();
  };

  const options = [
    { label: "Переименовать", action: handleRename },
    { label: "Удалить", action: handleDelete },
    { label: "Свойства", action: handleProperties },
  ];

  return (
    <ul
      ref={ref}
      className={cls.contextMenu}
      style={{ top: pos.top, left: pos.left }}
    >
      {options.map((opt, i) => (
        <li key={i} className={cls.menuItem} onClick={opt.action}>
          {opt.label}
        </li>
      ))}
    </ul>
  );
};
