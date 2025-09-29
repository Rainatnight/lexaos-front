import React, { useEffect, useState } from "react";
import cls from "./Footer.module.scss";
import InstrumentsIcon from "@/shared/api/ui/Icons/InstrumentsIcon";
import SearchIcon from "@/shared/api/ui/Icons/SearchIcon";
import { useTranslation } from "react-i18next";
import i18next from "@/shared/api/config/i18n/i18next";

const Footer = () => {
  const [time, setTime] = useState(new Date());
  const { t, i18n } = useTranslation("footer");

  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const day = String(time.getDate()).padStart(2, "0");
  const month = String(time.getMonth() + 1).padStart(2, "0");
  const year = time.getFullYear();

  const formattedTime = `${hours}:${minutes}`;
  const formattedDate = ` ${day}.${month}.${year}`;

  const toggleLanguage = () => {
    const newLang = i18n.language === "ru" ? "en" : "ru";
    i18next.changeLanguage(newLang);
    localStorage.setItem("currentLanguage", newLang);
  };

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const language =
      localStorage.getItem("currentLanguage") ||
      (navigator ? navigator.language.substr(0, 2).toLowerCase() : "ru");
    i18next.changeLanguage(language);
  }, []);

  return (
    <div className={cls.footer}>
      <div className={cls.left}>
        <div className={cls.hover}>
          <InstrumentsIcon />
        </div>
        <div className={cls.hover}>
          <SearchIcon />
        </div>
      </div>

      <div className={cls.right}>
        <div className={cls.hover} onClick={toggleLanguage}>
          {t("РУС")}
        </div>
        <div className={cls.time}>
          <div>{formattedTime}</div>
          <div>{formattedDate}</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
