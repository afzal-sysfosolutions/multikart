import request from "@/Utils/AxiosUtils";
import { BrandLogo } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {BrandData} from "../../Data/Brand/Brand"
import { useEffect, useState } from "react";
import BrandIdsContext from ".";

const BrandIdsProvider = (props) => {
  const router = useRouter();
  const [getBrandIds, setGetBrandIds] = useState({});
  const [filteredBrand, setFilteredBrand] = useState([]);
  // const { data, refetch, isLoading } = useQuery([BrandLogo, getBrandIds?.ids], () => request({ url: BrandLogo, params: { ...getBrandIds, status: 1 } }, router), {
  //   enabled: false,
  //   refetchOnWindowFocus: false,
  //   select: (data) => data.data.data,
  // });

  useEffect(() => {
    Object.keys(getBrandIds).length > 0 && refetch();
  }, []);

  useEffect(() => {
    if (BrandData?.data) {
      setFilteredBrand((prev) => BrandData?.data);
    }
  }, []);

  return <BrandIdsContext.Provider value={{ ...props, filteredBrand, setGetBrandIds }}>{props.children}</BrandIdsContext.Provider>;
};

export default BrandIdsProvider;
