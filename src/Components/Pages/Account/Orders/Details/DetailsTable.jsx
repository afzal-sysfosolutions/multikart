import Avatar from "@/Components/Widgets/Avatar";
import { placeHolderImage } from "@/Components/Widgets/Placeholder";
import SettingContext from "@/Context/SettingContext";
import { useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardBody, Table, Tooltip } from "reactstrap";
import RefundModal from "./RefundModal";
import { Href } from "@/Utils/Constants";
import Btn from "@/Elements/Buttons/Btn";
import { CapitalizeMultiple } from "@/Utils/CustomFunctions/Capitalize";

const DetailsTable = ({ data }) => {
  // console.log(data);
  
  const { t } = useTranslation("common");
  // const { convertCurrency } = useContext(SettingContext);
  const [modal, setModal] = useState("");
  const [storeData, setStoreData] = useState("");
  const onModalOpen = (product) => {
    setStoreData(product);
    setModal(product?.id);
  };
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = (index) =>
    setTooltipOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));

  const ref = useRef(null);
  return (
    <>
      <Card className="dashboard-table">
        <CardBody className="p-0">
          <div className="wallet-table">
            <div className="tracking-wrapper table-responsive">
              <Table className="product-table order-table">
                <thead>
                  <tr>
                    <th scope="col">{t("Image")}</th>
                    <th scope="col">{t("Name")}</th>
                    <th scope="col">{t("Price")}</th>
                    <th scope="col">{t("Quantity")}</th>
                    <th scope="col">{t("Subtotal")}</th>
                    <th scope="col">{t("Refund Status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((product, i) => (
                        <tr key={i}>
                          <td className="product-image">
                            <img src={process.env.NEXT_PUBLIC_CART_IMG+product?.ProductImage} alt="product-img"/>
                            {/* <Avatar data={placeHolderImage} name={product?.pivot?.variation ? product?.pivot?.variation?.name : product?.name} customImageClass="img-fluid" /> */}
                          </td>
                          <td>
                            <h6>{product?.ProductName}</h6>
                          </td>
                          <td>
                            <h6>₹{(product?.ProductPrice)}</h6>
                          </td>
                          <td>
                            <h6>{product?.Quantity}</h6>
                          </td>
                          <td>
                            <h6>₹{(product?.TotalProductPrice)}</h6>
                          </td>
                          <td>
                            {data.payment_status && product?.is_return === 1 && data.payment_status && data.payment_status === "COMPLETED" && data.order_status && data.order_status.slug == "delivered" && !product?.pivot?.refund_status ? (
                              <a className="btn btn-solid" href={Href} onClick={() => onModalOpen(product)}>
                                {t("Refund")}
                              </a>
                            ) : product.is_return === 0 ? (
                              <span>{t("Non Refundable")}</span>
                            ) : product?.pivot?.refund_status ? (
                              <div className={`status-${product?.pivot?.refund_status?.toLowerCase()}`}>
                                <span>{CapitalizeMultiple(product?.pivot?.refund_status)}</span>
                              </div>
                            ) : (
                              <>
                              <div className="black-tooltip" id={"refunded" + i}>
                                {!product?.pivot?.refund_status && <Btn className="btn-solid disabled"> {t("Refund")}</Btn>}
                              </div>
                                <Tooltip isOpen={tooltipOpen[i]} target={"refunded" + i} toggle={() => toggle(i)}>
                                {t("Enable After Delivery")}
                              </Tooltip>
                              </>
                            )}
                          </td>
                        
                          {/* <td>{product?.is_return === 1 && product?.pivot?.is_refunded === 0 ? <a onClick={() => onModalOpen(product)}>{t("AskForRefund")}</a> : "-"}</td> */}
                        </tr>
                      ))
                    }
                </tbody>
              </Table>
            </div>
          </div>
        </CardBody>
      </Card>
      <RefundModal modal={modal} setModal={setModal} storeData={storeData} />
    </>
  );
};

export default DetailsTable;
