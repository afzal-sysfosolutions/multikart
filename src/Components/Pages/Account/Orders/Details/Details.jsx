import request from "@/Utils/AxiosUtils";
import { OrderAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import DetailStatus from "./DetailStatus";
import DetailTitle from "./DetailTitle";
import DetailsTable from "./DetailsTable";
import DetailsConsumer from "./DetailsConsumer";
import SubOrdersTable from "./SubOrdersTable";
import Loader from "@/Layout/Loader";
import { useEffect, useState } from "react";
import { useCommonService } from "@/Utils/Services/Common";

const Details = ({ params }) => {
  const [data, setdata] = useState([]);
  const [ShippingDetails, setShippingDetails] = useState([])
  const [isLoading, setisLoading] =useState(false)
  const {ApiCalling} = useCommonService()
  // const { data, isLoading, refetch } = useQuery([OrderAPI, params], () => request({ url: `${OrderAPI}/${params}` }), {
  //   enabled: !!(params),
  //   refetchOnWindowFocus: false,
  //   select: (res) => res?.data,
  // });

  const FetchOrderList = async()=>{
    const OBJ = {
      Para:JSON.stringify({OrderNumber:params, ActionMode:'ProductDetails'}),
      procName:'GetORderSuccessDetail'
    }
    const OBJ2 ={
      Para:JSON.stringify({OrderNumber:params, ActionMode:'ShippingDetails'}),
      procName:'GetORderSuccessDetail'
    }
    const result = await ApiCalling(OBJ);
    const result2 = await ApiCalling(OBJ2);
    if(result === "NoRecord"){
      setdata([])
    }else{
      setdata(result)
    }
    
    setShippingDetails(result2)
  }

useEffect(()=>{
  if(params){
    FetchOrderList()
  }
},[params])

  if (isLoading)
    return (
      <div className="box-loader">
        <Loader classes={"blur-bg"} />
      </div>
    );
  return (
    <>
      <DetailTitle params={params} data={data} />
      <DetailStatus data={data} />
      <DetailsTable data={data} />
      <DetailsConsumer data={ShippingDetails} orderamtData={data}/>
      {data?.sub_orders?.length ? <SubOrdersTable data={data?.sub_orders} /> : null}
    </>
  );
};

export default Details;
