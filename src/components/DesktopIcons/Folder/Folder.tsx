import cls from "../DesktopIcons.module.scss";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const Folder = ({ name }: { name: string }) => {
  const { t } = useTranslation("desktopLayout");
  const iconSize = useSelector((state: RootState) => state.desktop.iconSize);

  return (
    <div className={cls.wrap} style={{ width: iconSize, height: iconSize }}>
      <Image
        src="/img/icons/folder.png"
        alt="Folder"
        className={cls.img}
        width={iconSize / 2}
        height={iconSize / 2}
      />

      <p className={cls.title}>{name ? name : t("Новая папка")}</p>
    </div>
  );
};
