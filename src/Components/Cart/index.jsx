"use client";
import CartContext from "@/Context/CartContext";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Loader from "@/Layout/Loader";
import Breadcrumbs from "@/Utils/CommonComponents/Breadcrumb";
import { useContext, useEffect, useState } from "react";
import WrapperComponent from "../Widgets/WrapperComponent";
import CartButtons from "./CartButtons";
import ShowCartData from "./ShowCartData";
import { useCommonService } from "@/Utils/Services/Common";
import { useCartService } from "@/Utils/Services/CartService";

const CartContent = () => {
  const { cartCanvas, setCartCanvas, isLoading } = useContext(ThemeOptionContext);
  const { cartProducts, getCartLoading, refreshCart } = useContext(CartContext);
  const [CartData, setCartData] = useState([])
  const {FetchCartApi}  =useCartService()

  // const FetchCartData = async()=>{
  //   const OBJ = {
  //     ClientId:"0"
  //   }
  //   try {
  //     const res = await FetchCartApi(OBJ);
  //     setCartData(res)
  //   } catch (error) {
  //     console.log(error)
  //   }

    
  // }

  // useEffect(()=>{
  //   FetchCartData()
  // },[refreshCart])

  if (isLoading) return <Loader />;
  return (
    <>
      <Breadcrumbs title={"Cart"} subNavigation={[{ name: "Cart" }]} />
      <WrapperComponent classes={{ sectionClass: "cart-section section-b-space", fluidClass: "container" }} noRowCol={true}>
        <ShowCartData/>
        {cartProducts.length > 0 && <CartButtons />}
      </WrapperComponent>
    </>
  );
};

export default CartContent;
