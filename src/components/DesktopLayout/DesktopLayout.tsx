import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DraggableItem } from "./DraggableItem/DraggableItem";
import { setSelectedItem } from "@/store/slices/desktopSlice";
import cls from "./DesktopLayout.module.scss";
import { ItemContextMenu } from "./ItemContextMenu/ItemContextMenu";
import useSession from "@/shared/hooks/useSession";
import { selectRootDesktopItems } from "@/store/selectors";

interface Props {
  onBackgroundContextMenu: (x: number, y: number) => void;
}

export const DesktopLayout: React.FC<Props> = ({ onBackgroundContextMenu }) => {
  const dispatch = useDispatch();
  const items = useSelector(selectRootDesktopItems);

  const { user } = useSession();

  const [itemMenu, setItemMenu] = useState<{
    x: number;
    y: number;
    itemId: string;
  } | null>(null);

  // 👇 состояние для рамки выделения
  const [selecting, setSelecting] = useState(false);
  const [selectionRect, setSelectionRect] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);
  const startPos = useRef<{ x: number; y: number } | null>(null);

  const handleBackgroundContextMenu = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
      dispatch(setSelectedItem(null));
      setItemMenu(null);
      onBackgroundContextMenu(e.clientX, e.clientY);
    }
  };

  // 👇 начало выделения
  const handleMouseDown = (e: React.MouseEvent) => {
    // только ЛКМ и только по фону
    if (e.button !== 0 || e.target !== e.currentTarget) return;

    dispatch(setSelectedItem(null));
    setItemMenu(null);

    startPos.current = { x: e.clientX, y: e.clientY };
    setSelecting(true);
    setSelectionRect({ x: e.clientX, y: e.clientY, w: 0, h: 0 });
  };

  // 👇 движение мыши — обновляем размеры рамки
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!selecting || !startPos.current) return;

    const x = Math.min(e.clientX, startPos.current.x);
    const y = Math.min(e.clientY, startPos.current.y);
    const w = Math.abs(e.clientX - startPos.current.x);
    const h = Math.abs(e.clientY - startPos.current.y);

    setSelectionRect({ x, y, w, h });
  };

  // 👇 отпускание мыши — завершаем выделение
  const handleMouseUp = () => {
    if (!selecting) return;
    setSelecting(false);

    if (selectionRect) {
      const selectedIds: string[] = [];

      items.forEach((item) => {
        const el = document.getElementById(`icon-${item.id}`);
        if (!el) return;
        const rect = el.getBoundingClientRect();

        // проверяем пересечение рамки и иконки
        const intersects =
          rect.right >= selectionRect.x &&
          rect.left <= selectionRect.x + selectionRect.w &&
          rect.bottom >= selectionRect.y &&
          rect.top <= selectionRect.y + selectionRect.h;

        if (intersects) selectedIds.push(item.id);
      });
    }

    setSelectionRect(null);
  };

  return (
    <div
      className={cls.desktopWrapper}
      onContextMenu={handleBackgroundContextMenu}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <h1>{user?.login}</h1>

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

      {/* 👇 сама рамка */}
      {selectionRect && (
        <div
          className={cls.selection}
          style={{
            top: selectionRect.y,
            left: selectionRect.x,
            width: selectionRect.w,
            height: selectionRect.h,
          }}
        />
      )}
    </div>
  );
};
