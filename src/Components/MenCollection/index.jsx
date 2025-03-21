"use client";
import CategoryContext from "@/Context/CategoryContext";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Loader from "@/Layout/Loader";
import Breadcrumbs from "@/Utils/CommonComponents/Breadcrumb";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { useContext, useEffect, useState } from "react";
import CollectionContainer from "./CollectionContainer";

const MenCollection = (props) => {
  const {pageTile} = props
  const [filter, setFilter] = useState({ category: [], brand: [], price: [], attribute: [],  rating: [], sortBy: "asc", field: "created_at", });

  const { themeOption } = useContext(ThemeOptionContext);
  const { categoryIsLoading } = useContext(CategoryContext);

  const [category, brand, attribute, price, rating, sortBy, field, paginate] =
    useCustomSearchParams([
      "category",
      "brand",
      "attribute",
      "price",
      "rating",
      "sortBy",
      "field",
      "paginate",
    ]);

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      paginate: paginate?.paginate || 12,
      category: category?.category?.split(",") || [],
      brand: brand?.brand?.split(",") || [],
      attribute: attribute?.attribute?.split(",") || [],
      price: price?.price?.split(",") || [],
      rating: rating?.rating?.split(",") || [],
      sortBy: sortBy?.sortBy || "asc",
      field: field?.field || "created_at",
    }));
  }, [category, brand, attribute, price, rating, sortBy, field, paginate]);

  return (
    <>
      {categoryIsLoading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumbs title="Collection" subNavigation={[{ name: pageTile }]} />
          <CollectionContainer filter={filter} setFilter={setFilter} />
        </>
      )}
    </>
  );
};

export default MenCollection;
