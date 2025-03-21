"use client";
import ImageLink from "@/Components/Widgets/ImageLink";
import WrapperComponent from "@/Components/Widgets/WrapperComponent";
import Cookies from "js-cookie";
import Image from "next/image";
import BlogIdsContext from "@/Context/BlogIdsContext";
import { Href, storageURL } from "@/Utils/Constants";
import Link from "next/link";
import BrandIdsContext from "@/Context/BrandIdsContext";
import ProductIdsContext from "@/Context/ProductIdsContext";
import { horizontalProductSlider } from "@/Data/SliderSetting";
import Loader from "@/Layout/Loader";
import { ImagePath } from "@/Utils/Constants";
import useCustomDataQuery from "@/Utils/Hooks/useCustomDataQuery";
import { useSkeletonLoader2 } from "@/Utils/Hooks/useSkeleton2";
import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import HomeBlog from "../../Widgets/HomeBlog";
import HomeBrand from "../../Widgets/HomeBrand";
import HomeProduct from "../../Widgets/HomeProduct";
import HomeProductTab from "../../Widgets/HomeProductTab";
import HomeServices from "../../Widgets/HomeService";
import HomeSlider from "../../Widgets/HomeSlider";
import HomeSocialMedia from "../../Widgets/HomeSocialMedia";
import HomeTitle from "../../Widgets/HomeTitle";
import {dashboardData} from '../../../../Data/Pages/Dashboard/dashboard'
import { useCommonService } from "@/Utils/Services/Common";
import { useTypeProduct } from "@/Utils/Services/TypeProduct";

const Fashion1 = () => {
  const { setGetBrandIds, isLoading: brandLoading } = useContext(BrandIdsContext);
  const { setGetBlogIds, isLoading: blogLoading } = useContext(BlogIdsContext);

  useEffect(() => {
    if (dashboardData?.content?.brands?.brand_ids?.length > 0) {
      setGetBrandIds({ ids: Array.from(new Set(dashboardData?.content?.brands?.brand_ids))?.join(",") });
    }
  }, [dashboardData?.content]);

 
  useEffect(() => {
    document.body.classList.add("home");
    return () => {
      document.body.classList.remove("home");
    };
   
  }, []);

  // useSkeletonLoader2([productLoad, blogLoading, brandLoading]);
  // if (isLoading && document.body) return <Loader />;

  return (
    <>
      {/* Home Banner */}
      <WrapperComponent classes={{ sectionClass: "p-0 overflow-hidden position-relative", fluidClass: "slide-1 home-slider" }}>
        <HomeSlider height={650} width={1920} />
      </WrapperComponent>

      {/* Offer Banners */}
      <WrapperComponent classes={{ sectionClass: "pb-0 ratio2_1 banner-section", fluidClass: "container" }}>
        <Row className="g-sm-4 g-3">
            <div className={dashboardData?.content?.offer_banner?.banner_1?.status ? "col-6" : "col-12"}>
              <div className="position-relative">
                <Link className="h-100" href={'category/men?category=1003'}>
                <Image className="bg-img w-100 img-fluid" src={dashboardData?.content?.offer_banner?.banner_1?.image_url} height={338} width={676} /> 
                </Link>
                {/* <ImageLink imgUrl={dashboardData?.content?.offer_banner?.banner_1?.image_url} placeholder={`${ImagePath}/two_column_banner.png`} height={338} width={676} /> */}
                <div className="banner-skeleton">
                  <div className="skeleton-content">
                    <p className="card-text placeholder-glow row g-lg-3 g-0">
                      <span className="col-lg-7 col-9">
                        <span className="placeholder"></span>
                      </span>
                      <span className="col-lg-9 col-12">
                        <span className="placeholder"></span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={dashboardData?.content?.offer_banner?.banner_2?.status ? "col-6" : "col-12"}>
              <div className="position-relative">
              <Link className="h-100" href={'category/men?category=1002'}>
              <Image className="bg-img w-100 img-fluid" src={dashboardData?.content?.offer_banner?.banner_2?.image_url} height={338} width={676} /> 
              </Link>
                {/* <ImageLink imgUrl={dashboardData?.content?.offer_banner?.banner_2} placeholder={`${ImagePath}/two_column_banner.png`} height={338} width={676} /> */}
                <div className="banner-skeleton">
                  <div className="skeleton-content">
                    <p className="card-text placeholder-glow row g-lg-3 g-0">
                      <span className="col-lg-7 col-9">
                        <span className="placeholder"></span>
                      </span>
                      <span className="col-lg-9 col-12">
                        <span className="placeholder"></span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </Row>
      </WrapperComponent>

      {/* Products Slider */}
      {dashboardData?.content?.products_list?.status && (
        <>
          <HomeTitle title={dashboardData?.content?.products_list} type="basic" />
          <WrapperComponent classes={{ sectionClass: "section-b-space pt-0", fluidClass: "container" }}>
            <div className="product-4 no-arrow">
              <HomeProduct slider={true} style="vertical" productIds={dashboardData?.content?.products_list?.product_ids || []} sliderOptions={horizontalProductSlider} />
            </div>
          </WrapperComponent>
        </>
      )}

      {/* Full Banner */}
      {dashboardData?.content?.banner?.status && (
        <WrapperComponent classes={{ sectionClass: "p-0 banner-sale overflow-hidden" }} noRowCol={true}>
          <ImageLink imgUrl={dashboardData?.content?.banner} placeholder={`${ImagePath}/full_column_banner.png`} height={587} width={1905} />
        </WrapperComponent>
      )}

      {/* Product Categories */}
      {dashboardData?.content?.category_product?.status && (
        <>
          <HomeTitle title={dashboardData?.content?.category_product} type="basic" />
          <WrapperComponent classes={{ sectionClass: "section-b-space category-tab-section pt-0", fluidClass: "container" }}>
            <HomeProductTab categoryIds={dashboardData?.content?.category_product?.category_ids} style="vertical" />
          </WrapperComponent>
        </>
      )}

      {/* Services */}
      {dashboardData?.content?.services && (
        <Container>
          <WrapperComponent classes={{ sectionClass: "service border-section small-section" }} noRowCol={true}>
            <HomeServices services={dashboardData?.content?.services?.banners || []} />
          </WrapperComponent>
        </Container>
      )}

      {/* Featured Blogs */}
      {dashboardData?.content?.featured_blogs?.status && (
        <>
          <Container>
            <HomeTitle title={dashboardData?.content?.featured_blogs} type="basic" />
          </Container>
          <WrapperComponent classes={{ sectionClass: "blog pt-0 ratio2_3", fluidClass: "container" }}>
            <HomeBlog blogIds={dashboardData?.content?.featured_blogs?.blog_ids || []} />
          </WrapperComponent>
        </>
      )}

      {/* Social Media */}
      {dashboardData?.content?.social_media?.banners?.length && dashboardData?.content?.social_media?.status && (
        <section className="instagram ratio_square overflow-hidden">
          <HomeSocialMedia media={dashboardData?.content?.social_media || []} classes="container-fluid" type="borderless" />
        </section>
      )}

      {/* Brands */}
      {dashboardData?.content?.brand?.status && (
        <section className="section-b-space">
          <HomeBrand brandIds={dashboardData?.content?.brand?.brand_ids || []} />
        </section>
      )}
    </>
  );
};

export default Fashion1;
