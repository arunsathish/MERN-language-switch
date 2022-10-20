import { Fragment, useEffect, useState } from "react";
import Axios from "axios";
import { useTranslation } from "react-i18next";

const ProductAll = () => {
  const [products, setProducts] = useState();
  const [language, setLanguage] = useState(localStorage.getItem("i18nextLng"));
  const { t } = useTranslation();

  const getProducts = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/product`;
    const options = {
      method: "GET",
      url: url,
      headers: {
        "Accept-Language": language,
      },
    };
    await Axios(options).then((res) => {
      setProducts(res.data.data);
    });
  };

  useEffect(() => {
    getProducts();
    setLanguage(localStorage.getItem("i18nextLng"));
  }, [language, t]);

  return (
    <Fragment>
      <h2>{t("product_all_link_message")}</h2>
      {products &&
        products.map((item) => (
          <div className="ui raised link card" key={item._id}>
            <div className="content">
              <div className="header">{item.name}</div>
              <div className="meta">
                <span className="category">{item.category}</span>
              </div>
              <div className="description">
                <p>{item.description}</p>
              </div>
            </div>
            <div className="extra content">
              <div className="right floated author">${item.price}</div>
            </div>
          </div>
        ))}
    </Fragment>
  );
};

export default ProductAll;
