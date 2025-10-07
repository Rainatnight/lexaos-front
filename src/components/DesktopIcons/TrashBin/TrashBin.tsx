import React from "react";
import cls from "../DesktopIcons.module.scss";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export const TrashBin = () => {
  const { t } = useTranslation("desktopLayout");

  return (
    <div className={cls.wrap}>
      <Image
        src="/img/icons/bin.png"
        alt="TrashBin"
        className={cls.img}
        width={48}
        height={48}
      />
      <p className={cls.title}>{t("Корзина")}</p>
    </div>
  );
};
