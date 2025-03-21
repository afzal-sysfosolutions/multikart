import SearchableSelectInput from "@/Components/Widgets/InputFields/SearchableSelectInput";
import { AllCountryCode } from "@/Data/CountryCode";
import Btn from "@/Elements/Buttons/Btn";
import useCreate from "@/Utils/Hooks/useCreate";
import { ToastNotification } from "@/Utils/CustomFunctions/ToastNotification";
import { useUserService } from "@/Utils/Services/authentication";
import { useCommonService } from "@/Utils/Services/Common";
import { YupObject, emailSchema, nameSchema, passwordConfirmationSchema, passwordSchema, phoneSchema, OTPSchema, Pincode } from "@/Utils/Validation/ValidationSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "reactstrap";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";

const RegisterForm = () => {
  const { themeOption, setOpenAuthModal, openAuthModal, mobileSideBar, setMobileSideBar, modalState, setmodalState, ModalData, setModalData  } = useContext(ThemeOptionContext);
  const [showBoxMessage, setShowBoxMessage] = useState();
  const [sendotp, setsendotp] = useState(false);
  const [isInvaildpincode, setisInvaildpincode] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0);
  const [userAddresss, setuserAddress] = useState([]);
  const {ApiCalling} = useCommonService();
  const {ChceckPinCode, userRegister} = useUserService();
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  // const { mutate, isLoading } = useCreate(RegisterAPI, false, false, "Register Successfully", false, false, false, false, setShowBoxMessage);
  const { t } = useTranslation("common");

// Get OTP 
const GenerateOTP = async (phoneno)=>{
  const  OBJ ={
    Para:JSON.stringify({MobileNo:phoneno, ActionMode:'SendMobileOTP'}),
    procName:'RegistrationMobileOTP'
  }
  const result  = await ApiCalling(OBJ);
  console.log(result[0]?.SecondsLeft);
  if(result[0]?.StatusCode === 1)
  setsendotp(true)
  setTimeLeft(result[0]?.SecondsLeft)
}

// Handling registration 
const HandleSubmit = async (values) => {  
  const OBJ ={
    CityName:userAddresss[0]?.PostOffice[1]?.Name,
    CountryName :userAddresss[0]?.PostOffice[0]?.Country,
    EmailId :values?.email,
    FirstName :values?.name,
    MobileNo : values?.phone,
    MobileOTP :values?.OTP,
    Pincode : values?.Pincode,
    StateName : userAddresss[0]?.PostOffice[0]?.State
  }
const Result = await userRegister(OBJ);
  if(Result[0]?.StatusCode === "1"){
    ToastNotification('success',  Result[0]?.Msg);
    setModalData(Result);
    setmodalState('successRegister')
  }else{
    ToastNotification('error', Result[0]?.Msg)
  }
}

// Set Coutdown
useEffect(() => {
  if (timeLeft <= 0){
    setsendotp(false)
    return; 
  } 
  if(sendotp === true){
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
  }, 1000);

  return () => clearTimeout(timer);  // Cleanup function
  }

}, [timeLeft]);

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

