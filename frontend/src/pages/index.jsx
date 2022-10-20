import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const lngs = {
  en: { nativeName: "English", flag: "us" },
  ar: { nativeName: "Arabic", flag: "bh" },
};

const Pages = () => {
  const { t } = useTranslation();

  const englishSwitchButton = (
    <button
      className="ui primary basic button"
      onClick={() => i18n.changeLanguage("en")}
    >
      <i className="us flag"></i> English
    </button>
  );

  const arabicSwitchButton = (
    <button
      className="ui primary basic button"
      onClick={() => i18n.changeLanguage("ar")}
    >
      <i className="bh flag"></i> Arabic
    </button>
  );

  return (
    <Fragment>
      <div className="ui container">
        {i18n.resolvedLanguage === "ar"
          ? englishSwitchButton
          : arabicSwitchButton}

        <Outlet />
      </div>
    </Fragment>
  );
};

export default Pages;
