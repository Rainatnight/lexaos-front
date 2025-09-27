import React, { useState } from "react";
import cls from "./MainComponent.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setBackground } from "@/store/slices/themeSlice";
import { ContextMenu, MenuOption } from "../ContextMenu/Main/ContextMenu";

const backgrounds = [
  { label: "White", value: "#ffffff", type: "color" },
  { label: "Black", value: "#000000", type: "color" },
  { label: "Blue", value: "#ccccff", type: "color" },
  { label: "Stars", value: "stars", type: "preset" },
  { label: "Snow", value: "snow", type: "preset" },
  { label: "Firefly", value: "firefly", type: "preset" },
];

const MainComponent = () => {
  const dispatch = useDispatch();

  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuPos({ x: e.clientX, y: e.clientY });
  };

  const handleClickOutside = () => setMenuPos(null);

  const options: MenuOption[] = [
    {
      label: "Background",
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

  return (
    <div
      className={cls.main}
      style={{ width: "100%", height: "100%" }}
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
