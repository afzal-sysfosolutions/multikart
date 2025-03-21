import CategoryContext from "@/Context/CategoryContext";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Loader from "@/Layout/Loader";
import Breadcrumbs from "@/Utils/CommonComponents/Breadcrumb";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { useContext, useEffect, useState } from "react";
import CollectionLeftSidebar from "../Collection/CollectionLeftSidebar";

const CategoryMainPage = ({ slug }) => {
  const [brand, attribute, price, rating, sortBy, field, layout, page] = useCustomSearchParams(["brand", "attribute", "price", "rating", "sortBy", "field", "layout", "page"]);
  // useEffect(() => {
  //   console.log(useCustomSearchParams);
    
  //   setFilter((prev) => {
  //     return {
  //       ...prev,
  //       page: page ? page?.page : 1,
  //       brand: brand ? brand?.brand?.split(",") : [],
  //       attribute: attribute ? attribute?.attribute?.split(",") : [],
  //       price: price ? price?.price?.split(",") : [],
  //       rating: rating ? rating?.rating?.split(",") : [],
  //       sortBy: sortBy ? sortBy?.sortBy : "asc",
  //       field: field ? field?.field : "created_at",
  //     };
  //   });
  // }, [brand, attribute, price, rating, sortBy, field, page]);

  // const { categoryIsLoading } = useContext(CategoryContext);
  // if (categoryIsLoading) return <Loader />;
  return (
    <>
      <Breadcrumbs title={`Category: ${slug}`} subNavigation={[{ name: slug }]} />
      <CollectionLeftSidebar  hideCategory categorySlug={slug} />
    </>
  );
};

export default CategoryMainPage;
