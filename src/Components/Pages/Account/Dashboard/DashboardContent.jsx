import AccountContext from "@/Context/AccountContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";
// import SettingContext from "@/Context/SettingContext";
import { ImagePath } from "@/Utils/Constants";
import ProfileInformation from "./ProfileInformation";
import { useCommonService } from "@/Utils/Services/Common";

const DashboardContent = () => {
  const { t } = useTranslation("common");
  const { accountData, clientId  } = useContext(AccountContext);
  const [userData, setuserData] = useState([])
  // const { convertCurrency } = useContext(SettingContext);
  const {ApiCalling} = useCommonService();
  const fetchuserData = async ()=>{
    const ClientID = localStorage.getItem('ClientId')
    const OBJ ={
      Para:JSON.stringify({ClientId:ClientID, Actionmode:'GettordercountMember'}),
      procName:'SalesOrder'
    }
    const user =  await ApiCalling(OBJ);
    if(user[0]?.Statusecode === 1){
      setuserData(user);
    }
  }
  useEffect(()=>{
    fetchuserData()
  },[])

  return (
    <div className="counter-section">
      <div className="welcome-msg">
        <h4>
          {t("Hello")}, {accountData?.name ?? t("User")} !
        </h4>
        <p>{t("Dashboard Description")}</p>
      </div>

      <div className="total-box">
        <Row>
          <Col md={6}>
            <div className="counter-box">
              <Image src={`${ImagePath}/icon/dashboard/account3.png`} alt="wallerSvg" height={50} width={50} className="img-fluid" />
              <div>
                {/* <h3>{accountData?.wallet ? convertCurrency(accountData?.wallet?.balance) : 0?.toFixed(2)}</h3> */}
                <h3>{userData[0]?.Processing}</h3>
                <h5>{t("Proceed")}</h5>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="counter-box">
              <Image src={`${ImagePath}/icon/dashboard/account3.png`} className="img-fluid" alt="coinSvg" height={50} width={50} />
              <div>
              <h3>{userData[0]?.Shipped}</h3>
                <h5>{t("Shipped")}</h5>
              </div>
            </div>
          </Col>
          <Col md={6} className="mt-3">
            <div className="counter-box">
              <Image src={`${ImagePath}/icon/dashboard/account3.png`} className="img-fluid" alt="orderSvg" height={50} width={50} />
              <div>
              <h3>{userData[0]?.Delivered}</h3>
                <h5>{t("Delivered")}</h5>
              </div>
            </div>
          </Col>
          <Col md={6} className="mt-3">
            <div className="counter-box" >
              <Image src={`${ImagePath}/icon/dashboard/account3.png`} className="img-fluid" alt="orderSvg" height={50} width={50} />
              <div>
              <h3>{userData[0]?.Processing}</h3>
                <h5>{t("Cancelled")}</h5>
              </div>
            </div>
          </Col>
          {/* <ProfileInformation /> */}
        </Row>
      </div>
    </div>
  );
};

export default DashboardContent;
