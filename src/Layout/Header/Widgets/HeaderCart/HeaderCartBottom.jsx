import Cookies from "js-cookie";
import { useContext, useEffect, useMemo, useState } from "react";
import { ToastNotification } from "@/Utils/CustomFunctions/ToastNotification";
import { Progress } from "reactstrap";
import CartContext from "@/Context/CartContext";
import SettingContext from "@/Context/SettingContext";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import { Href } from "@/Utils/Constants";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { RiShoppingCartLine, RiTruckLine } from "react-icons/ri";
import CartVariationModal from "./CartVariationModal";
import SelectedCart from "./SelectedCart";
import {settingData} from '@/Data/setting/settingData'
import { useCartService } from "@/Utils/Services/CartService";
import { useCommonService } from "@/Utils/Services/Common";
import AccountContext from "@/Context/AccountContext";
const HeaderCartBottom = ({ modal, setModal, shippingFreeAmt, shippingCal }) => {
  const { cartCanvas, setCartCanvas } = useContext(ThemeOptionContext);
  const { ClientId} = useContext(AccountContext);
  const { cartProducts, getTotal, setCartProducts,  setrefreshCart, refreshCart } = useContext(CartContext);

  const {FetchCartApi} = useCartService()
  const {ApiCalling} = useCommonService()
  const [selectedVariation, setSelectedVariation] = useState("");
  const { t } = useTranslation("common");
  const [CardProduct, setCardProduct] = useState([])
  const pathname = usePathname();
  const isAuth = Cookies.get("uat");
  // Getting total when cartProducts changes
  const total = useMemo(() => {
    return getTotal(cartProducts);
  }, [cartProducts, modal]);

  const handelCheckout = () => {
    Cookies.set("CallBackUrl", "/checkout");
  };

  const FetchCartData = async ()=>{
      const CookieID = Cookies.get('userID')
    const Result = await FetchCartApi({ClientId:ClientId || null, CookieId:CookieID});
    setCardProduct(Result);
    setCartProducts(Result)
  }

  const clearCart = async ()=>{
    const cookieID = Cookies.get('userID')
    const OBJ ={
      Para:JSON.stringify({ClientId:ClientId, CookieId:cookieID, ActionMode :'AllDelete'}),
      procName:'AddToCart'
    }
    const result = await ApiCalling(OBJ);
    if(result[0]?.StatusCode === 1){
      ToastNotification('success', result[0]?.Msg);
      setCartProducts([]);
      setrefreshCart(!refreshCart)
    }else{
      ToastNotification('error', result[0]?.Msg)

    }
  }

  useEffect(()=>{
    FetchCartData()
  },[cartCanvas, refreshCart])


  return (
    <>
      {CardProduct?.length > 0 && (  
        <>
          <div className="pere-text-box success-box">
            {shippingFreeAmt > getTotal() ? (
              <p>
                {t("Spend")} <span className="shipping">{convertCurrency(shippingFreeAmt - getTotal(cartProducts))}</span> {t("more and enjoy")} <span className="shipping">{t("FREESHIPPING!")}</span>
              </p>
            ) : (
              <p>
                <span className="shipping">{t("Congratulations")}!</span> {t("Enjoy free shippingonus")}!
              </p>
            )}
            {/* <Progress multi>
              {shippingCal <= 30 ? (
                <Progress striped animated color="danger" value={shippingCal}>
                  <div className="progress-icon">
                    <RiTruckLine />
                  </div>
                </Progress>
              ) : shippingCal >= 31 && shippingCal <= 80 ? (
                <Progress striped animated color="warning" value={shippingCal}>
                  <div className="progress-icon">
                    <RiTruckLine />
                  </div>
                </Progress>
              ) : (
                <Progress striped animated value={shippingCal}>
                  <div className="progress-icon">
                    <RiTruckLine />
                  </div>
                </Progress>
              )}
            </Progress> */}
            <Progress multi>
            <Progress striped animated color="warning" value={30}>
                  <div className="progress-icon">
                    <RiTruckLine />
                  </div>
                </Progress>
            </Progress>
          </div>
          <div className="sidebar-title">
            <a href={Href} onClick={clearCart}>
              {t("Clear Cart")}
            </a>
          </div>
          <SelectedCart CardData={CardProduct} setModal={setModal} modal={modal} />
        </>
      )}
      <CartVariationModal modal={modal} setModal={setModal} selectedVariation={selectedVariation} />
      {!CardProduct?.length && (
        <div className="cart_media empty-cart">
          <ul className="empty-cart-box">
            <div>
              <div className="icon">
                <RiShoppingCartLine />
              </div>
              <h5>{t("Empty Cart Description")}</h5>
            </div>
          </ul>
        </div>
      )}
    </>
  );
};

export default HeaderCartBottom;
