import React, { useState } from "react";
import Image from "next/image";
import cls from "./Login.module.scss";
import { Input } from "@/shared/api/ui/Input/Input";
import { useTranslation } from "react-i18next";
import { Text } from "@/shared/api/ui/Text/Text";
import { useRouter } from "next/router";

export const Login = () => {
  const router = useRouter();
  const { t } = useTranslation("login");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");

  const anonLogin = () => {
    router.push("/");
  };

  const loginFunc = () => {
    console.log(1);
  };

  return (
    <div className={cls.wrapper}>
      <div className={cls.background}></div>
      <div className={cls.content}>
        <div className={cls.centerBlock}>
          <Image
            src="/img/icons/user1.png"
            alt="User Icon"
            className={cls.img}
            width={100}
            height={100}
          />
          <Input
            className={cls.input}
            value={login}
            placeholder={t("Логин")}
            onChange={(v) => setLogin(v.toLowerCase())}
          />
          <Input
            className={cls.input}
            value={password}
            placeholder={t("Пароль")}
            onChange={(v) => setPassword(v.toLowerCase())}
          />
          <Text className={cls.enter} onClick={loginFunc}>
            {t("Войти")}
          </Text>
          <Text className={cls.enter} onClick={loginFunc}>
            {t("Создать аккаунт")}
          </Text>
        </div>

        <Text className={cls.anon} onClick={anonLogin}>
          {t("Войти как гость")}
        </Text>
      </div>
    </div>
  );
};
