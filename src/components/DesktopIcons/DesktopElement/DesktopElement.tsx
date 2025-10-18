import cls from "../DesktopIcons.module.scss";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { renameItem, setRenamingItem } from "@/store/slices/desktopSlice";
import { useState, useEffect, useRef } from "react";

export const DesktopElement = ({
  name,
  id,
  type,
}: {
  name: string;
  id: string;
  type: "folder" | "txt";
}) => {
  const { t } = useTranslation("desktopLayout");
  const dispatch = useDispatch();
  const iconSize = useSelector((state: RootState) => state.desktop.iconSize);
  const renamingItemId = useSelector(
    (state: RootState) => state.desktop.renamingItemId
  );

  const [tempName, setTempName] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const isRenaming = renamingItemId === id;

  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRenaming]);

  const handleBlur = () => {
    const newName = tempName.trim();
    if (newName && newName !== name) {
      dispatch(renameItem({ id, newName }));
    } else {
      dispatch(setRenamingItem(null));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      dispatch(setRenamingItem(null));
    }
  };

  return (
    <div className={cls.wrap} style={{ width: iconSize, height: iconSize }}>
      <Image
        src={type === "txt" ? "/img/icons/txt.png" : "/img/icons/folder.png"}
        alt={type === "txt" ? "txt" : "folder"}
        className={cls.img}
        width={iconSize / 2}
        height={iconSize / 2}
      />

      {isRenaming ? (
        <input
          ref={inputRef}
          className={cls.renameInput}
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <p className={cls.title}>{name || t("Новая папка")}</p>
      )}
    </div>
  );
};
