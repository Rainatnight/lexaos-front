import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { DraggableItem } from "./DraggableItem/DraggableItem";
import { setSelectedItem } from "@/store/slices/desktopSlice";
import cls from "./DesktopLayout.module.scss";
import { ItemContextMenu } from "./ItemContextMenu/ItemContextMenu";

export const DesktopLayout = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.desktop.items);

  const [itemMenu, setItemMenu] = useState<{
    x: number;
    y: number;
    itemId: string | null;
  } | null>(null);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(setSelectedItem(null));
      setItemMenu(null);
    }
  };

  const handleItemContextMenu = (e: React.MouseEvent, itemId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setItemMenu({ x: e.clientX, y: e.clientY, itemId });
    dispatch(setSelectedItem(itemId));
  };

  const handleCloseItemMenu = () => setItemMenu(null);

  return (
    <div className={cls.desktopWrapper} onClick={handleBackgroundClick}>
      {items.map((item) => (
        <DraggableItem
          key={item.id}
          item={item}
          onContextMenu={handleItemContextMenu}
        />
      ))}

      {itemMenu && (
        <ItemContextMenu
          x={itemMenu.x}
          y={itemMenu.y}
          itemId={itemMenu.itemId!}
          onClose={handleCloseItemMenu}
        />
      )}
    </div>
  );
};
