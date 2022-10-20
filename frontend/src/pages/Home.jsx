import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

import "../index.css";

const Home = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <h1>{t("welcome_message")}</h1>
      <Link to="/product">{t("product_all_link_message")}</Link>
      <div className="card">
        <p>
          <Trans i18nKey="description">
            Edit <code>src/App.jsx</code> and save to test HMR
          </Trans>
        </p>
      </div>
      <p className="read-the-docs">{t("click")}</p>
      <p>{t("learn")}</p>
    </Fragment>
  );
};

export default Home;
