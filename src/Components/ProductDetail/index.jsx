"use client";
import ProductIdsContext from "@/Context/ProductIdsContext";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Loader from "@/Layout/Loader";
import request from "@/Utils/AxiosUtils";
import { ProductAPI } from "@/Utils/AxiosUtils/API";
import Breadcrumbs from "@/Utils/CommonComponents/Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import {ToastNotification} from '@/Utils/CustomFunctions/ToastNotification'
import StickyCheckout from "./Common/StickyCheckout";
import Skeleton  from 'react-loading-skeleton';
import Product4Image from "./Product4Image";
import ProductAccordion from "./ProductAccordion";
import ProductColumn from "./ProductColumn";
import ProductDigital from "./ProductDigital";
import CartContext from "@/Context/CartContext";
import ProductThumbnailImage from "./ProductImageOutside";
import Cookies from "js-cookie";
import ProductSidebarLayout from "./ProductSidebarLayout";
import ProductSlider from "./ProductSlider";
import ProductSticky from "./ProductSticky";
import ProductThumbnail from "./ProductThumbnail";
import ProductVerticalTab from "./ProductVerticalTab";
import { Container, Row, Col } from "reactstrap";
import ThumbnailProductImage from "./ProductThumbnail/ThumbnailImage";
import { MenCollection } from "@/Data/Men/MenCollectionData";
import { useProductDetails } from "@/Utils/Services/ProductDetails";
import { useCommonService } from "@/Utils/Services/Common";
import StickyCheckoutButtons from "./Common/StickCheckoutButtons";
import { useCartService } from "@/Utils/Services/CartService";
import AccountContext from "@/Context/AccountContext";

