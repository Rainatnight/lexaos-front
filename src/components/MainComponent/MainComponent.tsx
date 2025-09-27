import React, { useState } from "react";
import cls from "./MainComponent.module.scss";

import { ContextMenu } from "../ContextMenu/Main/ContextMenu";

const MainComponent = () => {
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuPos({ x: e.clientX, y: e.clientY });
  };

  const handleClickOutside = () => setMenuPos(null);

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
          onClose={() => setMenuPos(null)}
        />
      )}
    </div>
  );
};

export default MainComponent;
