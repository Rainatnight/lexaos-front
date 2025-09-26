import React, { useState } from "react";
import cls from "./MainComponent.module.scss";
import { useDispatch } from "react-redux";
import { setBackground } from "@/store/slices/themeSlice";
import { ContextMenu, MenuOption } from "../ContextMenu/Main/ContextMenu";

const themes = [
  { label: "Белый", value: "#ffffff" },
  { label: "Черный", value: "#000000ff" },
  { label: "Синий", value: "#ccccff" },
];

const MainComponent = () => {
  const dispatch = useDispatch();
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuPos({ x: e.clientX, y: e.clientY });
  };

  const handleClickOutside = () => setMenuPos(null);

  const options: MenuOption[] = [
    {
      label: "Сменить тему",
      submenu: themes.map((t) => ({
        label: t.label,
        action: () => dispatch(setBackground(t.value)),
        value: t.value,
      })),
    },
    { label: "Другая опция", action: () => console.log("clicked") },
  ];

  return (
    <div
      className={cls.main}
      onContextMenu={handleContextMenu}
      onClick={handleClickOutside}
    >
      {menuPos && (
        <ContextMenu
          x={menuPos.x}
          y={menuPos.y}
          options={options}
          onClose={() => setMenuPos(null)}
        />
      )}
    </div>
  );
};

export default MainComponent;
