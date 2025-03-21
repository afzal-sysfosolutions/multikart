import AccountContext from "@/Context/AccountContext";
import request from "@/Utils/AxiosUtils";
import { CountryAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AccountSection from "./CheckoutFormData/AccountSection";
import BillingAddressForm from "./CheckoutFormData/BillingAddressForm";
import DeliverySection from "./CheckoutFormData/DeliverySection";
import PaymentSection from "./CheckoutFormData/PaymentSection";
import ShippingAddressForm from "./CheckoutFormData/ShippingAddressForm";
import { useCommonService } from "@/Utils/Services/Common";
import { ErrorMessage, Field, Form, Formik } from "formik";


const CheckoutForm = ({ values, setFieldValue, errors }) => {
  const { accountData, refetch, countryList, setCountryList } = useContext(AccountContext);
  const { t } = useTranslation("common");
  const [address, setAddress] = useState([]);
  const {ApiCalling} = useCommonService()
  const router = useRouter();

  const FetchCountry = async()=>{
    const OBJ ={
       Para:JSON.stringify({ActionMode:"GetCountry"}),
       procName: 'Country'
    }
    const res = await ApiCalling(OBJ);    
    setCountryList(res)
  } 

  useEffect(() => {
    FetchCountry()
  }, []);

  

  return (
    <>
      {/* <AccountSection setFieldValue={setFieldValue} values={values} /> */}
      <ShippingAddressForm setFieldValue={setFieldValue} errors={errors}  values={values} />
      {/* <BillingAddressForm setFieldValue={setFieldValue} errors={errors} data={null} values={values} />
      <DeliverySection values={values} setFieldValue={setFieldValue} />
      <PaymentSection values={values} setFieldValue={setFieldValue} /> */}
    </>
  );
};

export default CheckoutForm;
