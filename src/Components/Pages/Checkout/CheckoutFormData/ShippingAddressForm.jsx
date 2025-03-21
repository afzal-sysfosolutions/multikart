import SimpleInputField from "@/Components/Widgets/InputFields/SimpleInputField";
import { AllCountryCode } from "@/Data/CountryCode";
import { Field } from 'formik';
import SearchableSelectInput from "@/Utils/CommonComponents/InputFields/SearchableSelectInput";
import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";
import AccountContext from "@/Context/AccountContext";
import { useCommonService } from "@/Utils/Services/Common";
import React, { useContext, useEffect, useState } from "react";

const ShippingAddressForm = (props) => {
  const { t } = useTranslation("common");
  const {setFieldValue} = props
  const {countryList} = useContext(AccountContext);
  const [openCountrylist, setopenCountrylist] = useState(false)
  console.log(countryList);
    const list = [{name:'india'}, {name:'aus'}]
  return (
    <div className="checkbox-main-box">
      <div className="checkout-title1">
        <h2>{t("ShippingDetails")}</h2>
      </div>
      {/* <Row className="checkout-form g-md-4 g-sm-3 g-2">
        <SimpleInputField
          nameList={[
            { name: "shipping_address.title", placeholder: t("EnterTitle"), toplabel: "Title", colprops: { xs: 12 }, require: "true" },
            { name: "shipping_address.street", placeholder: t("EnterAddress"), toplabel: "Address", colprops: { xs: 12 }, require: "true" },
          ]}
        />
        <SearchableSelectInput
          nameList={[
            {
              name: "shipping_address.country_id",
              require: "true",
              title: "Country",
              toplabel: "Country",
              colprops: { xxl: 6, lg: 12, sm: 6 },
              inputprops: {
                name: "shipping_address.country_code",
                id: "shipping_address.country_code",
                options: CountryName,
                defaultOption: "Select state",
              },
            },

            {
              name: "shipping_address.state_id",
              require: "true",
              title: "State",
              toplabel: "State",
              colprops: { xxl: 6, lg: 12, sm: 6 },
              inputprops: {
                name: "shipping_address.state_id",
                id: "shipping_address.state_id",
                options: values?.shipping_address?.country_id ? data?.filter((country) => Number(country.id) === Number(values?.shipping_address?.country_id))?.[0]?.["state"] : [],
                defaultOption: "Select state",
              },
              disabled: values?.["shipping_address.country_id"] ? false : true,
            },
          ]}
        />
        <SimpleInputField
          nameList={[
            { name: "shipping_address.city", placeholder: t("EnterCity"), toplabel: "City", colprops: { md: 6 }, require: "true" },
            { name: "shipping_address.pincode", placeholder: t("EnterPincode"), toplabel: "Pincode", colprops: { md: 6 }, require: "true" },
          ]}
        />
         <Col xs={12} className="phone-field">
          <div className="form-box position-relative">
            <div className="country-input">
              <SimpleInputField nameList={[{ name: "shipping_address.phone", type: "number", placeholder: t("EnterPhoneNumber"), require: "true", toplabel: "Phone", colprops: { xs: 12 }, colclass: "country-input-box" }]} />
              <SearchableSelectInput
                nameList={[
                  {
                    name: "shipping_address.country_code",
                    notitle: "true",
                    inputprops: {
                      name: "shipping_address.country_code",
                      id: "shipping_address.country_code",
                      options: AllCountryCode,
                    },
                  },
                ]}
              />
            </div>
          </div>
        </Col>
      </Row> */}
      <Row className="checkout-form g-md-4 g-sm-3 g-2">
        <Col md="12">
          <div className="form-box">
          <label for="Title" class="form-label">Title <span class="theme-color required-dot">*</span></label>
          <Field className="form-control" id="shipping_address.title" name="shipping_address.title" placeholder="Enter Title" require="true"/>
          </div>
        </Col>
        <Col md="12">
        <div className="form-box">
          <label for="Addrss" class="form-label">Address<span class="theme-color required-dot">*</span></label>
          <Field className="form-control" id="shipping_address.street" name="shipping_address.street" placeholder="Enter Address" require="true"/>
          </div>
        </Col>
        <Col md="12" className="custom-box">
        <div className="custom-select-box cursor-pointer">
          <Field className="form-control cursor form-select form-control" name="shipping_address.country_code" value='Select'  readOnly   require="true" onClick={()=> setopenCountrylist(!openCountrylist)}/>
          {/* <option>Select</option> */}
          <div className={`${openCountrylist ? 'open' : ''} box-content custom-select`}>
          <input class="form-control form-control" type="text" value=""/>
            <ul className="intl-tel-input">
              {countryList.map((itm, idx)=> (
                <li key={idx} onClick={()=> { setFieldValue('shipping_address.country_code', itm?.CountryName); setopenCountrylist(!openCountrylist)}}>{itm?.CountryName}</li>
              ))}
            </ul>
            {/* {countryList.map((itm, idx)=> (
              <option key={idx}>{itm?.CountryName}</option>
            ))} */}
          </div>
        
          </div>
        </Col>
        <Col md="12" className="custom-box">
        <div className="custom-select-box cursor-pointer">
          <Field as="select" className="form-control form-select form-control" name="shipping_address.state_id"  require="true" readonly value="Select">
            <option>Select</option>
          </Field>
          </div>
        </Col>
        <Col md="6">
          <Col className="form-box">
          <label for="City" class="form-label">City <span class="theme-color required-dot">*</span></label>
            <Field type="text" id="shipping_address.city" className="form-control" name="shipping_address.city" placeholder="Enter City" toplabel="City"/>
          </Col>
        </Col>
        <Col md="6">
          <Col className="form-box">
          <label for="Pincode" class="form-label">Pincode  <span class="theme-color required-dot">*</span></label>
            <Field type="text" id="shipping_address.Pincode" className="form-control" name="shipping_address.Pincode" placeholder="Enter Pincode " toplabel="Pincode"/>
          </Col>
        </Col>
        <Col xs={12} className="phone-field">
          <div className="form-box position-relative">
            <div className="country-input">
              <SimpleInputField nameList={[{ name: "shipping_address.phone", type: "number", placeholder: t("Enter Phone Number"), require: "true", toplabel: "Phone", colprops: { xs: 12 }, colclass: "country-input-box" }]} />
              <SearchableSelectInput
                nameList={[
                  {
                    name: "shipping_address.country_code",
                    notitle: "true",
                    inputprops: {
                      name: "shipping_address.country_code",
                      id: "shipping_address.country_code",
                      options: AllCountryCode,
                    },
                  },
                ]}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ShippingAddressForm;
