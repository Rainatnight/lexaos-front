import React from "react";
import cls from "../DesktopLayout.module.scss";

export const Vs = () => {
  return (
    <div className={cls.wrap}>
      <img src="/img/icons/vscode.png" className={cls.img} />
      <p className={cls.title}>{"test.js"}</p>
    </div>
  );
};
