import SearchableSelectInput from "@/Components/Widgets/InputFields/SearchableSelectInput";
import AccountContext from "@/Context/AccountContext";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import { AllCountryCode } from "@/Data/CountryCode";
import Btn from "@/Elements/Buttons/Btn";
import { Href } from "@/Utils/Constants";
import { ToastNotification } from "@/Utils/CustomFunctions/ToastNotification";
import useHandlePhnLogin from "@/Utils/Hooks/usePhnLogin";
import { useCommonService } from "@/Utils/Services/Common";
import { YupObject, nameSchema, OTPSchema } from "@/Utils/Validation/ValidationSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Col, Label } from "reactstrap";

const NumberLoginForm = ({ setState }) => {
  const { t } = useTranslation("common");
  const [showBoxMessage, setShowBoxMessage] = useState();
  const {ApiCalling} =useCommonService()
   const [sendotp, setsendotp] = useState(false);
   const [timeLeft, setTimeLeft] = useState(0);
   const {clientI, setClientId,isLogin, setisLogin} = useContext(AccountContext)
  const { openAuthModal, setOpenAuthModal, themeOption, setmodalState, modalState } = useContext(ThemeOptionContext);

  // Get OTP 
const GenerateOTP = async (phoneno)=>{
  if(!phoneno) return ToastNotification('error', "Please Enter Contact Number")
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

const HandleSubmit = async(value)=>{
const OBJ ={
  Para:JSON.stringify({MobileNo:value?.phone, OTP:value?.OTP}),
  procName:'LoginwithOtp'
}
const res = await ApiCalling(OBJ);
if(res[0]?.StatusCode === "1"){
  localStorage.setItem('ClientId', res[0]?.UserId);
  setisLogin(!isLogin);
  setOpenAuthModal(false);
  ToastNotification('success', res[0]?.msg);
}else if(res[0]?.StatusCode === "0"){
  ToastNotification('error', res[0]?.msg);
}

}


  return (
    <Formik
      initialValues={{
        country_code: "91",
        phone: "",
        OTP:''
      }}
      validationSchema={YupObject({
        phone: nameSchema,
        OTP:OTPSchema
      })}
      onSubmit={(values, { setSubmitting }) => {
        HandleSubmit(values)
        setSubmitting(false);
      }}
    >
           {({ errors, touched, values, setFieldValue }) => (
        <div className="auth-form-box ">
          {showBoxMessage && (
            <div role="alert" className="alert alert-danger login-alert">
              <i className="ri-error-warning-line"></i> {showBoxMessage}
            </div>
          )}
          <Form>
            <Col xs="12" className="phone-field mb-3">
              <div className="form-box">
                <Label htmlFor="MobileNo">{t("Mobile No")}</Label>
                <SearchableSelectInput
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
                />
                <Field className="form-control" name="phone" placeholder={t("Enter Phone Number")} type="number" />
                {errors.phone && touched?.phone && <ErrorMessage render={() => <div className="invalid-feedback">{errors.phone}</div>} />}
              </div>
            </Col>
            <Col className="phone-field mb-3">
              <Label htmlFor="MobileNo">{t("OTP")}</Label>
              <div className="form-box position-relative">

                  <Field className="form-control" name="OTP" placeholder={t("Enter OTP")} type="text" />
                  <Btn className="position-absolute p-2" onClick={()=> !sendotp ?  GenerateOTP(values?.phone) : null} style={{width:'100px', top:'4px', right:'6px', fontSize:'10px'}}>{timeLeft > 0 ? formatTime(timeLeft) : t("Send OTP")}</Btn>
                  {errors.OTP && touched?.OTP && <ErrorMessage render={() => <div className="invalid-feedback">{errors.OTP}</div>} />}
              </div>
            </Col>
            <Btn  type="submit">
              {t("Send Otp")}
            </Btn>
            <a onClick={() => setState("login")} href={Href} className="modal-back">
              <i className="ri-arrow-left-line"></i>
            </a>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default NumberLoginForm;
