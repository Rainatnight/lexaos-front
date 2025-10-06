import cls from "../DesktopIcons.module.scss";
import { useTranslation } from "react-i18next";

export const Folder = ({ name }: { name: string }) => {
  const { t } = useTranslation("desktopLayout");

  return (
    <div className={cls.wrap}>
      <img src="/img/icons/folder.png" className={cls.img} />
      <p className={cls.title}>{name ? name : t("Новая папка")}</p>
    </div>
  );
};
