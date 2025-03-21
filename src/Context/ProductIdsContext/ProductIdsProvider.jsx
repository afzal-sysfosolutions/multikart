import request from "@/Utils/AxiosUtils";
import { ProductAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ProductIdsContext from ".";
import {ProductData} from '@/Data/Product/ProductData'
const ProductIdsProvider = (props) => {
  const [getProductIds, setGetProductIds] = useState({});
  const [filteredProduct, setFilteredProduct] = useState([]);
  // const { data, refetch, isLoading, isRefetching } = useQuery([ProductAPI, getProductIds?.ids], () => request({ url: ProductAPI, params: { ...getProductIds, status: 1, paginate: getProductIds?.ids?.length } }), {
  //   enabled: false,
  //   refetchOnWindowFocus: false,
  //   select: (data) => data?.data?.data,
  // });

  useEffect(() => {
    Object.keys(getProductIds).length > 0 && refetch();
  }, [getProductIds?.ids]);

  useEffect(() => {
   if(getProductIds){
    const Data = ProductData?.data?.filter((itm => itm.id === getProductIds))

    setFilteredProduct((prev) => Data);
   }
     
  
  }, [getProductIds]);

  return <ProductIdsContext.Provider value={{ ...props, filteredProduct, setGetProductIds }}>{props.children}</ProductIdsContext.Provider>;
};

export default ProductIdsProvider;
