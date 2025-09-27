import React, { useEffect, useRef, useState } from "react";
import cls from "./ContextMenu.module.scss";
import { ContextMenuItem } from "../ContextMenuItem/ContextMenuItem";

interface ContextMenuProps {
  x: number;
  y: number;
  options: MenuOption[];
  onClose: () => void;
}

export interface MenuOption {
  label: string;
  value?: string;
  action?: () => void;
  submenu?: MenuOption[];
  hasUnderline?: boolean;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  options,
  onClose,
}) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState({ top: y, left: x });

  // Проверка границ экрана
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const { innerWidth, innerHeight } = window;
    const rect = menu.getBoundingClientRect();

    let newX = x;
    let newY = y;

    if (x + rect.width > innerWidth) newX = innerWidth - rect.width;
    if (y + rect.height > innerHeight) newY = innerHeight - rect.height;

    setPosition({ top: newY, left: newX });
  }, [x, y]);

  return (
    <ul
      className={cls.contextMenu}
      ref={menuRef}
      style={{ top: position.top, left: position.left }}
    >
      {options.map((option, idx) => (
        <ContextMenuItem key={idx} option={option} onClose={onClose} />
      ))}
    </ul>
  );
};
