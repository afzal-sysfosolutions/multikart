import SettingContext from "@/Context/SettingContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardBody, Col, Row } from "reactstrap";

const DetailsConsumer = ({ data, orderamtData }) => {
  // const { convertCurrency } = useContext(SettingContext);
  const { t } = useTranslation("common");

  return (
    <>
      <div className="summary-details my-3">
        <Row className="g-sm-4 g-3">
          <Col xxl={8} lg={12} md={7}>
            <Card>
              <CardBody>
                <h3 className="order-title">{t("Consumer Details")}</h3>
                <div className="customer-detail tracking-wrapper">
                  <ul className="row g-3">
                    {data[0]?.BillingAddress ? (
                      <li className="col-sm-6">
                        <label>{t("Billing Address")}:</label>
                        <h4 dangerouslySetInnerHTML={{ __html: data[0]?.BillingAddress  }} />
                        {/* <h4>
                          {data.billing_address.street} {data.billing_address.city} {data.billing_address.state?.name} {data.billing_address.country?.name} {data.billing_address.pincode} <br></br>
                          {t("Phone")} : +{data?.billing_address?.country_code} {data.billing_address.phone}
                        </h4> */}
                      </li>
                    ) : null}
                    {data[0]?.ShippingAddress ? (
                      <li className="col-sm-6">
                        <label>{t("Shipping Address")}:</label>
                        <h4 dangerouslySetInnerHTML={{ __html: data[0]?.ShippingAddress  }} />
                        {/* <h4>
                          {data.shipping_address.street} {data.shipping_address.city} {data.shipping_address.state?.name} {data.billing_address.country?.name} {data.shipping_address.pincode} <br></br>
                          {t("Phone")} : +{data.shipping_address.country_code} {data.shipping_address.phone}
                        </h4> */}
                      </li>
                    ) : null}
                 
                      <li className="col-sm-6">
                        <label>{t("Delivery Slot")}:</label>
                        <h4>{'MultiKart'}</h4>
                      </li>
                      <li className="col-3">
                        <label>{t("Payment Mode")}:</label>
                        <div className="d-flex align-items-center gap-2">
                          <h4>{data[0]?.PaymentMode.toUpperCase()}</h4>
                        </div>
                      </li>
                  
                  
                      <li className="col-3">
                        <label>{t("Payment Status")}:</label>
                        <div className="d-flex align-items-center gap-2">
                          <h4>{data[0]?.Status}</h4>
                        </div>
                      </li>
                 
                  </ul>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xxl={4} lg={12} md={5}>
            <Card className="h-m30">
              <CardBody>
                <h3 className="order-title">{t("Summary")}</h3>
                <div className="tracking-total tracking-wrapper">
                  <ul>
                    <li>
                      {t("Sub total")} <span>₹{orderamtData[0]?.SubTotal ? (orderamtData[0]?.SubTotal) : (0)}</span>
                    </li>
                    {data && !data?.is_digital_only && (
                      <li>
                        {t("Shipping")} <span>₹{orderamtData[0]?.ShippingCost || (0)}</span>
                      </li>
                    )}
                    <li>
                      {t("Tax")} <span>₹{orderamtData[0]?.TaxAmount || (0)}</span>
                    </li>
                    {/* {data?.points_amount != 0 ? (
                      <li className="txt-primary fw-bold">
                        {t("Points")} <span>{data?.points_amount}</span>
                      </li>
                    ) : null} */}
                    {/* {data?.wallet_balance != 0 ? (
                      <li className="txt-primary fw-bold">
                        {t("Wallet Balance")}
                        <span>{(data?.wallet_balance)}</span>
                      </li>
                    ) : null} */}
                    <li>
                      {t("Total")} <span>₹{orderamtData[0]?.GrandTotal ? (orderamtData[0]?.GrandTotal) : (0)}</span>
                    </li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DetailsConsumer;