const ProductDetailContent = () => {
  const slug  = useParams();
  const router = useRouter();
  const [productData, setproductData] = useState([]);
  const [Qty, setQty] = useState(1)
  const [sliderData, setsliderData] = useState([]);
  const [variationList, setvariationList] = useState([]);
  const [Active_Color, setActive_Color] = useState(null);
  const [ActiveSize, setActiveSize] = useState(null); 
  const [P_Color, set_P_Color] = useState([]);
  const [P_Size, set_P_Size] = useState([]);
  const [tabindex, settabindex] = useState(0)
  const { themeOption, setCartCanvas, cartCanvas} = useContext(ThemeOptionContext);
  const { ClientId} = useContext(AccountContext);
  const {cartProducts, setCartProducts} = useContext(CartContext);
  const { setGetProductIds, isLoading: productLoader } = useContext(ProductIdsContext);
  const searchParams = useSearchParams();
  const {productDtailsApiCalling, loading} = useProductDetails() 
  const {AddToCartApi} = useCartService()
  const {ApiCalling} = useCommonService()
  const queryProductLayout = searchParams.get("layout");
  const [loader, setloader] = useState(false)

  // Calling the Api
  const FetchProductDetails = async(p_ID, v_ID)=>{
    setloader(true)
    try {
      const result  = await productDtailsApiCalling({ClientId:ClientId, ProductId:p_ID, ProductVariantId:v_ID})
      setproductData(result)
      setSliderImages(JSON.parse(result[0]?.SideImage));
      const pairs = result[0]?.ProductVariation?.split(",")
      const Color= pairs[0]?.split(":")[1];
      const Size = pairs[1]?.split(":")[1]    
      const VariationData =JSON.parse(result[0]?.VariationList).map((item)=> {
        const Color = item?.ProductVariation?.split(",")[0]?.split(":")[1];
        const Size = item?.ProductVariation?.split(",")[1]?.split(":")[1];
         return {v_Id:item?.ProductVariantDetailId, v_Color:Color, v_Size:Size} 
        })
      setActive_Color(Color);
      setActiveSize(Size);
      setvariationList(VariationData)
      setloader(false)
    } catch (error) {
      setloader(false)
    }
  }


// Fetching Product Color And Size
  const FetchProductColorAndSize = async(p_ID, v_ID)=>{
    setloader(true)
try {
      const OBJ ={ Para:JSON.stringify({ ProductId:p_ID, VariationType:'Size', ActionMode:'GetVariation'}),
        procName:'ProductvariationSizeColor '
      }
      const OBJ2 ={ Para:JSON.stringify({ ProductId:p_ID, VariationType:'Color', ActionMode:'GetVariation'}),
      procName:'ProductvariationSizeColor '
    }
      const Sizeresult  = await ApiCalling(OBJ)
      const Colorresult  = await ApiCalling(OBJ2)
      const updatedData = Colorresult.map(item => ({
        Name: item.Name.split("Color:")[1] 
      }));
      const updatedSize = Array.isArray(Sizeresult) ? Sizeresult.map(item => ({
        Name: item.Name.split("Size:")[1] 
      })) : [];
      set_P_Color(updatedData);
      set_P_Size(updatedSize);
     
      setloader(false)
} catch (error) {
  setloader(false)
}
  }

  // Getting Product Layout
  const isProductLayout = useMemo(() => {
    return queryProductLayout ? queryProductLayout : themeOption?.product?.product_layout ?? "product_thumbnail";
  }, [queryProductLayout, themeOption]);
  const [productState, setProductState] = useState({ product: [], attributeValues: [], productQty: 1, selectedVariation: "", variantIds: [], statusIds: [] });
 
  
  useEffect(()=>{
    const p_ID = slug?.view[1];
    const v_ID = slug?.view[2]
    FetchProductDetails(p_ID, v_ID)
    FetchProductColorAndSize(p_ID, v_ID)
  },[slug])

  const setSliderImages = (data)=>{
    const dataResult = data.map((item, index) => ({
      original_url: process.env.NEXT_PUBLIC_PRODUCT_IMG+item?.ImageValue,
      name: `Image ${index + 1}`
    }));  

    setsliderData(dataResult)

  }

  const showProductLayout = {
    product_thumbnail: <ProductThumbnail productState={productState} setProductState={setProductState} />,
    product_images: <Product4Image productState={productState} setProductState={setProductState} />,
    product_sticky: <ProductSticky productState={productState} setProductState={setProductState} />,
    product_slider: <ProductSlider productState={productState} setProductState={setProductState} />,
    product_digital: <ProductDigital productState={productState} setProductState={setProductState} />,
    product_accordion: <ProductAccordion productState={productState} setProductState={setProductState} />,
    product_no_sidebar: <ProductThumbnail productState={productState} setProductState={setProductState} />,
    vertical_tab: <ProductVerticalTab productState={productState} setProductState={setProductState} />,
    product_thumbnail_left_image: <ProductThumbnailImage direction="left" productState={productState} setProductState={setProductState} />,
    product_thumbnail_right_image: <ProductThumbnailImage direction="right" productState={productState} setProductState={setProductState} />,
    product_thumbnail_image_outside: <ProductThumbnailImage productState={productState} setProductState={setProductState} />,
    product_sidebar_left: <ProductSidebarLayout productState={productState} setProductState={setProductState} direction="left" />,
    product_sidebar_right: <ProductSidebarLayout productState={productState} setProductState={setProductState} direction="right" />,
    product_column_thumbnail: <ProductColumn productState={productState} setProductState={setProductState} direction="bottom" />,
  };

  const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100) + "%";
  };





// Changing Product Variation 
const ChangeProductVariation = (color, size) => {
  const filteredData = variationList.filter(item => item.v_Color === color && item.v_Size === size);
  const p_Name = slug?.view[0];
  const P_pID = slug?.view[1];
  // console.log(filteredData, p_Name);
  router.push(`/product/${p_Name}/${P_pID}/${filteredData[0].v_Id}`)
}

