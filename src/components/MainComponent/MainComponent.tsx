import React from "react";
import cls from "./MainComponent.module.scss";
import { api } from "@/shared/api/api";

const MainComponent = () => {
  const sendReq = () => {
    console.log(1);
    api
      .post(`/users`, { name: "alex", email: "yandex.com" })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => console.log("first"));
  };

  return (
    <div className={cls.main}>
      <div className={cls.btn} onClick={sendReq}>
        hi
      </div>
    </div>
  );
};

export default MainComponent;
