import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Btn from "@/Elements/Buttons/Btn";
import { Href } from "@/Utils/Constants";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiSmartphoneLine,RiCloseCircleLine } from "react-icons/ri";
import { Modal, ModalBody } from "reactstrap";
import ForgotPasswordForm from "./ForgotPasswordForm";
import LoginForm from "./LoginForm";
import OTPVerificationForm from "./OTPVerificationForm";
import NumberLoginForm from "./PhnLogin/LoginForm";
import RegisterForm from "./RegisterForm";
import RegisterSuccess from "./RegisterSuccess";


const AuthModal = () => {
  const [state, setState] = useState("login");
  const [title, setTitle] = useState("Sign in");
  const { t } = useTranslation("common");
  const [logOrNew, setLogOrNew] = useState(false);
  
  const path = usePathname();
  const isAuthenticated = Cookies.get("uat");
  const { openAuthModal, setOpenAuthModal, themeOption, setmodalState, modalState } = useContext(ThemeOptionContext);
  const router = useRouter();

  const handleClick = () => {
    setmodalState(modalState == "login" ? "register" : "login");
    setLogOrNew(!logOrNew);
  };

  const protectedRoutes = [`/account/dashboard`, `/account/notifications`, `/account/wallet`, `/account/bank-details`, `/account/point`, `/account/refund`, `/account/order`, `/account/addresses`, `/wishlist`, `/compare`];

  // useEffect(() => {
  //   if (protectedRoutes.includes(path) && !isAuthenticated) {
  //     router.push('/')
  //     ToastNotification("error", "Unauthenticated");
  //     setOpenAuthModal(true);
  //   }
  // }, [path]);

  useEffect(() => {
    if (modalState == "forgot") {
      setTitle("ForgotPassword");
    } else if (modalState == "otp") {
      setTitle("Otp");
    } else if (modalState == "register") {
      setTitle("Create Account");
    } else if (modalState == "number") {
      setTitle("Login With Number");
    }else if (modalState == "successRegister") {
      setTitle("Successfully Registered 🎉");
    } else {
      setTitle("Sign In");
    }
  }, [modalState]);

  return (
    <Modal toggle={() => setOpenAuthModal(false)} className="auth-modal modal-dialog-centered d-block modal-xl fade show" isOpen={openAuthModal}>
      <div className="modal-dialog ">
        <div className="modal-content">
          <ModalBody>
            <div className="modal-content open">
              <div className="d-flex justify-content-center">
                <div className="right-content w-lg-50 w-100">
                  <div className="w-100">
                    <p className="text-end pb-0 mb-0">
                      <button className="cusor-pointer border-0 bg-transparent" onClick={() => setOpenAuthModal(false)}><RiCloseCircleLine size={30}/></button>
                    </p>
                    <div className="auth-title w-100">
                      <h3>{t(title)}</h3>
                      {/* <p>{state == "otp" ? t("Otp Description") : state == "number" ? t("Number Login Description") : t("Auth Modal Description")}</p> */}
                    </div>
                    {modalState == "register" && <RegisterForm />}
                    {modalState == "login" && <LoginForm setState={setState} />}
                    {modalState == "forgot" && <ForgotPasswordForm setState={setState} />}
                    {modalState == "otp" && <OTPVerificationForm setState={setState} />}
                    {modalState == "number" && <NumberLoginForm setState={setState} />}
                    {modalState == "successRegister" && <RegisterSuccess/>}
                    {modalState !== "forgot" && state !== "otp" && (
                      <>
                        <div className="divider">
                          {modalState == "login" || modalState ==  "register"  ? <span>{t("OR")}</span> : null}
                        </div>
                        <p className="create">
                          {modalState == "login" ? t("Don't have an account ? ") :modalState == "register" ? t("Already have an account ? ")  : " "}
                          <a href={Href} onClick={handleClick}>
                            {modalState === "login" ? t("Register Here") :modalState === "register" ?  t("Login Here") : null}
                          </a>
                        </p>
                        {modalState == "login" && (
                          <Btn color="transparent" className="number-btn" onClick={() => setmodalState("number")}>
                            <RiSmartphoneLine />
                            {t("Login With Number")}
                          </Btn>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {/* <div className="left-img w-lg-50 d-lg-block d-none"> */}
                {/* <Image   height={1920} width={1920} src={''} alt="login" />  */}
                {/* </div> */}
              </div>
            </div>
          </ModalBody>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
