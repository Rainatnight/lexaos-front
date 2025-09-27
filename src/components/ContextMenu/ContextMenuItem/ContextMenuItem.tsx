import { useSelector } from "react-redux";
import { MenuOption } from "../Main/ContextMenu";
import { useState } from "react";
import { RootState } from "@/store";
import cls from "./ContextMenuItem.module.scss";
import { classNames } from "@/helpers/classNames/classNames";

export const ContextMenuItem: React.FC<{
  option: MenuOption;
  onClose: () => void;
}> = ({ option, onClose }) => {
  const [submenuVisible, setSubmenuVisible] = useState(false);

  const backgroundValue = useSelector(
    (state: RootState) => state.theme.backgroundValue
  );

  return (
    <li
      onMouseEnter={() => setSubmenuVisible(true)}
      onMouseLeave={() => setSubmenuVisible(false)}
      onClick={() => {
        option.action?.();
        onClose();
      }}
      className={classNames("", { [cls.underline]: option.hasUnderline }, [])}
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
              {sub.label} {sub.value === backgroundValue && <span>★</span>}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
