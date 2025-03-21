// import { placeHolderImage } from "@/Components/Widgets/Placeholder";
// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { RiArrowLeftSLine, RiArrowRightSLine, RiHeadphoneLine, RiVideoLine } from "react-icons/ri";
// import ImageZoom from "react-image-zooom";
// import Slider from "react-slick";
// import { Col, Row } from "reactstrap";
// import DigitalImageOptions from "../Common/DigitalImageOptions";

// const ThumbnailProductImage = ({ productState, slideToShow }) => {
//   const { t } = useTranslation("common");
//   const [state, setState] = useState({ nav1: null, nav2: null });
//   const [videType, setVideType] = useState(["video/mp4", "video/webm", "video/ogg"]);
//   const [audioType, setAudioType] = useState(["audio/mpeg", "audio/wav", "audio/ogg"]);
//   const slider1 = useRef();
//   const slider2 = useRef();
//   const { nav1, nav2 } = state;
//   const currentVariation = productState?.selectedVariation?.variation_galleries?.length ? productState?.selectedVariation?.variation_galleries : productState?.product?.product_galleries;

//   useEffect(() => {
//     setState({
//       nav1: slider1.current,
//       nav2: slider2.current,
//     });
//   }, []);
//   useEffect(() => {
//     var index =
//       productState?.product?.product_galleries &&
//       productState?.product?.product_galleries.findIndex((object) => {
//         return object.id === productState?.selectedVariation.variation_image?.id;
//       });
//     productState?.selectedVariation.variation_image?.id && slider1.current.slickGoTo(index);
//   }, [productState?.selectedVariation.variation_image?.id, productState]);

//   let thumbnailSlider = {
//     infinite: false,
//     focusOnSelect: true,
//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 992,
//         settings: {
//           slidesToShow: 4,
//         },
//       },
//       {
//         breakpoint: 576,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 450,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//     ],
//   };
//   return (
//     <div className="sticky-top-custom">
//       <div className="thumbnail-image-slider">
//         <Row className="g-sm-4 g-3">
//           <Col xs={12}>
//             <div className={`product-slick position-relative main-product-box  ${!currentVariation?.length ? "no-arrow" : ""}`}>
//               {productState?.product?.is_sale_enable || productState?.product?.is_trending || productState?.product?.is_featured ? (
//                 <ul className="product-detail-label">
//                   {productState?.product.is_sale_enable ? <li className="soldout">{t("Sale")}</li> : ""}
//                   {productState?.product.is_trending ? <li className="trending">{t("Trending")}</li> : ""}
//                   {productState?.product.is_featured ? <li className="featured">{t("Featured")}</li> : ""}
//                 </ul>
//               ) : null}
//               {/* {currentVariation?.length ? ( */}
//               <Slider adaptiveHeight={true} asNavFor={nav2} ref={slider1} prevArrow={<RiArrowLeftSLine />} nextArrow={<RiArrowRightSLine />}>
//                 {currentVariation?.map((image, i) => (
//                   <div key={i}>
//                     <div className="slider-image">
//                       {videType.includes(image.mime_type) ? (
//                         <>
//                           <video className="w-100 " controls>
//                             <source src={image ? image?.original_url : ""} type={image?.mime_type}></source>
//                           </video>
//                         </>
//                       ) : audioType.includes(image?.mime_type) ? (
//                         <div className="slider-main-img">
//                           <audio controls>
//                             <source src={image ? image.original_url : ""} type={image.mime_type}></source>
//                           </audio>
//                         </div>
//                       ) : (
//                         <ImageZoom src={image?.original_url} alt={image?.name} zoom="200" className="img-fluid" height={670} width={670} />
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </Slider>
//               {/* ):null} */}
//               {!currentVariation?.length && <img src={productState?.product?.product_thumbnail ? productState?.product?.product_thumbnail?.original_url : placeHolderImage} className="img-fluid" alt={productState?.product?.name} />}

//               {productState?.product?.product_type == "digital" && <DigitalImageOptions product={productState?.product} />}
//             </div>
//           </Col>
//           <Col xs={12}>
//             {
//               <Slider {...thumbnailSlider} className="slider-nav no-arrow thumbnail-slider-box" asNavFor={nav1} ref={slider2} slidesToShow={productState.product?.product_galleries?.length <= 3 ? productState.product?.product_galleries?.length : slideToShow}>
//                 {currentVariation?.map((image, i) => (
//                   <div key={i} className="slider-image">
//                     {videType.includes(image.mime_type) ? (
//                       <>
//                         <div className="video-icon">
//                           <RiVideoLine />
//                         </div>
//                         <video width="130" height="130">
//                           <source src={image ? image?.original_url : ""} type={image?.mime_type} />
//                         </video>
//                       </>
//                     ) : audioType.includes(image?.mime_type) ? (
//                       <span>
//                         <RiHeadphoneLine size={100} />
//                       </span>
//                     ) : (
//                       <Image src={image?.original_url} alt={image?.name} className="img-fluid" height={130} width={130} />
//                     )}
//                   </div>
//                 ))}
//               </Slider>
//             }
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default ThumbnailProductImage;



