import React from "react";
import cls from "./MainComponent.module.scss";
import { api } from "@/shared/api/api";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setBackground } from "@/store/slices/themeSlice";

const MainComponent = () => {
  const background = useSelector((state: RootState) => state.theme.background);
  const dispatch = useDispatch();

  const sendReq = () => {
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
      <h1>Фон: {background}</h1>
      <button onClick={() => dispatch(setBackground("#ffcccc"))}>
        Красный
      </button>
      <button onClick={() => dispatch(setBackground("#ccffcc"))}>
        Зелёный
      </button>
      <button onClick={() => dispatch(setBackground("#ccccff"))}>Синий</button>
    </div>
  );
};

export default MainComponent;
