import React, { useEffect, useState } from "react";
import cls from "./Footer.module.scss";
import InstrumentsIcon from "@/shared/api/ui/Icons/InstrumentsIcon";
import SearchIcon from "@/shared/api/ui/Icons/SearchIcon";

const Footer = () => {
  const [time, setTime] = useState(new Date());

  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const day = String(time.getDate()).padStart(2, "0");
  const month = String(time.getMonth() + 1).padStart(2, "0");
  const year = time.getFullYear();

  const formattedTime = `${hours}:${minutes}`;
  const formattedDate = ` ${day}.${month}.${year}`;

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
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
        <div>{formattedTime}</div>
        <div>{formattedDate}</div>
      </div>
    </div>
  );
};

export default Footer;
