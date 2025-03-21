import CartContext from "@/Context/CartContext";
// import SettingContext from "@/Context/SettingContext";
import { WishlistAPI } from "@/Utils/AxiosUtils/API";
import { Href } from "@/Utils/Constants";
import useCreate from "@/Utils/Hooks/useCreate";
import Link from "next/link";
import { RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiCloseLine } from "react-icons/ri";
import { Col, Row } from "reactstrap";
import CartProductDetail from "./CartProductDetail";
import HandleQuantity from "./HandleQuantity";
import { useCartService } from "@/Utils/Services/CartService";
import { ToastNotification } from "@/Utils/CustomFunctions/ToastNotification";

const CartData = ({ elem }) => {
  const { t } = useTranslation("common");
  const { removeCart, getTotal, cartProducts, setrefreshCart, refreshCart } = useContext(CartContext);
  const {DeleteCartApi} = useCartService()
  // const { convertCurrency } = useContext(SettingContext);
  const { mutate } = useCreate(WishlistAPI, false);

  const removeItem = async(id) => {
    const result = await DeleteCartApi({CartId:id});
    // console.log(result);
    if(result[0]?.StatusCode === 1){
      ToastNotification('success', result[0]?.Msg);
      setrefreshCart(!refreshCart)
    }
  };


  return (
    <>
    {cartProducts.map((itm)=> <tr>
      <CartProductDetail elem={itm} />
      <td>
        <Link href='#'>{itm?.ProductName}</Link>
        <Row className="mobile-cart-content">
          <Col>
            <div className="qty-box">
            <HandleQuantity  Quantity={itm?.Quantity} CartID={itm?.CartId} customIcon={<RiDeleteBinLine />}  />
              {/* <HandleQuantity productObj={elem?.product} Quantity={elem?.Quantity} classes={{ customClass: "quantity-price" }}  /> */}
            </div>
          </Col>
          <Col className="table-price">
            {/* <h2 className="td-color">
              {convertCurrency(elem?.product?.sale_price)}
              {elem?.product?.discount || elem?.product?.discount ? <del className="text-content">{convertCurrency(elem?.product?.price)}</del> : null}
            </h2> */}
          </Col>
          <Col>
            <a href={Href} className="icon remove-btn" onClick={()=> removeItem(itm?.CartId)}>
              <RiCloseLine />
            </a>
          </Col>
        </Row>
      </td>
      <td className="table-price">
        <h2>
        ₹{itm?.ProductPrice}
          {<del className="text-content">₹{itm?.UsualPrice}</del>}
        </h2>
        {elem?.product?.price - elem?.product?.sale_price != 0 || elem?.product?.price - elem?.product?.sale_price < 0 ? (
          <h6 className="theme-color">
            {t("You Save")} : ₹{Math.abs(itm?.UsualPrice - itm?.ProductPrice).toFixed(2)}
          </h6>
        ) : null}
      </td>

      <td>
        <div className="qty-box">
        <HandleQuantity productObj={elem?.product} Quantity={itm?.Quantity} CartID={itm?.CartId} customIcon={<RiDeleteBinLine />}  />
        </div>
      </td>
      <td className="subtotal">
        <h2 className="td-color">₹{itm?.Total}</h2>
      </td>
      <td>
        <a href={Href} className="icon remove-btn" onClick={()=> removeItem(itm?.CartId)}>
          <RiCloseLine />
        </a>
      </td>
    </tr>)}
    </>
  );
};

export default CartData;
