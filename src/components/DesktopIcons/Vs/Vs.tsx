import React from "react";
import Image from "next/image";
import cls from "../DesktopIcons.module.scss";

export const Vs = () => {
  return (
    <div className={cls.wrap}>
      <Image
        src="/img/icons/vscode.png"
        alt="VS Code"
        className={cls.img}
        width={48}
        height={48}
      />
      <p className={cls.title}>абв</p>
    </div>
  );
};
