import React, { useEffect, useRef, useState } from "react";
import cls from "./ContextMenu.module.scss";
import { ContextMenuItem } from "../ContextMenuItem/ContextMenuItem";
import { useDispatch } from "react-redux";
import { setBackground } from "@/store/slices/themeSlice";
import { useTranslation } from "react-i18next";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

export interface MenuOption {
  label: string;
  value?: string;
  action?: () => void;
  submenu?: MenuOption[];
  hasUnderline?: boolean;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose }) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState({ top: y, left: x });
  const { t } = useTranslation("contextMenu");
  const dispatch = useDispatch();

  const backgrounds = [
    { label: t("Белый"), value: "#ffffffce", type: "color" },
    { label: t("Черный"), value: "#000000b0", type: "color" },
    { label: t("Синий"), value: "#3c3cffbd", type: "color" },
    { label: "Stars", value: "stars", type: "preset" },
    { label: "Snow", value: "snow", type: "preset" },
    { label: "Firefly", value: "firefly", type: "preset" },
  ];

  const options: MenuOption[] = [
    {
      label: t("Фон"),
      hasUnderline: true,
      submenu: backgrounds.map((b) => ({
        label: b.label,
        value: b.value,
        action: () =>
          dispatch(setBackground({ type: b.type as any, value: b.value })),
      })),
    },
    { label: "Option 1", action: () => console.log("clicked") },
    {
      label: "Option 2",
      action: () => console.log("clicked"),
      hasUnderline: true,
    },
  ];

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
