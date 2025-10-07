import React from "react";
import cls from "../DesktopIcons.module.scss";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export const PC = () => {
  const { t } = useTranslation("desktopLayout");

  return (
    <div className={cls.wrap}>
      <Image
        src="/img/icons/pc.png"
        alt="PC"
        className={cls.img}
        width={48}
        height={48}
      />
      <p className={cls.title}>{t("Мой Компьютер")}</p>
    </div>
  );
};
