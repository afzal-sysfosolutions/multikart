import SettingContext from "@/Context/SettingContext";
import Btn from "@/Elements/Buttons/Btn";
import request from "@/Utils/AxiosUtils";
import { CouponAPI } from "@/Utils/AxiosUtils/API";
import { Href, ImagePath } from "@/Utils/Constants";
import { ToastNotification } from "@/Utils/CustomFunctions/ToastNotification";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiCouponLine } from "react-icons/ri";
import { Col, Input, Row } from "reactstrap";
import CouponModal from "./CouponModal";
import { useCommonService } from "@/Utils/Services/Common";
import CartContext from "@/Context/CartContext";

const ApplyCoupon = ({ data, setFieldValue, storeCoupon, setStoreCoupon, values, appliedCoupon, setAppliedCoupon, errorCoupon, mutate, isLoading }) => {
  const { t } = useTranslation("common");
  const {cartProducts, setDiscountAmt, discountAmt, CouponCode, setCouponCode } = useContext(CartContext);
  // const { convertCurrency } = useContext(SettingContext);
  const {ApiCalling} =useCommonService()
  const onCouponApply = async() => {
    if(CouponCode === ''){
      return ToastNotification('warn', 'Please Enter Coupon Code')
    }
    // setFieldValue("coupon", value);
    const OBJ ={
      Para:JSON.stringify({ActionMode:'GetCouponDic', OrderAmount:cartProducts[0]?.GrandTotal, CouponCode:CouponCode, MemberId:'3'}),
      procName:'Coupon'
    }
    const result = await ApiCalling(OBJ)
    if(result[0]?.StatusCode === "1"){
      ToastNotification('success', "Coupon Appiled")
      setDiscountAmt(result[0]?.CouponAmount)
    }else{
      ToastNotification('error', result[0]?.Msg)
    }

  };
  const [toggle, setToggle] = useState(false);
  const router = useRouter();
  // const { data: couponData, isLoading: couponLoader } = useQuery([CouponAPI], () => request({ url: CouponAPI, params: { status: 1 } }, router), {
  //   enabled: true,
  //   refetchOnWindowFocus: false,
  //   select: (data) => data.data.data,
  // });


  const removeCoupon = () => {
    setDiscountAmt(0)
    setStoreCoupon("");
    // Put your logic here
  };
  const onCouponApplyClick = async() => {
    storeCoupon !== "" && setAppliedCoupon("applied");
    setFieldValue("coupon", storeCoupon);
    // Put your logic here
  };

  const onCopyCode = (couponData) => {
    navigator.clipboard.writeText(couponData);
    ToastNotification("success", "Code copied to clipboard");
  };

  return (
    <div className="promo-code-box">
      <div className="promo-title">
        <h5>{t("Promo Code")}</h5>
        <a href={Href} onClick={() => setToggle(true)}>
          <RiCouponLine /> {t("ViewAll")}
        </a>
      </div>
      {/* <Row className="g-sm-3 g-2 mb-3">
        {couponData?.slice(0, 2).map((item, i) => (
          <Col xl="6" key={i}>
            <div className="coupon-box">
              <div className="card-name">
                <h6>{item?.title}</h6>
              </div>
              <div className="coupon-content">
                <div className="coupon-apply">
                  <h6 className="coupon-code success-color">#{item?.code}</h6>
                  <Btn color="transparent" title={"Copy Code"} className="theme-btn border-btn copy-btn mt-0" onClick={() => onCopyCode(item?.code)} />
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row> */}
      {discountAmt > 0  ? (
        <div className="offer-apply-box">
          <Image src={`${ImagePath}/offer.gif`} className="img-fluid" height={20} width={20} alt="offer" />
          <div>
            <h4>
              {t("You saved")} <span>₹{discountAmt}</span> {t("with this code")} 🎉 <p>{t("Coupon Applied")}</p>
            </h4>
          </div>
          <a style={{ cursor: "pointer" }} className="close-coupon" onClick={() => removeCoupon()}>
            {t("Remove")}
          </a>
        </div>
      ) : (
        <>
          <div className="coupon-input-box">
            <Input type="text" value={CouponCode} placeholder={t("Enter Coupon")} onChange={(e) => setCouponCode(e.target.value) } />
            <div>
              <Btn className="apply-button" onClick={onCouponApply}>
                {t("Apply Now")}
              </Btn>
            </div>
          </div>
        </>
      )}
      {/* <CouponModal couponData={couponData} onCopyCode={onCopyCode} toggle={toggle} setToggle={setToggle} /> */}
    </div>
  );
};

export default ApplyCoupon;
