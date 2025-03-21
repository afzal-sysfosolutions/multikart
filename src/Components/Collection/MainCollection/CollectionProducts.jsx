import NoDataFound from "@/Components/Widgets/NoDataFound";
import Pagination from "@/Components/Widgets/Pagination";
import ProductBox from "@/Components/Widgets/ProductBox";
import ProductBox11 from "@/Components/Widgets/ProductBox/ProductBox11";
import ProductSkeleton from "@/Components/Widgets/SkeletonLoader/ProductSkeleton";
import NotFoundPage from "@/Components/Pages/404";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Link from 'next/link';
import request from "@/Utils/AxiosUtils";
import { ProductAPI } from "@/Utils/AxiosUtils/API";
import { ImagePath } from "@/Utils/Constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";
import ListProductBox from "./ListProductBox";

const CollectionProducts = ({callApi, filter, grid, infiniteScroll, categorySlug, products }) => {
  const { themeOption, setPaginationDetails } = useContext(ThemeOptionContext);
  const { slug } = useParams();
  const [page, setPage] = useState(1);
  const [adjustGrid, setAdjustGrid] = useState("col-6 col-lg-4");
  const { t } = useTranslation("common");
  const [infiniteScrollData, setInfiniteScrollData] = useState([]);
  const param = useSearchParams();
  const tagParam = param.get("tag");
  const router = useRouter();
  
  
  // const fetchData = async () => {
  //   return request({
  //     url: ProductAPI,
  //     params: {
  //       page,
  //       status: 1,
  //       paginate: filter?.paginate ?? filter?.paginate,
  //       field: filter?.field ?? "created_at",
  //       price: filter?.price.join(",") ?? "",
  //       category: categorySlug ? categorySlug : filter?.category.join(",") || tagParam,
  //       brand: filter.brand.join(","),
  //       sort: "",
  //       sortBy: filter?.sortBy ?? "asc",
  //       rating: filter?.rating.join(",") ?? "",
  //       attribute: filter?.attribute.join(",") ?? "",
  //       store_slug: slug ? slug : null,
  //       created_at: filter?.created_at ?? "",
  //     },
  //   });
  // };
  
  // const { data, fetchNextPage, isRefetching, isLoading, fetchStatus, refetch } = useInfiniteQuery({
  //   queryKey: ["infiniteScroll", filter],
  //   queryFn: fetchData,
  //   retryOnMount: false,
  //   enabled: false,
  //   getNextPageParam: ({ page, last_page }) => last_page > page && { page: page + 1 },
  // });

  const onLoad = () => {
    if (!isLoading && data?.pages?.[data?.pages?.length - 1]?.data?.data?.last_page !== infiniteScrollData.length) {
      setPage(page + 1);
    }
  };


  useEffect(() => {
    if (grid == 2) {
      setAdjustGrid("col-6");
    } else if (grid == 3) {
      setAdjustGrid("col-xl-4 col-lg-6 col-md-4 col-6");
    } else if (grid == 4) {
      setAdjustGrid("col-xxl-3 col-xl-4 col-lg-6 col-md-4 col-6");
    } else if (grid == "list") {
      setAdjustGrid("col-6 col-sm-12");
    }
  }, [grid]);


  const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100) + "%";
  };


  return (

    <Suspense fallback={<div>Loading...</div>}>
      <Col className="product-wrapper-grid">
      {callApi ? <Row className="g-xl-4 g-lg-3 g-sm-4 g-3">
     {new Array(12).fill(null).map((_, i) => (
    <Col className={adjustGrid} key={i}>
    <ProductSkeleton />
    </Col>
      ))}
        </Row> :products.length === 0 ?  <Row className="abc g-xl-4 g-lg-3 g-sm-4 g-3">
          <NotFoundPage Disable={true}/>
        </Row> : 
        <Row className="abc-2 g-xl-4 g-lg-3 g-sm-4 g-3 row">
          {products && products.map((itm, i)=> <div className={adjustGrid} key={i}>
            <div className="basic-product theme-product-1 ">
              <div className="overflow-hidden">
                <div className="img-wrapper">
                  <div className="ribbon sale-tag">
                    <span>sale</span>
                  </div>
                  <Link href={`/product/${itm?.ProductName.replaceAll(" ", "-")}/${itm?.ProductId}/${itm?.ProductVariantDetailId}`}>
                    <img
                      src={process.env.NEXT_PUBLIC_PRODUCT_IMG + itm?.ProductImage ||  "/assets/images/placeholder/product.png"}
                      className="img-fluid bg-img"
                      alt="Tan Cargo Shorts"
                    />
                  </Link>
                  <div className="rating-label">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17Z"></path>
                    </svg>
                    <span>{itm?.Ratings}</span>
                  </div>
                  <div className="cart-info">
                    <a
                      href="javascript:void(0)"
                      title="Add to Wishlist"
                      className="wishlist-icon "
                    >
                      <i className="ri-heart-line"></i>
                    </a>
                    <button
                      type="button"
                      id="add-to-cart'+10"
                      className="btn btn-transparent"
                    >
                      <i className="ri-shopping-cart-line"></i>
                      <span> </span>
                    </button>
                    <ul className="hover-action">
                      <li className="" title="View">
                        <a>
                          <i className="ri-search-line"></i>
                        </a>
                      </li>
                      <li title="Compare">
                        <a>
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"></path>
                          </svg>{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product-detail">
                  <div>
                    <div className="brand-w-color">
                      <a className="product-title" href="/brand/urban-chic">
                        {itm?.ProductName}
                      </a>
                      <div className="color-panel"></div>
                    </div>
                    {/* <a href="/product/tan-cargo-shorts">
                      <h6>Tan Cargo Shorts</h6>
                    </a> */}
                    <h4 className="price">
                    ₹{itm?.ProductPrice} <del>₹{itm?.UsualPrice}</del>
                      <span className="discounted-price">{calculateDiscountPercentage(itm?.UsualPrice, itm?.ProductPrice)} Off</span>
                    </h4>
                  </div>
                  <ul className="offer-panel">
                    <li>
                      <span className="offer-icon">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 24 24"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M13.9461 2.09411C12.8248 1.13855 11.1756 1.13856 10.0544 2.0941L8.70636 3.24286C8.54619 3.37935 8.34705 3.46183 8.13728 3.47857L6.3718 3.61946C4.90327 3.73665 3.73714 4.90278 3.61995 6.3713L3.47907 8.13678C3.46234 8.34654 3.37983 8.54573 3.24334 8.70589L2.09458 10.0539C1.13904 11.1752 1.13905 12.8243 2.0946 13.9455L3.24336 15.2936C3.37983 15.4538 3.46232 15.6529 3.47906 15.8627L3.61997 17.6281C3.73716 19.0966 4.9033 20.2627 6.37184 20.3799L8.13729 20.5209C8.34705 20.5376 8.54615 20.6201 8.70631 20.7566L10.0543 21.9053C11.1756 22.8608 12.8248 22.8609 13.9461 21.9053L15.2941 20.7566C15.4542 20.6201 15.6533 20.5376 15.8631 20.5208L17.6286 20.3799C19.0971 20.2628 20.2632 19.0967 20.3805 17.6281L20.5213 15.8627C20.538 15.6529 20.6206 15.4537 20.757 15.2935L21.9058 13.9456C22.8614 12.8243 22.8614 11.1751 21.9058 10.0539L20.757 8.70585C20.6205 8.54568 20.5381 8.34654 20.5214 8.13679L20.3805 6.37131C20.2633 4.9028 19.0971 3.73663 17.6286 3.61945L15.8631 3.47856C15.6533 3.46182 15.4542 3.37935 15.2941 3.24286L13.9461 2.09411ZM14.8284 7.75718L16.2426 9.1714L9.17151 16.2425L7.7573 14.8282L14.8284 7.75718ZM10.2322 10.232C9.64638 10.8178 8.69664 10.8178 8.11085 10.232C7.52506 9.6463 7.52506 8.69652 8.11085 8.11073C8.69664 7.52494 9.64638 7.52494 10.2322 8.11073C10.818 8.69652 10.818 9.6463 10.2322 10.232ZM13.7677 15.8889C13.1819 15.3031 13.1819 14.3534 13.7677 13.7676C14.3535 13.1818 15.3032 13.1818 15.889 13.7676C16.4748 14.3534 16.4748 15.3031 15.889 15.8889C15.3032 16.4747 14.3535 16.4747 13.7677 15.8889Z"></path>
                        </svg>
                      </span>{" "}
                      Limited Time Offer: 18% off
                    </li>
                    <li>
                      <span className="offer-icon">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 24 24"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M13.9461 2.09411C12.8248 1.13855 11.1756 1.13856 10.0544 2.0941L8.70636 3.24286C8.54619 3.37935 8.34705 3.46183 8.13728 3.47857L6.3718 3.61946C4.90327 3.73665 3.73714 4.90278 3.61995 6.3713L3.47907 8.13678C3.46234 8.34654 3.37983 8.54573 3.24334 8.70589L2.09458 10.0539C1.13904 11.1752 1.13905 12.8243 2.0946 13.9455L3.24336 15.2936C3.37983 15.4538 3.46232 15.6529 3.47906 15.8627L3.61997 17.6281C3.73716 19.0966 4.9033 20.2627 6.37184 20.3799L8.13729 20.5209C8.34705 20.5376 8.54615 20.6201 8.70631 20.7566L10.0543 21.9053C11.1756 22.8608 12.8248 22.8609 13.9461 21.9053L15.2941 20.7566C15.4542 20.6201 15.6533 20.5376 15.8631 20.5208L17.6286 20.3799C19.0971 20.2628 20.2632 19.0967 20.3805 17.6281L20.5213 15.8627C20.538 15.6529 20.6206 15.4537 20.757 15.2935L21.9058 13.9456C22.8614 12.8243 22.8614 11.1751 21.9058 10.0539L20.757 8.70585C20.6205 8.54568 20.5381 8.34654 20.5214 8.13679L20.3805 6.37131C20.2633 4.9028 19.0971 3.73663 17.6286 3.61945L15.8631 3.47856C15.6533 3.46182 15.4542 3.37935 15.2941 3.24286L13.9461 2.09411ZM14.8284 7.75718L16.2426 9.1714L9.17151 16.2425L7.7573 14.8282L14.8284 7.75718ZM10.2322 10.232C9.64638 10.8178 8.69664 10.8178 8.11085 10.232C7.52506 9.6463 7.52506 8.69652 8.11085 8.11073C8.69664 7.52494 9.64638 7.52494 10.2322 8.11073C10.818 8.69652 10.818 9.6463 10.2322 10.232ZM13.7677 15.8889C13.1819 15.3031 13.1819 14.3534 13.7677 13.7676C14.3535 13.1818 15.3032 13.1818 15.889 13.7676C16.4748 14.3534 16.4748 15.3031 15.889 15.8889C15.3032 16.4747 14.3535 16.4747 13.7677 15.8889Z"></path>
                        </svg>
                      </span>{" "}
                      Limited Time Offer: 18% off
                    </li>
                    <li>
                      <span className="offer-icon">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 24 24"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M13.9461 2.09411C12.8248 1.13855 11.1756 1.13856 10.0544 2.0941L8.70636 3.24286C8.54619 3.37935 8.34705 3.46183 8.13728 3.47857L6.3718 3.61946C4.90327 3.73665 3.73714 4.90278 3.61995 6.3713L3.47907 8.13678C3.46234 8.34654 3.37983 8.54573 3.24334 8.70589L2.09458 10.0539C1.13904 11.1752 1.13905 12.8243 2.0946 13.9455L3.24336 15.2936C3.37983 15.4538 3.46232 15.6529 3.47906 15.8627L3.61997 17.6281C3.73716 19.0966 4.9033 20.2627 6.37184 20.3799L8.13729 20.5209C8.34705 20.5376 8.54615 20.6201 8.70631 20.7566L10.0543 21.9053C11.1756 22.8608 12.8248 22.8609 13.9461 21.9053L15.2941 20.7566C15.4542 20.6201 15.6533 20.5376 15.8631 20.5208L17.6286 20.3799C19.0971 20.2628 20.2632 19.0967 20.3805 17.6281L20.5213 15.8627C20.538 15.6529 20.6206 15.4537 20.757 15.2935L21.9058 13.9456C22.8614 12.8243 22.8614 11.1751 21.9058 10.0539L20.757 8.70585C20.6205 8.54568 20.5381 8.34654 20.5214 8.13679L20.3805 6.37131C20.2633 4.9028 19.0971 3.73663 17.6286 3.61945L15.8631 3.47856C15.6533 3.46182 15.4542 3.37935 15.2941 3.24286L13.9461 2.09411ZM14.8284 7.75718L16.2426 9.1714L9.17151 16.2425L7.7573 14.8282L14.8284 7.75718ZM10.2322 10.232C9.64638 10.8178 8.69664 10.8178 8.11085 10.232C7.52506 9.6463 7.52506 8.69652 8.11085 8.11073C8.69664 7.52494 9.64638 7.52494 10.2322 8.11073C10.818 8.69652 10.818 9.6463 10.2322 10.232ZM13.7677 15.8889C13.1819 15.3031 13.1819 14.3534 13.7677 13.7676C14.3535 13.1818 15.3032 13.1818 15.889 13.7676C16.4748 14.3534 16.4748 15.3031 15.889 15.8889C15.3032 16.4747 14.3535 16.4747 13.7677 15.8889Z"></path>
                        </svg>
                      </span>{" "}
                      Limited Time Offer: 18% off
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>)}
        </Row>}
       
      </Col>
    </Suspense>
  );
};

export default CollectionProducts;