// Add To Cart 
const AddToCart = async (Values)=>{
  const CookieID = Cookies.get('userID');

  const OBJ ={
    CookieId:CookieID,
    ClientId:ClientId,
    ImagePath:`APP/ProductImages/${Values[0]?.VDefaultImage}`,
    ProductId:Values[0]?.ProductId,
    ProductVariantId:Values[0]?.ProductVariantDetailId,
    ProductPackageOptions:'NA',
    Quantity:Qty,
    Remark:'Direct',

  }
  const result = await AddToCartApi(OBJ)
  if(result[0]?.StatusCode === 1){
    ToastNotification('success', result[0]?.Msg)
  }else{
    return ToastNotification('warn', result[0]?.Msg)
  }
  // console.log(result);
  setCartCanvas(!cartCanvas)
}



  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* {<Breadcrumbs title={params} subNavigation={[{ name: "Product" }, { name: params }]} />}
      {showProductLayout[isProductLayout]}
      {ProductData && <StickyCheckout ProductData={ProductData} isLoading={isLoading} />} */}
      <div className="breadcrumb-section">
        <div className="container">
          <h2 className="text-uppercase">{productData[0]?.ProductName}</h2>
          <nav className="theme-breadcrumb">
            <nav className="" aria-label="breadcrumb">
              <ol className="breadcrumb">
                <div className="breadcrumb-item active">
                  <a href="javascript:void(0)"> Home </a>
                </div>
                <div className="breadcrumb-item active ">
                  <a href="javascript:void(0)"> Product </a>
                </div>
                <div className="breadcrumb-item active "><a href="javascript:void(0)">{productData[0]?.ProductType} </a>
                </div>
                </ol>
                </nav>
              </nav>
            </div>
      </div>
      <section className="collection-wrapper">
        <Container>
          <div className="g-sm-4 g-3 row">
              <div className="col-xl-4">
                <ThumbnailProductImage productData={sliderData}/>
                {/* <div className="sticky-top-custom">
                  <div className="thumbnail-image-slider">
                    <div className="g-sm-4 g-3 row">
                      <div className="col-12">
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              {productData?.length > 0 ? <div className="col-lg-7 col-xl-4">
                <div className="product-right product-description-box product-page-details">
                  <div className="trending-text">
                    <img src='https://multikart-frontend-next-json.vercel.app/_next/image?url=%2Fassets%2Fimages%2Ftrending.gif&w=32&q=75'/>
                    <h5>Selling fast! 4 people have this in their carts.</h5>
                  </div>
                  <h2 className="main-title">{productData[0]?.ProductName}</h2>
                  <div className="product-rating"><div className="rating ">
                    <span>
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="17" width="17" xmlns="http://www.w3.org/2000/svg"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502L9.96214 9.69434L5.12921 10.2674L8.70231 13.5717L7.75383 18.3451L12.0006 15.968Z"></path></svg>
                      </span>
                      <span>
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="17" width="17" xmlns="http://www.w3.org/2000/svg"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502L9.96214 9.69434L5.12921 10.2674L8.70231 13.5717L7.75383 18.3451L12.0006 15.968Z"></path></svg></span>
                      <span><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="17" width="17" xmlns="http://www.w3.org/2000/svg"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502L9.96214 9.69434L5.12921 10.2674L8.70231 13.5717L7.75383 18.3451L12.0006 15.968Z"></path></svg></span>
                      <span><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="17" width="17" xmlns="http://www.w3.org/2000/svg"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502L9.96214 9.69434L5.12921 10.2674L8.70231 13.5717L7.75383 18.3451L12.0006 15.968Z"></path></svg></span>
                      <span><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="17" width="17" xmlns="http://www.w3.org/2000/svg"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502L9.96214 9.69434L5.12921 10.2674L8.70231 13.5717L7.75383 18.3451L12.0006 15.968Z"></path></svg></span></div>
                      <span className="divider">|</span><a href="javascript:void(0)" className="mb-0">{productData[0]?.Ratings} Review</a></div>
                      <div className="price-text"><h3><span className="text-dark fw-normal">MRP:</span>₹{productData[0]?.ProductPrice}<del> ₹{productData[0]?.UsualPrice1}</del><span className="discounted-price">{calculateDiscountPercentage(productData[0]?.UsualPrice1, productData[0]?.ProductPrice)} Off</span></h3><span>Inclusive all the tax</span></div>
                      <div className="size-delivery-info"><a href="javascript:void(0)"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8.96456 18C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456ZM15 7H3V15.0505C3.63526 14.4022 4.52066 14 5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H14.3368C14.5045 15.647 14.7296 15.3264 15 15.0505V7ZM17 13H21V12.715L18.9917 10H17V13ZM17.5 19C18.1531 19 18.7087 18.5826 18.9146 18C18.9699 17.8436 19 17.6753 19 17.5C19 16.6716 18.3284 16 17.5 16C16.6716 16 16 16.6716 16 17.5C16 17.6753 16.0301 17.8436 16.0854 18C16.2913 18.5826 16.8469 19 17.5 19ZM7 17.5C7 16.6716 6.32843 16 5.5 16C4.67157 16 4 16.6716 4 17.5C4 17.6753 4.03008 17.8436 4.08535 18C4.29127 18.5826 4.84689 19 5.5 19C6.15311 19 6.70873 18.5826 6.91465 18C6.96992 17.8436 7 17.6753 7 17.5Z"></path></svg> Delivery &amp; Return</a><a href="javascript:void(0)"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5.76282 17H20V5H4V18.3851L5.76282 17ZM6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM11 14H13V16H11V14ZM8.56731 8.81346C8.88637 7.20919 10.302 6 12 6C13.933 6 15.5 7.567 15.5 9.5C15.5 11.433 13.933 13 12 13H11V11H12C12.8284 11 13.5 10.3284 13.5 9.5C13.5 8.67157 12.8284 8 12 8C11.2723 8 10.6656 8.51823 10.5288 9.20577L8.56731 8.81346Z"></path></svg> Ask a question</a></div>
                      <div className="bordered-box"><h4 className="sub-title">Product Information</h4><ul className="shipping-info"><li>SKU : {productData[0]?.ProductSKU}</li><li>Stock Status :{productData[0]?.IsStock == 0 ? 'Out of Stock' : 'In Stock'}</li>
                {/* <li>Quantity : 20 Items Left</li> */}
                </ul></div>
                <div className="paymnet-option">
                  <div className="dashed-border-box">
                  <h4 className="sub-title">Guaranteed Safe Checkout</h4>
                  <img src='https://multikart-frontend-next-json.vercel.app/_next/image?url=https%3A%2F%2Flaravel.pixelstrap.net%2Fmultikart%2Fstorage%2F3835%2Fpayments.png&w=384&q=75'/>
                  </div>
                </div>
                <div className="dashed-border-box">
                <h4 className="sub-title">Secure Checkout</h4>
                <img src="https://multikart-frontend-next-json.vercel.app/_next/image?url=https%3A%2F%2Flaravel.pixelstrap.net%2Fmultikart%2Fstorage%2F3836%2Fsecure_payments.png&w=384&q=75"/>
                </div>
                
                </div>                
              </div> : <div className="col-lg-7 col-xl-4">
              <p>
              <Skeleton count={1} />
              <Skeleton count={1} height={70}/>
              <Skeleton count={1} />
              <Skeleton count={1} height={40}/>
              <Skeleton count={6} />
              <Skeleton count={1} height={80}/>
              <Skeleton count={1} height={80}/>
              </p>
              </div>}
              {productData?.length > 0 ?<div className="col-lg-5 col-xl-4">
                <div className="product-right product-form-box product-page-details">
                <div className="variation-box">
                  <h4 className="sub-title">Color:</h4>
                  <ul className="quantity-variant color">
                    {P_Color.map((itm, idx) => <li onClick={()=> { setActive_Color(itm?.Name); ChangeProductVariation(itm?.Name, ActiveSize)}} key={idx} className={itm?.Name === Active_Color ? 'bg-light active' : 'bg-light'}><span id="Green" style={{backgroundColor:itm?.Name, border:'1px solid #d6d1d1', cursor:'pointer'}}></span></li>)}
                    </ul>
                  </div>
                  <div className="variation-box">
                    <h4 className="sub-title">Size:</h4>
                    <ul className=" quantity-variant circle">
                      { P_Size?.length > 0 ? P_Size.map((itm, idx)=> <li key={idx}  className={itm?.Name === ActiveSize && productData[0]?.IsStock == 0 ? "disabled" :itm?.Name === ActiveSize && productData[0]?.IsStock == 1 ?  'active' : ''} title={itm?.Name}><button type="button" id={itm?.Name} class="btn btn-transparent" onClick={()=> {setActiveSize(itm?.Name); ChangeProductVariation(Active_Color, itm?.Name)}}><div className="lh-1" style={{fontSize:itm?.Name === "Free Size" ? '8px' : ''}}>{itm?.Name}</div></button></li> ) : <>
                      <li className="disabled"><button type="button" className="btn btn-transparent"><div>S</div></button></li>
                      <li className="disabled"><button type="button" className="btn btn-transparent"><div>M</div></button></li>
                      <li className="disabled"><button type="button" className="btn btn-transparent"><div>L</div></button></li>
                      <li className="disabled"><button type="button" className="btn btn-transparent"><div>XL</div></button></li>
                      </>}
                    </ul>
                  </div>
                  <div className="product-buttons"> 
                    <div>
                    <div className="qty-section">
                      <div className="cart_qty qty-box product-qty">
                        <div className="input-group">
                          <span className="input-group-prepend">
                            <button type="submit" id="quantity-left-minus18" className=" quantity-left-minus btn btn-transparent" onClick={()=> {Qty > 1 ? setQty(Qty-1) : null}}>
                              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg></button></span>
                              <input readOnly="" className="input-number form-control" type="number" value={Qty}/><span className="input-group-prepend">
                              <button type="submit" id="quantity-left-plus18" className=" quantity-left-plus btn btn-transparent" onClick={()=> setQty(Qty + 1)}>
                             <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
                             </button></span>
                             </div>
                            </div>
                          </div>
                    </div>
                    <div className="product-buy-btn-group">
                      <button onClick={() => AddToCart(productData)} type="button" className={ productData[0]?.IsStock == 0 ? "disabled  buy-button bg-theme btn-md scroll-button btn btn-transparent" : "btn-animation btn-solid hover-solid buy-button bg-theme btn-md scroll-button btn btn-transparent"}><div class="d-inline-block ring-animation"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" class="me-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path></svg></div>Add To Cart</button>
                      <button type="button" class="btn-solid buy-button btn btn-transparent">Buy Now</button>
                      </div>
                  </div>
                  <div className="buy-box compare-box">
                    <a><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path></svg><span>Add To Wishlist</span></a>
                    <a><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"></path></svg><span>Add To Compare</span></a>
                    <a><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M13.1202 17.0228L8.92129 14.7324C8.19135 15.5125 7.15261 16 6 16C3.79086 16 2 14.2091 2 12C2 9.79086 3.79086 8 6 8C7.15255 8 8.19125 8.48746 8.92118 9.26746L13.1202 6.97713C13.0417 6.66441 13 6.33707 13 6C13 3.79086 14.7909 2 17 2C19.2091 2 21 3.79086 21 6C21 8.20914 19.2091 10 17 10C15.8474 10 14.8087 9.51251 14.0787 8.73246L9.87977 11.0228C9.9583 11.3355 10 11.6629 10 12C10 12.3371 9.95831 12.6644 9.87981 12.9771L14.0788 15.2675C14.8087 14.4875 15.8474 14 17 14C19.2091 14 21 15.7909 21 18C21 20.2091 19.2091 22 17 22C14.7909 22 13 20.2091 13 18C13 17.6629 13.0417 17.3355 13.1202 17.0228ZM6 14C7.10457 14 8 13.1046 8 12C8 10.8954 7.10457 10 6 10C4.89543 10 4 10.8954 4 12C4 13.1046 4.89543 14 6 14ZM17 8C18.1046 8 19 7.10457 19 6C19 4.89543 18.1046 4 17 4C15.8954 4 15 4.89543 15 6C15 7.10457 15.8954 8 17 8ZM17 20C18.1046 20 19 19.1046 19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18C15 19.1046 15.8954 20 17 20Z"></path></svg><span>Share</span></a></div>
                </div>
              </div>: <div className="col-lg-5 col-xl-4">
              <Col>
              <Skeleton count={1} height={50}/>
              </Col>
              <Col className="mt-3">
              <Skeleton count={1} height={50}/>
              </Col>
              <Col className="mt-3">
              <Skeleton count={1} />
              </Col>
                <Row className="justify-content-center mt-3">
                <Col className="col-12">
                  <Row className="justify-content-center">
                    <Col className="col-5"> <Skeleton count={1} height={50} /></Col>
                    <Col className="col-5"> <Skeleton count={1} height={50} /></Col>
                  </Row>
                </Col>
                <Col className="col-4 mt-3"> <Skeleton count={1} /></Col>
                <Col className="col-4 mt-3"> <Skeleton count={1} /></Col>
                <Col className="col-4 mt-3"> <Skeleton count={1} /></Col>
                </Row>
                </div>}
          </div>
        </Container>
      </section>
      <section className="tab-product product-details-contain section-b-space m-0">
        <Container>
          <div className="g-sm-4 g-3 row">
            <div className="col-sm-12 col-lg-12">
              <ul className="nav nav-tabs nav-material nav">
                <li className="nav-item" onClick={()=> settabindex(0)}>
                <a className="active nav-link">Description</a>
                </li>
                <li className="nav-item" onClick={()=> settabindex(1)}>
                <a className="active nav-link">Review</a>
                </li>
                {/* <li className="nav-item" onClick={()=> settabindex(2)}>
                <a class="active nav-link">Q & A</a>
                </li> */}
              </ul>
              <div className="tab-content nav-material">
                <div className={tabindex === 0 ? 'tab-pane show active' : 'tab-pane'}>
                  <div className="product-description more-less-box ">
                  <div className="more-text">
                    <p dangerouslySetInnerHTML={{ __html: productData[0]?.ShortDescription }} />
                    </div>
                  </div>
                </div>
                <div className={tabindex === 1 ? 'tab-pane show active' : 'tab-pane'}>
                  <div className="single-product-tables ">
                    <Row>
                      <Col className="col-xl-5">
                        <div className="product-rating-box">
                          <Row>
                            <Col className="col-xl-12">
                              <div className="product-main-rating">
                                <div className="d-flex gap-3">
                                <h2>{productData[0]?.Ratings} </h2>
                                <div className="rating-box">
                                  <div className="product-rating">
                                    <ul className="rating ">
                                      <li><i className="ri-star-line fill"></i>
                                      </li><li><i className="ri-star-line fill"></i></li>
                                      <li><i className="ri-star-line fill"></i></li>
                                      <li><i className="ri-star-line fill"></i></li>
                                      <li><i className="ri-star-line"></i></li>
                                    </ul>
                                    </div><h4>{productData[0]?.Ratings} Ratings</h4></div>
                                </div>
                              </div>
                            </Col>
                            <Col className="col-xl-12">
                              <ul className="product-rating-list">
                                <li>
                                  <div className="rating-product">
                                  <h5>5<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path></svg></h5>
                                    <div className="progress">
                                      <div className="progress">
                                        <div className="progress-bar"></div>
                                      </div>
                                    </div>
                                    <h5 class="total">0</h5>
                                  </div>
                                </li>
                                <li>
                                  <div className="rating-product">
                                  <h5>4<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path></svg></h5>
                                    <div className="progress">
                                      <div className="progress">
                                      <div className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
                                      </div>
                                    </div>
                                    <h5 className="total">1</h5>
                                  </div>
                                </li>
                                <li>
                                  <div className="rating-product">
                                  <h5>3<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path></svg></h5>
                                    <div className="progress">
                                      <div className="progress">
                                        <div className="progress-bar"></div>
                                      </div>
                                    </div>
                                    <h5 class="total">0</h5>
                                  </div>
                                </li>
                                <li>
                                  <div className="rating-product">
                                  <h5>2<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path></svg></h5>
                                    <div className="progress">
                                      <div className="progress">
                                        <div className="progress-bar"></div>
                                      </div>
                                    </div>
                                    <h5 className="total">0</h5>
                                  </div>
                                </li>
                                <li>
                                  <div className="rating-product">
                                  <h5>1<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path></svg></h5>
                                    <div className="progress">
                                      <div className="progress">
                                        <div className="progress-bar"></div>
                                      </div>
                                    </div>
                                    <h5 class="total">0</h5>
                                  </div>
                                </li>
                              </ul>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      <Col className="col-xl-7">
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
     </section>
    
   </Suspense>
  );
};

export default ProductDetailContent;



