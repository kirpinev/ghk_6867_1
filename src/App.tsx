import { ButtonMobile } from "@alfalab/core-components/button/mobile";

import { Typography } from "@alfalab/core-components/typography";

import image1 from "./assets/1.png";
import image250 from "./assets/250.png";
import image500 from "./assets/500.png";
import image1000 from "./assets/1000.png";
import image1500 from "./assets/1500.png";
import { LS, LSKeys } from "./ls";
import { appSt } from "./style.css";
import { Gap } from "@alfalab/core-components/gap";
import { useCallback, useMemo, useState } from "react";
import { LockOpenLineMIcon } from "@alfalab/icons-glyph/LockOpenLineMIcon";
import { Slider } from "@alfalab/core-components/slider";
import { sendDataToGA } from "./utils/events.ts";

const SLIDER_VALUES = [250, 500, 1000, 1500] as const;

const map = {
  250: image250,
  500: image500,
  1000: image1000,
  1500: image1500,
};

const map1 = {
  250: "Перекус в столовке",
  500: "Поход в кино",
  1000: "Пиццу на двоих",
  1500: "Вечер с друзьями",
};

const SLIDER_INDEXES = SLIDER_VALUES.map((_, index) => index);

const deepLink =
  "alfabank://own_accounts_transfer?type=bank";

const Redirect = () => {
  window.location.href = deepLink;

  return null;
};

export const App = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const selectedValue = useMemo(
    () => SLIDER_VALUES[selectedIndex],
    [selectedIndex],
  );

  const handleChange = useCallback(({ value }: { value: number }) => {
    const nextIndex = Math.min(
      SLIDER_VALUES.length - 1,
      Math.max(0, Math.round(value)),
    );

    setSelectedIndex(nextIndex);
  }, []);

  const submit = () => {
    setLoading(true);

    sendDataToGA({ price: selectedValue }).then(() => {
      setLoading(false);
      LS.setItem(LSKeys.ShowThx, true);
    });
  };

  if (LS.getItem(LSKeys.ShowThx, false)) {
    return <Redirect />;
  }

  return (
    <>
      <div className={appSt.container}>
        <img
          src={image1}
          alt="Картинка Альфа-Смарт"
          style={{ borderRadius: "16px" }}
        />

        <Gap size={16} />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Typography.Title tag="h1" view="small">
            На карте снова нет денег?
          </Typography.Title>
        </div>

        <Gap size={16} />

        <Typography.Text>
          За 3 минуты освойте навык, который поможет всегда быть при деньгах: на
          кассе в магазине, во время шоппинга и такси. Неловких ситуаций с
          оплатой станет меньше, а вы сэкономите минуты и даже часы на
          постоянных переводах себе из других банков.
        </Typography.Text>

        <Gap size={16} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            backgroundColor: "#F8F8F8",
            padding: "16px 24px",
            borderRadius: "16px",
          }}
        >
          <LockOpenLineMIcon />
          <Typography.Text view="primary-small">
            Ваш новый навык — автоплатежи
          </Typography.Text>
        </div>

        <Gap size={40} />

        <Typography.Title tag="h1" view="xsmall">
          Выберите сумму
        </Typography.Title>

        <Gap size={32} />

        <div style={{ padding: "0 16px" }}>
          <Slider
            size={4}
            min={0}
            max={SLIDER_VALUES.length - 1}
            step={1}
            value={selectedIndex}
            onChange={handleChange}
            pips={{
              mode: "values",
              values: SLIDER_INDEXES,
              format: {
                to: (pipValue) =>
                  `${SLIDER_VALUES[Math.round(Number(pipValue))]} ₽`,
              },
            }}
          />
        </div>

        <Gap size={24} />

        <Typography.Title
          tag="h1"
          view="large"
          weight="bold"
          style={{ textAlign: "center" }}
        >
          {selectedValue} <span style={{ color: "gray" }}>₽</span>
        </Typography.Title>

        <Gap size={24} />

        <div
          style={{
            background: "#F8F8F8",
            borderRadius: "16px",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <img
            src={map[selectedValue]}
            alt=""
            width={48}
            height={48}
            style={{ borderRadius: "100%" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography.Text view="primary-small" color="secondary">
              Хватит на
            </Typography.Text>
            <Typography.Text view="primary-medium" weight="bold">
              {map1[selectedValue]}
            </Typography.Text>
          </div>
        </div>
      </div>

      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <ButtonMobile
          block
          view="primary"
          loading={loading}
          href={deepLink}
          onClick={submit}
        >
          Закрепить скил
        </ButtonMobile>
      </div>
    </>
  );
};
