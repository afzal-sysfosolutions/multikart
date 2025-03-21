'use client';
import CustomHeading from "@/Components/Widgets/CustomHeading";
import { Col, FormGroup, Label, Row } from "reactstrap";
import { emailSchema, nameSchema, phoneSchema, OTPSchema, passwordSchema } from "@/Utils/Validation/ValidationSchema";
import { useTranslation } from "react-i18next";
import { ToastNotification } from "@/Utils/CustomFunctions/ToastNotification";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useContext, useEffect, useState } from "react";
import Btn from "@/Elements/Buttons/Btn";
import { useCommonService } from "@/Utils/Services/Common";
import * as Yup from "yup"; // Ensure Yup is imported
import Loader from "@/Layout/Loader";
import AccountContext from "@/Context/AccountContext";

const ProfileContent = (hideprofile) => {
  const { t } = useTranslation("common");
  const { ApiCalling } = useCommonService();
  const [sendotp, setsendotp] = useState(false);
  const [userData, setuserData] = useState([])
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const { accountData, clientId  } = useContext(AccountContext);
  const FetchUserData = async () => {
    setisLoading(true)
    const clientID = localStorage.getItem('ClientId')
    const OBJ = {
      Para: JSON.stringify({ ClientId: clientId, Actionmode: "GetProfile" }),
      procName: "UpdateProfile",
    };
    const result = await ApiCalling(OBJ);
    console.log(result);
    if(Array.isArray(result)){
      setuserData(result);
      setisLoading(false)
    }
    
  };

  useEffect(() => {
    FetchUserData();
  }, []);

  // generate OTP

const GenerateOTP = async (phoneno)=>{
  const  OBJ ={
    Para:JSON.stringify({MobileNo:phoneno, ActionMode:'SendMobileOTP'}),
    procName:'RegistrationMobileOTP'
  }
  const result  = await ApiCalling(OBJ)
  setsendotp(true)
  setTimeLeft(60)

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

// Update Profile 
  const HandleSubmit = async(values) => {
    const clientID = localStorage.getItem('ClientId')
    const OBJ ={
      Para:JSON.stringify({ClientId:clientId, FirstName:values?.fullname, MobileNo:values?.phoneno, MobileOTP:values?.OTP, Actionmode:'UpdateProfile'}),
      procName:'UpdateProfile'
    }
    const result  = await ApiCalling(OBJ)
    if(result[0]?.StatusCode === "1"){
      ToastNotification('success', result[0]?.msg);
      FetchUserData()
    }
  };

  // Update profile Password

  const HandleChangeuserPass = async()=>{
    const clientID = localStorage.getItem('ClientId')
    const OBJ ={
      Para:JSON.stringify({ClientId:clientId, OldPassword:values?.fullname, NewPassword:values?.phoneno, Actionmode:'ChangePassword'}),
      procName:'UpdateProfile'
    }
    const result  = await ApiCalling(OBJ)
    if(result[0]?.StatusCode === "1"){
      ToastNotification('success', result[0]?.msg);
      FetchUserData()
    }
  }

  // ✅ Corrected Validation Schema
  const validationSchema = Yup.object({
    fullname: nameSchema,
    phoneno: phoneSchema,
    Email: emailSchema,
    OTP: OTPSchema,
  });

    if (isLoading)
      return (
        <div className="box-loader">
          <Loader classes={"blur-bg"} />
        </div>
      );

  return (
    <div className="dashboard-profile">
      {/* <CustomHeading title={"My Profile"} svgU={null} svgClass="bg-gray" /> */}
      <div className="dashboard-bg-box">
        <Row>
          <Col md={10}>
            <div className="dashboard-title mb-3 top-sec">
              <h3>{t("My Profile")}</h3>
            </div>

            {/* ✅ Formik Form with Fixed Fields */}
            <Formik
              initialValues={{ fullname:userData ? userData[0]?.ClientName :"", phoneno:userData ? userData[0]?.ContactNo : "", Email:userData ? userData[0]?.EmailId : "", OTP: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm  }) => {
                HandleSubmit(values);
                resetForm()
                setSubmitting(false);
              }}
              enableReinitialize
            >
              {({ isSubmitting, errors, touched, values, setFieldValue }) => (
                <Form className={`${hideprofile?.hideprofile?.hideprofile === false ? 'd-none' : ''}`}>
                  <Row>
                    <Col md="6">
                      <FormGroup floating>
                        <Field id="fullname" name="fullname" placeholder={t("Enter Full Name")} type="text" className="form-control" />
                        <Label htmlFor="fullname">{t("Full Name")}</Label>
                        <ErrorMessage name="fullname" component="div" className="text-danger" />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup floating>
                        <Field id="phoneno" name="phoneno" placeholder={t("Enter Phone No")} type="text" className="form-control" />
                        <Label htmlFor="phoneno">{t("Phone No")}</Label>
                        <ErrorMessage name="phoneno" component="div" className="text-danger" />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup floating>
                        <Field id="Email" name="Email" placeholder={t("Enter Email")} type="email" className="form-control" />
                        <Label htmlFor="Email">{t("Email")}</Label>
                        <ErrorMessage name="Email" component="div" className="text-danger" />
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup floating className="relative">
                        <Field id="OTP" name="OTP" type="text" placeholder={t("Enter OTP")} className="form-control" />
                        <Label htmlFor="OTP">{t("OTP")}</Label>
                        <button type="button" className="px-0 py-2 btn-solid buy-button btn btn-transparent" onClick={()=> !sendotp ?  GenerateOTP(values?.phoneno) : null} style={{ width: "100px", fontSize: "13px", position: "absolute", top: "10px", right: "10px" }}>
                        {timeLeft > 0 ? formatTime(timeLeft) : t("Send OTP")}
                        </button>
                        <ErrorMessage name="OTP" component="div" className="text-danger" />
                      </FormGroup>
                    </Col>

                    <Col md="4" className="mb-2">
                      <Btn className="btn-solid buy-button btn btn-transparent w-100" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update Profile"}
                      </Btn>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>

            {/* ✅ Change Password Form */}
            <div className={`${hideprofile?.hideprofile?.hideprofile === true ? 'd-none' : ''} dashboard-title mb-3`}>
              <h3>{t("Change Password")}</h3>
            </div>
            <Formik
              initialValues={{ currentPassword: "", newPassword: "", confirmPassword: "" }}
              validationSchema={Yup.object({
                currentPassword: passwordSchema,
                newPassword: passwordSchema,
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref("newPassword")], "Passwords must match")
                  .required("Confirm Password is required"),
              })}
              onSubmit={(values, { setSubmitting, resetForm  }) => {
                  HandleChangeuserPass(values);
                  resetForm()
                  setSubmitting(false);
                }}
                enableReinitialize
            >
              <Form className={`${hideprofile?.hideprofile?.hideprofile === true ? 'd-none' : ''}`}>
                <Row>
                  <Col md="12">
                    <FormGroup floating>
                      <Field id="currentPassword" name="currentPassword" placeholder={t("Enter Current Password")} type="password" className="form-control" />
                      <Label htmlFor="currentPassword">{t("Current Password")}</Label>
                      <ErrorMessage name="currentPassword" component="div" className="text-danger" />
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup floating>
                      <Field id="newPassword" name="newPassword" placeholder={t("Enter New Password")} type="password" className="form-control" />
                      <Label htmlFor="newPassword">{t("New Password")}</Label>
                      <ErrorMessage name="newPassword" component="div" className="text-danger" />
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup floating>
                      <Field id="confirmPassword" name="confirmPassword" placeholder={t("Enter Confirm Password")} type="password" className="form-control" />
                      <Label htmlFor="confirmPassword">{t("Confirm Password")}</Label>
                      <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                    </FormGroup>
                  </Col>

                  <Col md="4" className="mb-2">
                    <Btn className="btn-solid buy-button btn btn-transparent w-100" type="submit">
                      Change Password
                    </Btn>
                  </Col>
                </Row>
              </Form>
            </Formik>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProfileContent;
