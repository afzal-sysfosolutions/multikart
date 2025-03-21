import NoDataFound from "@/Components/Widgets/NoDataFound";
import CartContext from "@/Context/CartContext";
import SettingContext from "@/Context/SettingContext";
import Loader from "@/Layout/Loader";
import Cookies from "js-cookie";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import ApplyCoupon from "./ApplyCoupon";
import PlaceOrder from "./PlaceOrder";
import PointWallet from "./PointWallet";

const BillingSummary = ({ data, values, setFieldValue, isLoading, mutate, storeCoupon, setStoreCoupon, errorCoupon, appliedCoupon, setAppliedCoupon, errors }) => {
  // const { convertCurrency } = useContext(SettingContext);
  const { cartProducts, discountAmt, ShippingAmt, PaymentMethod,  setPaymentMethod} = useContext(CartContext);
  const { t } = useTranslation("common");
  const access_token = Cookies.get("uat");

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className="checkout-details ">
      {cartProducts?.length > 0 ? (
        <>
        <div className="order-box">
          <div className="title-box">
            <h4>{t("Billing Summary")}</h4>
            <ApplyCoupon values={values} setFieldValue={setFieldValue} data={data} storeCoupon={storeCoupon} setStoreCoupon={setStoreCoupon} errorCoupon={errorCoupon} appliedCoupon={appliedCoupon} setAppliedCoupon={setAppliedCoupon} mutate={mutate} isLoading={isLoading} />
          </div>
          <div>
            <div className="custom-box-loader">
              {isLoading && (
                <div className="box-loader">
                  <Loader />
                </div>
              )}
              <ul className="sub-total">
                <li>
                  {t("Sub total")}
                  <span className="count">₹{cartProducts[0]?.SubTotal}</span>
                </li>
                <li>
                  {t("Shipping")}
                  <span className="count">₹{ShippingAmt}</span>
                </li>
                <li>
                  {t("Tax")}
                  <span className="count">₹{cartProducts[0]?.TotalTax}</span>
                </li>

                {/* <PointWallet values={values} setFieldValue={setFieldValue} data={data} /> */}
              </ul>
              <ul className="total">
                {discountAmt > 0 ? (
                  <li className="list-total">
                    {t("You Save")}
                    <span className="count">₹{discountAmt}</span>
                  </li>
                ) : null}
                <li className="list-total">
                  {t("Total")}
                  <span className="count">₹{ShippingAmt + cartProducts[0]?.GrandTotal - discountAmt} </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
            <div className="g-sm-4 g-3 row">
              <div className="col-xxl-12">
                <div className="order-box">
                  <div className="title-box">
                  <h4 className="mt-4">Payment Option</h4>
                  </div>
                </div>
              </div>
                <div className="col-xxl-6">
                <div className="payment-option">
                  <div className="payment-category w-100">
                    <div className="form-check custom-form-check d-flex gap-2 bg-white w-100 py-3">
                      <input  id="cod" className="form-check-input form-check-input ms-1" type="radio"  checked={PaymentMethod === "COD"} value="COD" name="payment_method" onChange={handlePaymentChange}/>
                      <label htmlFor="cod" className="form-check-label form-label">COD</label>
                    </div>
                  </div>
                </div>
                </div>
                <div className="col-xxl-6">
                <div className="payment-option">
                  <div className="payment-category w-100">
                    <div className="form-check custom-form-check d-flex gap-2 bg-white w-100 py-3">
                      <input id="pay_online" class="form-check-input form-check-input ms-1" type="radio"  checked={PaymentMethod === "online"} value="online"  name="payment_method" onChange={handlePaymentChange}/>
                      <label id="pay_online" class="form-check-label form-label">Pay Online</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <PlaceOrder values={values} errors={errors} />
        </>
      ) : (
        <NoDataFound customClass="no-data-added" height={156} width={180} imageUrl={`/assets/svg/empty-items.svg`} title="EmptyCart" />
      )}
    </div>
  );
};

export default BillingSummary;
