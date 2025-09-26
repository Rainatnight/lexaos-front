import { useSelector } from "react-redux";
import { MenuOption } from "../Main/ContextMenu";
import { useState } from "react";
import { RootState } from "@/store";
import cls from "./ContextMenuItem.module.scss";

export const ContextMenuItem: React.FC<{
  option: MenuOption;
  onClose: () => void;
}> = ({ option, onClose }) => {
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const background = useSelector((state: RootState) => state.theme.background);

  return (
    <li
      onMouseEnter={() => setSubmenuVisible(true)}
      onMouseLeave={() => setSubmenuVisible(false)}
      onClick={() => {
        option.action?.();
        onClose();
      }}
    >
      <span>{option.label}</span>
      {option.submenu && <span style={{ float: "right" }}>{">"}</span>}
      {option.submenu && submenuVisible && (
        <ul className={cls.submenu}>
          {option.submenu.map((sub, idx) => (
            <li
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                sub.action?.();
                onClose();
              }}
            >
              {sub.label} {sub.value === background && <span>★</span>}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
