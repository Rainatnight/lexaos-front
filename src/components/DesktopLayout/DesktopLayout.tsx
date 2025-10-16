import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { DraggableItem } from "./DraggableItem/DraggableItem";
import { setSelectedItem } from "@/store/slices/desktopSlice";
import cls from "./DesktopLayout.module.scss";
import { ItemContextMenu } from "./ItemContextMenu/ItemContextMenu";
import useSession from "@/shared/hooks/useSession";

interface Props {
  onBackgroundContextMenu: (x: number, y: number) => void;
}

export const DesktopLayout: React.FC<Props> = ({ onBackgroundContextMenu }) => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.desktop.items);
  const { user } = useSession();

  const [itemMenu, setItemMenu] = useState<{
    x: number;
    y: number;
    itemId: string;
  } | null>(null);

  const handleBackgroundContextMenu = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
      dispatch(setSelectedItem(null));
      setItemMenu(null);
      onBackgroundContextMenu(e.clientX, e.clientY); // открываем меню рабочего стола
    }
  };

  return (
    <div
      className={cls.desktopWrapper}
      onClick={() => {
        dispatch(setSelectedItem(null));
        setItemMenu(null);
      }}
      onContextMenu={handleBackgroundContextMenu}
    >
      <h1>{user?.login}</h1>
      <h2>{user?.login}</h2>
      {items.map((item) => (
        <DraggableItem
          key={item.id}
          item={item}
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setItemMenu({ x: e.clientX, y: e.clientY, itemId: item.id });
            dispatch(setSelectedItem(item.id));
          }}
        />
      ))}

      {itemMenu && (
        <ItemContextMenu
          x={itemMenu.x}
          y={itemMenu.y}
          itemId={itemMenu.itemId}
          onClose={() => setItemMenu(null)}
        />
      )}
    </div>
  );
};
