import React, { useState } from "react";
import cls from "./MainComponent.module.scss";

import { ContextMenu } from "../ContextMenu/Main/ContextMenu";
import Footer from "../Footer/Footer";
import { PC } from "../DesktopLayout/PC/PC";
import { Folder } from "../DesktopLayout/Folder/Folder";
import { Vs } from "../DesktopLayout/Vs/Vs";
import { TrashBin } from "../DesktopLayout/TrashBin/TrashBin";

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
      onContextMenu={handleContextMenu}
      onClick={handleClickOutside}
    >
      <PC />
      <Folder />
      <Vs />
      <TrashBin />
      <div className={cls.content}>
        {menuPos && (
          <ContextMenu
            x={menuPos.x}
            y={menuPos.y}
            onClose={() => setMenuPos(null)}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MainComponent;
