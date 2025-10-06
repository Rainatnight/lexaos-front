import React from "react";
import cls from "../DesktopIcons.module.scss";
import { useTranslation } from "react-i18next";

export const TrashBin = () => {
  const { t } = useTranslation("desktopLayout");

  return (
    <div className={cls.wrap}>
      <img src="/img/icons/bin.png" className={cls.img} />
      <p className={cls.title}>{t("Корзина")}</p>
    </div>
  );
};
