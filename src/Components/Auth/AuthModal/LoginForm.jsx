import SettingContext from "@/Context/SettingContext";
import Btn from "@/Elements/Buttons/Btn";
import { Href } from "@/Utils/Constants";
import Cookies from "js-cookie";
import useHandleLogin from "@/Utils/Hooks/useLogin";
import { ToastNotification } from "@/Utils/CustomFunctions/ToastNotification";
import { YupObject, emailSchema, passwordSchema, recaptchaSchema, phoneSchema } from "@/Utils/Validation/ValidationSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Label } from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { useUserService } from "@/Utils/Services/authentication";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import AccountContext from "@/Context/AccountContext";

const LoginForm = ({ setState }) => {
  const [showBoxMessage, setShowBoxMessage] = useState();
  const {clientI, setClientId,isLogin, setisLogin} = useContext(AccountContext)
  const { themeOption, setOpenAuthModal,  } = useContext(ThemeOptionContext);
  const {userLogin} = useUserService()
  const { t } = useTranslation("common");


    const User_Login = async (value)=>{
      const CookieID = Cookies.get('userID')
      const OBJ ={
        Para:JSON.stringify({CookieId:CookieID, MobileNo:value?.MobileNo, Password:value?.password}),
        procName:'AmwellLifeLogin'
      }
      const result  = await userLogin(OBJ);
      if(result[0]?.StatusCode === "0"){
        ToastNotification('error', result[0]?.msg)
      }else if (result[0]?.StatusCode === "1"){
        localStorage.setItem('ClientId', result[0]?.UserId);
        setisLogin(!isLogin);
        setOpenAuthModal(false);
        ToastNotification('success', result[0]?.msg);
      }
}

  return (
    <Formik
      initialValues={{ MobileNo: "", password: "", }}
      validationSchema={YupObject({
        MobileNo: phoneSchema,
        password: passwordSchema,
      })}
      onSubmit={(values, { setSubmitting }) => {
        User_Login(values);
        setSubmitting(false);
      }}
    >
   {({ errors, touched, values, setFieldValue }) => (
        <Form className="auth-form-box">
          {showBoxMessage && (
            <div role="alert" className="alert alert-danger login-alert ">
              <i className="ri-error-warning-line"></i> {showBoxMessage}
            </div>
          )}
          <div className="auth-box mb-3">
            <Label htmlFor="MobileNo">{t("Mobile No")}</Label>
            <Field name="MobileNo" className="form-control" id="MobileNo" placeholder={t("Mobile No")} required />
            {errors.MobileNo && touched.MobileNo && <ErrorMessage name="MobileNo" render={(msg) => <div className="invalid-feedback d-block">{errors.MobileNo}</div>} />}
          </div>
          <div className="auth-box mb-3">
            <Label htmlFor="review">{t("Password")}</Label>
            <Field name="password" type="password" className="form-control" id="review" placeholder={t("Enter Your Password")} required />
            {errors.password && touched.password && <ErrorMessage name="password" render={(msg) => <div className="invalid-feedback d-block">{errors.password}</div>} />}
            <a href={Href} className="forgot" onClick={() => setState("forgot")}>
              {t("Forgot Your Password")}?
            </a>
          </div>
          {/* {settingData?.google_reCaptcha?.status && (
            <div>
              <ReCAPTCHA
                ref={reCaptchaRef}
                sitekey={settingData?.google_reCaptcha?.site_key}
                onChange={(value) => {
                  setFieldValue("recaptcha", value);
                }}
              />
              {errors.recaptcha && touched.recaptcha && <ErrorMessage name="recaptcha" render={(msg) => <div className="invalid-feedback d-block">{errors.recaptcha}</div>} />}
            </div>
          )} */}
          <Btn type="submit">
            {t("Login")}
          </Btn>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
