import NoDataFound from "@/Components/Widgets/NoDataFound";
import Pagination from "@/Components/Widgets/Pagination";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import {RiFile3Line} from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import { Card, CardBody, Table } from "reactstrap";
import { ImagePath } from "@/Utils/Constants";
import { useTranslation } from "react-i18next";
import AccountHeading from "../Common/AccountHeading";
import Cookies from "js-cookie";
import Loader from "@/Layout/Loader";
import Capitalize from "@/Utils/CustomFunctions/Capitalize";
import { useCommonService } from "@/Utils/Services/Common";
import AccountContext from "@/Context/AccountContext";


const MyOrders = () => {
  const [badgeClass, setBadgeClass] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([])
  const [isLoading, setisLoading] = useState(false);
  const { accountData, clientId  } = useContext(AccountContext);

  const { t } = useTranslation("common");
  // const { convertCurrency } = useContext(SettingContext);
  const {ApiCalling} = useCommonService()
  // const { data, isLoading, refetch } = useQuery([page], () => request({ url: OrderAPI, params: { page: page, paginate: 10 } }), {
  //   enabled: true,
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   select: (res) => res?.data,
  // });

  useEffect(() => {

    FetchOrderList()
  }, []);


const FetchOrderList = async()=>{
  const CookieId = Cookies.get('userID')
  const clientID = localStorage.getItem('ClientId')
  setisLoading(true)
  const OBJ ={
    Para:JSON.stringify({ClientId:clientID, Actionmode:'SearchBymemeber'}),
    procName:'SalesOrder'
  }
  const result = await ApiCalling(OBJ);
  if(Array.isArray(result)){
    setData(result);
    setisLoading(false);
  }else{
    setData([]);
    setisLoading(false);
  }
}


  if (isLoading)
    return (
      <div className="box-loader">
        <Loader classes={"blur-bg"} />
      </div>
    );
  return (
    <Card className="dashboard-table mt-0">
      <CardBody className="p-0">
        <AccountHeading title="My Orders" classes={"top-sec"} />
        {data?.length > 0 ? (
          <>
            <div className="total-box mt-0">
              <div className="wallet-table mt-0">
                <div className="table-responsive">
                  <Table className="table cart-table order-table">
                    <thead>
                      <tr className="table-head">
                        <th>{t("Order Number")}</th>
                        <th>{t("Date")}</th>
                        <th>{t("Amount")}</th>
                        <th>{t("Payment Status")}</th>
                        <th>{t("Invoice")}</th>
                        <th>{t("Action")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((order, i) => (
                        <tr key={i}>
                          <td>
                          <span dangerouslySetInnerHTML={{ __html:'#'+order.OrderNumber }} />
      
                          </td>
                          {/* <td>{showMonthWiseDateAndTime(order?.created_at)}</td> */}
                          <td>{order?.OrderDate} </td>
                          <td>
                            {/* <div className={`${order.payment_status.toLowerCase() === "pending" ? "badge bg-pending" : order.payment_status.toLowerCase() === "completed" ? "badge bg-completed" : "badge bg-cancelled custom-badge rounded-0"} custom-badge rounded-0`}>
                              <span>{Capitalize(order?.payment_status)}</span>
                            </div> */}
                            <div>
                              {order?.OrderTotal}
                            </div>
                          </td>
                              <td>
                                <span dangerouslySetInnerHTML={{ __html:order?.Status }} />
                              </td>
                          {/* <td>{order.payment_method.toUpperCase()}</td> */}
                          <td>
                          <Link href={`/account/order/details/${order?.Invoice.match(/href="([^"]+)"/)[1]}`}>
                            <RiFile3Line/>
                            </Link>
                              {/* <div dangerouslySetInnerHTML={{ __html:order?.Invoice }}/> */}
                          </td>
                          <td>
                            <Link href={`/account/order/details/${order?.OrderNumber}`}>
                              <RiEyeLine />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
            <div className="product-pagination">
              <div className="theme-pagination-block">
                <nav>
                  <Pagination current_page={data?.current_page} total={data?.total} per_page={data?.per_page} setPage={setPage} />
                </nav>
              </div>
            </div>
          </>
        ) : (
          <NoDataFound customClass="no-data-added" imageUrl={`/assets/svg/empty-items.svg`} title="No Orders Found" description="No Orders Have Been Made Yet" height="300" width="300" />
        )}
      </CardBody>
    </Card>
  );
};

export default MyOrders;
