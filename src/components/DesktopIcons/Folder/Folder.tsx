import cls from "../DesktopIcons.module.scss";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export const Folder = ({ name }: { name: string }) => {
  const { t } = useTranslation("desktopLayout");

  return (
    <div className={cls.wrap}>
      <Image
        src="/img/icons/folder.png"
        alt="Folder"
        className={cls.img}
        width={48}
        height={48}
      />

      <p className={cls.title}>{name ? name : t("Новая папка")}</p>
    </div>
  );
};
