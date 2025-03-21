import CartContext from "@/Context/CartContext";
import Btn from "@/Elements/Buttons/Btn";
import { ToastNotification } from "@/Utils/CustomFunctions/ToastNotification";
import { useCartService } from "@/Utils/Services/CartService";
import { useCommonService } from "@/Utils/Services/Common";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import { Input, InputGroup } from "reactstrap";

const HandleQuantity = ({ classes = {}, productObj, Quantity, customIcon, CartID }) => {
  const { cartProducts, getTotal, clearCart, setCartProducts,  setrefreshCart, refreshCart } = useContext(CartContext);
  const [productQty, setProductQty] = useState(1);
  const {DeleteCartApi} = useCartService()
  const {ApiCalling} = useCommonService()

useEffect(()=>{

  setProductQty(Quantity)
},[Quantity])

  // useEffect(() => {
  //   const foundProduct = cartProducts.find((el) => (elem?.variation_id ? elem?.variation_id === el?.variation_id : el.product_id === elem?.product_id));
  //   if (foundProduct) {
  //     setProductQty(foundProduct.quantity);
  //   } else {
  //     setProductQty(0);
  //   }
  // }, [cartProducts]);

//  const handleDecrease = useCallback(() => {
//     handleIncDec(-1, productObj, productQty, setProductQty, false, elem);
//   }, [handleIncDec, productObj, productQty, elem]);

//   const handleIncrease = useCallback(() => {
//     handleIncDec(1, productObj, productQty, setProductQty, false, elem);
//   }, [handleIncDec, productObj, productQty, elem]); 

const UpdateQTY = async(CartID, currentQty)=>{
  const OBJ = {
    Para:JSON.stringify({CartId:CartID, Quantity:currentQty, ActionMode:"UpdateCart"} ),
    procName:'AddToCart'
  }
  const result = await ApiCalling(OBJ);
  if(result[0]?.StatusCode === 1){
    setrefreshCart(!refreshCart)
  }
}

const DecreaseQTY = (CartID)=>{
  const currentQty  = productQty - 1
  setProductQty(productQty - 1)
  UpdateQTY(CartID, currentQty)
}

const IncreaseQTY = (CartID)=>{
  const currentQty  = productQty + 1
  setProductQty(productQty + 1)
  UpdateQTY(CartID, currentQty)
}

// Remove Item from cart


const RemoveItemFromCart = async(id)=>{
      const result = await DeleteCartApi({CartId:id});
      console.log(result);
      if(result[0]?.StatusCode === 1){
        ToastNotification('success', result[0]?.Msg);
        setrefreshCart(!refreshCart)
      }
}

  return (
    <div className="qty-box">
      <InputGroup>
        <span className="input-group-prepend" onClick={()=>{ productQty >= 2 ? DecreaseQTY(CartID) : RemoveItemFromCart(CartID)}}>
          <Btn className="quantity-left-minus" id="quantity-left-minus" type="button">
            {customIcon && productQty === 1 ? customIcon : <RiSubtractLine />}
          </Btn>
        </span>
        <Input className="input-number qty-input" type="text" name="quantity" value={productQty} readOnly />
        <span className="input-group-prepend" onClick={()=> IncreaseQTY(CartID)}>
          <Btn className="quantity-left-plus" id="quantity-left-plus" type="button">
            <RiAddLine />
          </Btn>
        </span>
      </InputGroup>
    </div>
  );
};

export default HandleQuantity;
