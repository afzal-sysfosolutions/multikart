import { placeHolderImage } from "@/Components/Widgets/Placeholder";
import CartContext from "@/Context/CartContext";
import SettingContext from "@/Context/SettingContext";
import Image from "next/image";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

const SidebarProduct = ({ values }) => {
  const { t } = useTranslation("common");
  const { cartProducts } = useContext(CartContext);
  // const { convertCurrency } = useContext(SettingContext);
  return (
    <div className="checkout-details">
      <div className="order-box">
        <div className="title-box">
          <h4>{t("Summary Order")}</h4>
          <p>{t("Summary Order Description")}</p>
        </div>
        <ul className="qty">
          {cartProducts?.map((item, i) => (
            <li key={i}>
              {item && (
                <div className="cart-image">
                  <Image src={item?.ProductImage ? `http://122.160.25.202/multikart/${item?.ProductImage}` : placeHolderImage} className="img-fluid" alt={item?.product?.name || "product"} width={70} height={70} />
                </div>
              )}
              <div className="cart-content">
                <div>
                  <h4>{item?.ProductName}</h4>
                  <h5 className="text-theme">
                    {item?.ProductPrice} x {item?.Quantity}
                    {/* {item?.variation ? convertCurrency(item?.variation.sale_price) : convertCurrency(item?.product?.sale_price)} x {item.quantity} */}
                  </h5>
                </div>
                  <span className="text-theme">₹{item?.Total}</span>
                {/* <span className="text-theme">{convertCurrency((item?.variation ? item?.variation.sale_price : item?.product?.sale_price) * item.quantity)}</span> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarProduct;
