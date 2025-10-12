import cls from "../DesktopIcons.module.scss";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const Txt = ({ name }: { name: string }) => {
  const iconSize = useSelector((state: RootState) => state.desktop.iconSize);

  return (
    <div className={cls.wrap} style={{ width: iconSize, height: iconSize }}>
      <Image
        src="/img/icons/txt.png"
        alt="Folder"
        className={cls.img}
        width={iconSize / 2}
        height={iconSize / 2}
      />

      <p className={cls.title}>{name ? name : 1}</p>
    </div>
  );
};
