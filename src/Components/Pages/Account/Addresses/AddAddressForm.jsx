import { YupObject, nameSchema, phoneSchema } from "@/Utils/Validation/ValidationSchema";
import { ToastNotification } from "@/Utils/CustomFunctions/ToastNotification";
import { Formik } from "formik";
import {AddressValues} from '@/Utils/Validation/FormInitialValues'
import { useTranslation } from "react-i18next";
import SelectForm from "./SelectForm";
import { useContext, useEffect, useState } from "react";
import { useCommonService } from "@/Utils/Services/Common";
import AccountContext from "@/Context/AccountContext";

const AddAddressForm = ({editValues, mutate, addresscount, isLoading, type, editAddress, setEditAddress, modal, setModal, isFooterDisplay, method }) => {
  const [formValues, setFormValues] = useState(null);
  const [CountryList, setCountryList] =useState([]);
  const { accountData, refetch, fetchData, setrefetchData, clientId } = useContext(AccountContext);
  const [countryID, setcountryID] = useState('')
  const {ApiCalling} =useCommonService()
  useEffect(() => {
    if(modal !== "edit"){   
      setEditAddress('') 
    }
    FetchCountryState()
    // console.log(editAddress);

  }, [modal]);

  const FetchCountryState = async()=>{
    const OBJ ={
       Para:JSON.stringify({ActionMode:"GetCountry"}),
       procName: 'Country'
    }

    const res = await ApiCalling(OBJ);      
    setCountryList(res)
  } 

  const HandleSubmit = async(values)=>{
    // console.log(values);
    const OBJ= {
      Para:JSON.stringify({ClientId:clientId, ClientType:'', FullName:values?.title, MobileNo:values?.phone, AddressType:'', FlatHouseBuildingNo:values?.street, Locality:'', Pincode:values?.pincode, LandMark:'', CountryId:values?.country_id, StateId:values?.state_id,  CityId:'', CityName:values?.city, AddressId:addresscount > 0 ? editAddress?.AddressId : 0, Type:addresscount > 0 ? 'Shipping' : 'Billing', IsShipping:addresscount > 0 ? 'N' : 'Y', ActionMode:modal !== "edit" ? 'Insert' : 'Update'}),
      procName:'DeliveryAddress'
    }
   try {
    const result = await ApiCalling(OBJ)
    if(result[0]?.StatusCode === "1"){
      ToastNotification('success', result[0]?.Msg)
      setEditAddress('')
      setrefetchData(!fetchData)
    }
    setModal(false);
   } catch (error) {
    ToastNotification('success', error)
   }
  }
  

  const { t } = useTranslation("common");
  return (
    <Formik
      initialValues={{
          title: editAddress ? editAddress?.FullName : "",
          street: editAddress ? editAddress?.FlatHouseBuildingNo : "",
          country_id: editAddress ? editAddress?.CountryId : "",
          state_id: editAddress ? editAddress?.StateId : "",
          city: editAddress ? editAddress?.CityName : "",
          pincode: editAddress ? editAddress?.Pincode : "",
          phone: editAddress ? editAddress?.MobileNo : "",
          type: type ? type : null,
          country_code: editAddress ? "91" : "91",
        }}

      validationSchema={YupObject({
        title: nameSchema,
        street: nameSchema,
        city: nameSchema,
        country_id: nameSchema,
        state_id: nameSchema,
        pincode: nameSchema,
        phone: phoneSchema,
      })}
      onSubmit={(values) => {
       HandleSubmit(values)
        // Put your logic here
       
      }}
    >
      {({ values, setFieldValue }) => 
      <SelectForm values={values} setFieldValue={setFieldValue} setModal={setModal} isLoading={isLoading} CountryList={CountryList} isFooterDisplay={isFooterDisplay} />
      }
    </Formik>
  );
};

export default AddAddressForm;