const CheckPincode  = async(code)=>{
  if(code.length < 6){
    setisInvaildpincode(false)
    return;
  }
 try {
   const result  = await  ChceckPinCode(code);
   if(Array.isArray(result)){
    setuserAddress(result)
    if(result[0]?.Status === "Error"){
      setisInvaildpincode(true)
    }else{
      setisInvaildpincode(false)
    }
   }
 } catch (error) {
  
 }
}


  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        country_code: "91",
        phone: "",
        OTP:'',
        Pincode:'',
      }}
      validationSchema={YupObject({
        name: nameSchema,
        email: emailSchema,
        phone: phoneSchema,
        OTP: OTPSchema,
        Pincode:Pincode
      })}
      onSubmit={(values, { setSubmitting }) => {
        HandleSubmit(values)
        setSubmitting(false);
      }}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form className="auth-form-box">
          {showBoxMessage && (
            <div role="alert" className="alert alert-danger login-alert">
              <i className="ri-error-warning-line"></i> {showBoxMessage}
            </div>
          )}
          <div className="auth-box mb-3 form-box">
            <label htmlFor="email">{t("FullName")}</label>
            <Field className="form-control" name="name" type="text" id="fname" placeholder={t("First Name")} required />
            {errors.name && touched.name && <ErrorMessage name="name" render={(msg) => <div className="invalid-feedback  d-block">{errors.name}</div>} />}
          </div>
          <div className="auth-box form-box mb-3">
            <label htmlFor="email">{t("Email")}</label>
            <Field className="form-control" name="email" type="text" id="email" placeholder={t("Email")} required />
            {errors.email && touched.email && <ErrorMessage name="email" render={(msg) => <div className="invalid-feedback d-block">{errors.email}</div>} />}
          </div>

          <div className="auth-box form-box mb-3 phone-field">
            <div className="form-box">
              <label htmlFor="phone">{t("Phone")}</label>
              <SearchableSelectInput nameList={[{ name: "country_code", notitle: "true", inputprops: { name: "country_code", id: "country_code", options: AllCountryCode, }, },]} />
              <Field className="form-control" name="phone" placeholder={t("Enter Phone Number")} type="number" />
              {errors.phone && touched?.phone && <ErrorMessage render={() => <div className="invalid-feedback">{errors.phone}</div>} />}
            </div>
          </div>
          <div className="auth-box mb-3 form-box">
            <label htmlFor="OTP">{t("OTP")}</label>
            <div className="position-relative">
            <Field className="form-control" name="OTP" type="text" id="OTP" placeholder={t("Enter OTP")} required />
            <Btn onClick={()=> !sendotp ?  GenerateOTP(values?.phone) : null} className="px-0 py-2" style={{width:'100px', fontSize:'13px', position:'absolute', bottom:'6px', right:'10px'}}> {timeLeft > 0 ? formatTime(timeLeft) : t("Send OTP")}</Btn>
            </div>
            {errors.OTP && touched.OTP && <ErrorMessage name="OTP" render={(msg) => <div className="invalid-feedback  d-block">{errors.OTP}</div>} />}
          </div>
          <div className="auth-box mb-3 form-box">
            <label htmlFor="Pincode">{t("Pincode")}</label>
            <Field 
              onChange={(e)=>{
                const newValue = e.target.value.toUpperCase(); 
                 CheckPincode(newValue);
                 setFieldValue("Pincode", newValue);
                }}
            value={values.Pincode} maxlength="6" className="form-control" name="Pincode" type="text" id="Pincode" placeholder={t("Enter Pincode")} required />
            {errors.Pincode && touched.Pincode && <ErrorMessage name="Pincode" render={(msg) => <div className="invalid-feedback  d-block">{errors.Pincode}</div>} />}
            {isInvaildpincode  ?  <div className="invalid-feedback  d-block">Invalid Pincode</div> : null}
          </div>
          {/* <div className="auth-box form-box mb-3">
            <label htmlFor="review">{t("Password")}</label>
            <Field className="form-control" type="password" name="password" id="review" placeholder={t("Enter Your Password")} required />
            {errors.password && touched.password && <ErrorMessage name="password" render={(msg) => <div className="invalid-feedback d-block">{errors.password}</div>} />}
          </div>
          <div className="mb-3">
            <div className="form-box">
              <label htmlFor="review">{t("Confirm Password")}</label>
              <Field className="form-control" name="password_confirmation" type="password" id="lname" placeholder={t("Confirm Your Password")} required />
              {errors.password_confirmation && touched.password_confirmation && <ErrorMessage name="password_confirmation" render={(msg) => <div className="invalid-feedback d-block">{errors.password_confirmation}</div>} />}
            </div>
          </div> */}
          <div className="auth-box form-box mb-3">
            <div className="forgot-box">
              <div className="form-check ps-0 m-0 custom-check-box">
                <Input type="checkbox" id="flexCheckDefault" className="checkbox_animated check-box" onChange={(e) => setCheckboxChecked(e.target.checked)} />
                <label htmlFor="flexCheckDefault" className="form-check-label text-red">
                  {t("I Agree With Terms And Privacy")}
                </label>
              </div>
            </div>
          </div>

          <Btn  type="submit" className={`btn ${Object.keys(errors).length === 0 && checkboxChecked ? "" : "disabled"}`}>
            {t("Create Account")}
          </Btn>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
