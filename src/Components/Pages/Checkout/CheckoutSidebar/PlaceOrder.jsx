import AccountContext from "@/Context/AccountContext";
import CartContext from "@/Context/CartContext";
import SettingContext from "@/Context/SettingContext";
import Btn from "@/Elements/Buttons/Btn";
import { useCartService } from "@/Utils/Services/CartService";
import { ToastNotification } from "@/Utils/CustomFunctions/ToastNotification";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const PlaceOrder = ({ values, addToCartData, errors }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  // const { settingData } = useContext(SettingContext);
  const access_token = Cookies.get("uat");
  const { cartProducts, setCartProducts, setShippingAmt, setDiscountAmt, PaymentMethod,  setPaymentMethod, CouponCode, setCouponCode, setorderNumber } = useContext(CartContext);
  const {ShippingID, setShippingID, clientId} = useContext(AccountContext);
  const [getOrderNumber, setGetOrderNumber] = useState("");
  const [errorOrder, setErrorOrder] = useState("");
  const [disable, setDisable] = useState(true);
  const {PlaceOrderApi} = useCartService() 

  useEffect(() => {
    if (!access_token) {
      setDisable(Object.keys(errors).length > 0);
    } else {
      setDisable(!(values["billing_address_id"] && values["payment_method"]));
    }
  }, [access_token, values, errors]);

  const handleClick = async() => {
    // router.push(`/account/order/details/1000`);
    if(ShippingID === null ) return ToastNotification('error', "Please Select Shipping Address");
    //  Put your logic here
    const CookieID = Cookies.get("userID");
    const OBJ = {
      CookieId:CookieID,
      ClientId:clientId,
      EPIN:'',
      OrderType:PaymentMethod,
      AddressId:ShippingID,
      Comment:'Hello I am Afzal',
      VoucherCode:CouponCode,
    }
    
   try {
    const result = await PlaceOrderApi(OBJ);
    ToastNotification('success', result[0]?.Msg);
    if(result[0]?.StatusCode === "1"){
      setCartProducts([]);
      setShippingAmt(0)
      setDiscountAmt(0);
      setPaymentMethod('COD');
      setCouponCode('');
      setShippingID(null);
      setorderNumber(result[0]?.OrderNumber)
      router.push('/successorder');

    }
   } catch (error) {
    ToastNotification('error', "Something Wents Wrong!")
   }


  };  
  return (
    <div className="text-end">
      {addToCartData?.is_digital_only ? (
        <Btn className="order-btn" onClick={handleClick} disabled={values["billing_address_id"] && values["payment_method"] ? false : true}>
          {t("PlaceOrder")}
        </Btn>
      ) : (
        <Btn className="order-btn" onClick={handleClick} disabled={disable}>
          {t("PlaceOrder")}
        </Btn>
      )}
    </div>
  );
};

export default PlaceOrder;
