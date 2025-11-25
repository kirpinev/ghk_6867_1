import { Typography } from "@alfalab/core-components/typography";
import { ButtonMobile } from "@alfalab/core-components/button/mobile";
import bigSmile from "../assets/moon.png";
import { thxSt } from "./style.css";
import { appSt } from "../style.css.ts";
import { Gap } from "@alfalab/core-components/gap";

export const ThxLayout = () => {
  return (
    <>
      <div className={thxSt.container}>
        <img
          alt="Картинка ракеты"
          src={bigSmile}
          width={200}
          className={thxSt.rocket}
        />
        <Gap size={16} />
        <Typography.TitleResponsive
          font="system"
          tag="h1"
          view="medium"
          defaultMargins={false}
          weight="bold"
        >
          Теперь вы знаете секрет
        </Typography.TitleResponsive>
        <Gap size={8} />
        <Typography.Text tag="p" view="primary-medium">
          Мы проводим очень важное исследование для нового сервиса. Скоро
          поделимся с вами подробностями!
        </Typography.Text>
      </div>

      <div className={appSt.bottomBtn}>
        <ButtonMobile block view="primary" href="https://online.alfabank.ru/">
          Спасибо, понятно!
        </ButtonMobile>
      </div>
    </>
  );
};
