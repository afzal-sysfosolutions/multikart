import SearchableSelectInput from "@/Components/Widgets/InputFields/SearchableSelectInput";
import SimpleInputField from "@/Components/Widgets/InputFields/SimpleInputField";
import { ToastNotification } from "@/Utils/CustomFunctions/ToastNotification";
import { AllCountryCode } from "@/Data/CountryCode";
import Btn from "@/Elements/Buttons/Btn";
import { useCommonService } from "@/Utils/Services/Common";
import { Form, Field } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, ModalFooter, Row } from "reactstrap";

const SelectForm = ({ values, isLoading, data, CountryList, setModal,setFieldValue, isFooterDisplay = true }) => {
  const [selectedCountry, setselectedCountry] = useState(null);
  const [stateList, setStateList] = useState([]);
  const {ApiCalling}= useCommonService()
  const { t } = useTranslation("common");

  const fetchStateList = async(ID)=>{
    const OBJ ={
      Para:JSON.stringify({CountryId:ID, ActionMode:"GetState"}),
      procName:'State'
    }
    const res = await ApiCalling(OBJ);
    // console.log(res);
    if(res==='NoRecord'){
      setStateList([])
    }else{
      setStateList(res)
    }
    
  }
  useEffect(()=>{
    // if(selectedCountry){
    //   fetchStateList()
    // }
    if(selectedCountry){
      fetchStateList(selectedCountry)
    }else if(values?.country_id){
      fetchStateList(values?.country_id)
      
    }
      

  }, [selectedCountry])
  return (
    <Form>
      <Row>
        <SimpleInputField
          nameList={[
            { name: "title", placeholder: t("Enter Full Name"), toplabel: "Full Name", colprops: { xs: 12 }, require: "true" },
            { name: "street", placeholder: t("Enter Address"), toplabel: "Address", colprops: { xs: 12 }, require: "true" },
          ]}
        />
        <Col xs="12" className="phone-field">
          <div className="country-input position-relative">
            <SimpleInputField nameList={[{ name: "phone", type: "number", placeholder: t("Enter Phone Number"), require: "true", toplabel: "Phone", colclass: "country-input-box" }]} />
            <div className="custom-select-box cursor-pointer">
                <Field as="select"  className="form-select cursor form-control" name="country_code">
                  {AllCountryCode.map((itm, idx)=> (<option key={idx} value={itm?.id}><span className='qa iti-flag'></span>{itm?.data?.code}</option>))}
                </Field>
            </div>
            {/* <SearchableSelectInput
              nameList={[
                {
                  name: "country_code",
                  notitle: "true",
                  inputprops: {
                    name: "country_code",
                    id: "country_code",
                    options: AllCountryCode,
                  },
                },
              ]}
            /> */}
          </div>
        </Col>
        <Col className="col-sm-6 col-lg-12 col-xxl-6">
              <div className="form-box">
              <label for="Country" className="form-label">Country <span className="theme-color required-dot">*</span></label>
                <div className="custom-select-box cursor-pointer">
                    <Field as="select" className="form-select cursor form-control"  name="country_id" onChange={(e)=> {setFieldValue("country_id", e.target.value); setselectedCountry(e.target.value) }}>
                      <option>Select</option>
                      {CountryList.map((itm, idx)=>(
                        <option value={itm?.CountryId} key={idx}>{itm?.CountryName}</option>
                      ))}  
                    </Field>
                </div>
              </div>
        </Col>
        <Col className="col-sm-6 col-lg-12 col-xxl-6">
          <div className="form-box">
          <label for="State" className="form-label">State <span className="theme-color required-dot">*</span></label>
          <div className="custom-select-box cursor-pointer">
            <Field as="select" className="form-select cursor form-control" name="state_id" onChange={(e)=> {setFieldValue("state_id", e.target.value);  }}>
                <option>Select</option>
                {stateList.length > 0 ?  stateList?.map((itm, idx)=>(
                  <option value={itm?.StateId} key={idx}>{itm?.StateName}</option>
                )) : null}
            </Field>
          </div>
          </div>
        </Col>
        {/* <SearchableSelectInput
          nameList={[
            {
              name: "country_id",
              require: "true",
              title: "Country",
              toplabel: "Country",
              colprops: { xxl: 6, lg: 12, sm: 6 },
              inputprops: {
                name: "country_id",
                id: "country_id",
                options: data,
                defaultOption: "Select state",
              },
            },
            {
              name: "state_id",
              require: "true",
              title: "State",
              toplabel: "State",
              colprops: { xxl: 6, lg: 12, sm: 6 },
              inputprops: {
                name: "state_id",
                id: "state_id",
                options: values?.["country_id"] ? data?.filter((country) => Number(country.id) === Number(values?.["country_id"]))?.[0]?.["state"] : [],
                defaultOption: "Select state",
              },
              disabled: values?.["country_id"] ? false : true,
            },
          ]}
        /> */}
        
        <SimpleInputField
          nameList={[
            { name: "city", placeholder: t("Enter City"), toplabel: "City", colprops: { xxl: 6, lg: 12, sm: 6 }, require: "true" },
            { name: "pincode", placeholder: t("Enter Pincode"), toplabel: "Pincode", colprops: { xxl: 6, lg: 12, sm: 6 }, require: "true" },
          ]}
        />

        <Col xs="12">
          {isFooterDisplay && (
            <ModalFooter className="ms-auto justify-content-end save-back-button mt-0">
              <Btn className="btn-md btn-outline fw-bold" color="transparent" onClick={() => setModal(false)}>
                {t("Cancel")}
              </Btn>
              <Btn className="btn-solid" type="submit" loading={Number(isLoading)}>
                {t("Submit")}
              </Btn>
            </ModalFooter>
          )}
        </Col>
      </Row>
    </Form>
  );
};

export default SelectForm;