import { placeHolderImage } from "@/Components/Widgets/Placeholder";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ProductDetailTopSlider from '@/Data/SliderSetting/index'
import { useTranslation } from "react-i18next";
import { RiArrowLeftSLine, RiArrowRightSLine, RiHeadphoneLine, RiVideoLine } from "react-icons/ri";
import ImageZoom from "react-image-zooom";
import Slider from "react-slick";
import { Col, Row } from "reactstrap";
import DigitalImageOptions from "../Common/DigitalImageOptions";
import { useParams } from "next/navigation";
import { MenCollection } from "@/Data/Men/MenCollectionData";

const ThumbnailProductImage = ({ productState, slideToShow,  productData}) => {
  const [currentVariation, setcurrentVariation] = useState(productData)
  const slug  = useParams();
  const { t } = useTranslation("common");
  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();
  const { nav1, nav2 } = state;
  console.log(productData);

  let thumbnailSlider = {
    infinite: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });

  }, []);


  // const currentVariation = productState?.selectedVariation?.variation_galleries?.length 
  //   ? productState?.selectedVariation?.variation_galleries 
  //   : productState?.product?.product_galleries;
  // const currentVariation = [
  //   { original_url:productData[0]?.imgurl, name: "Image 1" },
  //   { original_url:productData[0]?.imgurl, name: "Image 2" },
  //   { original_url:productData[0]?.imgurl, name: "Image 3" },
  // ];
  // const currentVariation = [

  //   { original_url: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/29551132/2024/8/29/857fe874-6f5f-41b4-9599-9b9f260c78f01724933728460-Sangria-Women-Geometric-Kurta-6721724933727323-1.jpg", name: "Image 2" },
  //   { original_url: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/29551132/2024/8/29/857fe874-6f5f-41b4-9599-9b9f260c78f01724933728460-Sangria-Women-Geometric-Kurta-6721724933727323-1.jpg", name: "Image 2" },
  //   { original_url: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/29551132/2024/8/29/857fe874-6f5f-41b4-9599-9b9f260c78f01724933728460-Sangria-Women-Geometric-Kurta-6721724933727323-1.jpg", name: "Image 3" },
  // ];
  
  useEffect(() => {
    var index = productState?.product?.product_galleries?.findIndex((object) => {
      return object.id === productState?.selectedVariation.variation_image?.id;
    });
    if (productState?.selectedVariation.variation_image?.id) {
      slider1.current.slickGoTo(index);
    }
  }, [productState?.selectedVariation.variation_image?.id, productState]);

  return (
    <div className="sticky-top-custom">
      <div className="thumbnail-image-slider">
        <Row className="g-sm-4 g-3">
          <Col xs={12}>
            <div className={`product-slick position-relative main-product-box ${!productData?.length ? "no-arrow" : ""}`}>
              {productState?.product?.is_sale_enable || productState?.product?.is_trending || productState?.product?.is_featured ? (
                <ul className="product-detail-label">
                  {productState?.product.is_sale_enable ? <li className="soldout">{t("Sale")}</li> : ""}
                  {productState?.product.is_trending ? <li className="trending">{t("Trending")}</li> : ""}
                  {productState?.product.is_featured ? <li className="featured">{t("Featured")}</li> : ""}
                </ul>
              ) : null}

              <Slider   asNavFor={nav2} ref={slider1} prevArrow={<RiArrowLeftSLine />} nextArrow={<RiArrowRightSLine />}>
                {productData?.map((image, i) => (
                  <div key={i}>
                    <div className="slider-image">
                      <ImageZoom src={image?.original_url} alt={image?.name} zoom="200" className="img-fluid" height={670} width={670} />
                    </div>
                  </div>
                ))}
              </Slider>
              {!productData?.length && (
                <img 
                  src={productState?.product?.product_thumbnail ? productState?.product?.product_thumbnail?.original_url : placeHolderImage} 
                  className="img-fluid h-100" 
                  alt={productState?.product?.name} 
                />
              )}

              {/* {productState?.product?.product_type == "digital" && <DigitalImageOptions product={productState?.product} />} */}
            </div>
          </Col>
          
          <Col xs={12}>
      <Slider
      adaptiveHeight={true}
        {...thumbnailSlider}
        className="slider-nav no-arrow thumbnail-slider-box"
        asNavFor={nav1}
        ref={slider2}
        slidesToShow={3}
      >
        {productData?.map((image, i) => (
          <div key={i} className="slider-image">
            <Image
              src={image?.original_url || placeHolderImage}
              alt={image?.name || "Placeholder"}
              className="img-fluid"
              height={130}
              width={130}
            />
          </div>
        ))}
      </Slider>
    </Col>
        </Row>
      </div>
    </div>
  );
};

export default ThumbnailProductImage;
