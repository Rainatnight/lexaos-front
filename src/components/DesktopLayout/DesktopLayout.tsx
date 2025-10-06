import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Draggable from "react-draggable";
import { moveItem } from "@/store/slices/desktopSlice";
import { PC } from "../DesktopIcons/PC/PC";
import { Folder } from "../DesktopIcons/Folder/Folder";
import { Vs } from "../DesktopIcons/Vs/Vs";
import { TrashBin } from "../DesktopIcons/TrashBin/TrashBin";
import { RootState } from "@/store";

export const DesktopLayout = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.desktop.items);

  // создаём refs для всех иконок один раз
  const nodeRefs = useRef<Record<string, HTMLDivElement>>({});

  const handleStop = (id: string, e: any, data: any) => {
    dispatch(moveItem({ id, x: data.x, y: data.y }));
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Статические иконки */}
      <PC />
      <Vs />
      <TrashBin />

      {items.map((item) => {
        // создаём ref для каждого элемента только если его ещё нет
        if (!nodeRefs.current[item.id]) {
          nodeRefs.current[item.id] = document.createElement("div");
        }

        return (
          <Draggable
            key={item.id}
            nodeRef={{ current: nodeRefs.current[item.id] }}
            defaultPosition={{ x: item.x, y: item.y }}
            onStop={(e, data) => handleStop(item.id, e, data)}
            grid={[10, 10]}
            bounds="parent"
          >
            <div
              ref={(el) => {
                if (el) nodeRefs.current[item.id] = el;
              }}
              style={{
                position: "absolute",
                cursor: "grab",
                userSelect: "none",
              }}
            >
              {item.type === "folder" && <Folder name={item.name} />}
            </div>
          </Draggable>
        );
      })}
    </div>
  );
};
