import React from "react";
import cls from "../DesktopLayout.module.scss";
import { useTranslation } from "react-i18next";

export const PC = () => {
  const { t } = useTranslation("desktopLayout");

  return (
    <div className={cls.wrap}>
      <img src="/img/icons/pc.png" className={cls.img} />
      <p className={cls.title}>{t("Мой Компьютер")}</p>
    </div>
  );
};
