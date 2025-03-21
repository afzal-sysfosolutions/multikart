import HandleQuantity from "@/Components/Cart/HandleQuantity";
import Avatar from "@/Components/Widgets/Avatar";
import { placeHolderImage } from "@/Components/Widgets/Placeholder";
import {ToastNotification} from '@/Utils/CustomFunctions/ToastNotification'
import CartContext from "@/Context/CartContext";
import SettingContext from "@/Context/SettingContext";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Btn from "@/Elements/Buttons/Btn";
import { useCartService } from "@/Utils/Services/CartService";
import Cookies from "js-cookie";
import Link from "next/link";
import { useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import AccountContext from "@/Context/AccountContext";
import { Href } from "@/Utils/Constants";

const SelectedCart = ({ modal, setSelectedVariation, setModal, CardData,  }) => {
  const [clearCart, setClearCartData] = useState(false);
  // const { convertCurrency } = useContext(SettingContext);
  const {clientId} = useContext(AccountContext)
  const { setCartCanvas, setOpenAuthModal } = useContext(ThemeOptionContext);
  const { cartProducts, getTotal, setCartProducts,  setrefreshCart, refreshCart } = useContext(CartContext);
  const [SubTotal, setSubTotal] = useState(null)
   const {DeleteCartApi} = useCartService()
  const { t } = useTranslation("common");
 
  
  const onEdit = (data) => {
    setSelectedVariation(() => data);
    setTimeout(() => {
      setModal(true);
    }, 0);
  };

  const total = useMemo(() => {
    return getTotal(cartProducts);
  }, [cartProducts, modal]);

  const handelCheckout = () => {
    if(!clientId){
      ToastNotification('error', "🎁 Almost There! Sign in to apply your discounts & offers!");
      setOpenAuthModal(true)
    }
  };

  useEffect(() => {
    cartProducts?.filter((elem) => {
      if (elem?.variation) {
        elem.variation.selected_variation = elem?.variation?.attribute_values?.map((values) => values?.value).join("/");
      } else {
        elem;
      }
    });
  }, [modal]);

// Removing Items form Cart
  const RemoveItemFromCart = async(id)=>{
    const result = await DeleteCartApi({CartId:id});
    console.log(result);
    if(result[0]?.StatusCode === 1){
      ToastNotification('success', result[0]?.Msg);
      setrefreshCart(!refreshCart)
    }
  }

  // Calculating Total Amount 
  const calculateTotal = (Data)=>{
    const totalPrice = Data.reduce((acc, itm) => acc + itm?.Total, 0);
    setSubTotal(totalPrice)
  }
  
  const RefreshCart =()=>{

  }

  useEffect(()=>{
    if(CardData.length > 0){
      calculateTotal(CardData)
    }
  },[CardData])

  return (
    <>
      <div className="cart_media">
        <ul className="cart_product">
          {CardData.map((elem, i) => (
            <li className="product-box-contain" key={i}>
              <div className="media">
                <Link href={`/product/${elem?.product?.slug}`}>
                  <Avatar customeClass={""} data={elem?.ProductImage} placeHolder={ `http://122.160.25.202/multikart/`+elem?.ProductImage}  height={72} width={87} />
                </Link>
                <div className="media-body">
                  <Link href={`/product/${elem?.product?.slug}`}>
                    <h4>{elem?.ProductName ?? elem?.ProductName}</h4>
                  </Link>
                  <h4 className="quantity">
                    <span>{elem?.Quantity} X ₹{elem?.ProductPrice}</span>
                    {/* <span>{convertCurrency(elem?.variation?.sale_price ?? elem?.product?.sale_price)}</span> */}
                  </h4>
                  {elem?.variation && <h5 className="gram">{elem?.variation?.attribute_values?.[0]?.value ? elem?.variation?.attribute_values?.[0]?.value : elem?.selected_variation}</h5>}
                  <HandleQuantity productObj={elem} Quantity={elem?.Quantity} CartID={elem?.CartId} customIcon={<RiDeleteBinLine />} RemoveItemFromCart={RemoveItemFromCart} />
                  <div className="close-circle">
                    {elem?.variation && (
                      <Btn className="close_button delete-button edit-button" color="transparent" onClick={() => onEdit(elem)}>
                        <RiPencilLine />
                      </Btn>
                    )}
                    <Btn className="delete-button close_button" color="transparent" onClick={() => RemoveItemFromCart(elem?.CartId)}>
                      <RiDeleteBinLine />
                    </Btn>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {cartProducts?.length ? (
          <ul className="cart_total ">
            <li>
              <div className="total">
                <h5>
                  {t("SubTotal")} : <span>₹{SubTotal}</span>
                </h5>
              </div>
            </li>
            <li>
              <div className="buttons">
                <Link href={`/cart`} className="btn view-cart" onClick={() => setCartCanvas(false)}>
                  {t("ViewCart")}
                </Link>
                <Link
                  href={clientId ? "/checkout" : Href}
                  className="btn checkout"
                  onClick={() => {
                    setCartCanvas(false);
                    handelCheckout()
                  }}
                >
                  {t("Checkout")}
                </Link>
              </div>
            </li>
          </ul>
        ) : null}
      </div>
    </>
  );
};

export default SelectedCart;
