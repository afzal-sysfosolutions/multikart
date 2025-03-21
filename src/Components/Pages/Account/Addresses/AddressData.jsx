import ConfirmDeleteModal from "@/Components/Widgets/ConfirmDeleteModal";
import AccountContext from "@/Context/AccountContext";
import Btn from "@/Elements/Buttons/Btn";
import { AddressAPI } from "@/Utils/AxiosUtils/API";
import Cookies from "js-cookie";
import { ToastNotification } from "@/Utils/CustomFunctions/ToastNotification";
import useDelete from "@/Utils/Hooks/useDelete";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";
import AddressTable from "./AddressTable";
import { useCommonService } from "@/Utils/Services/Common";
import CartContext from "@/Context/CartContext";

const AddressData = ({ addressState, setAddressState, modal, setModal, setEditAddress }) => {
  const [deleteId, setDeleteId] = useState("");
  const { refetch, fetchData, setrefetchData, ShippingID, setShippingID, clientId } = useContext(AccountContext);
  const { ShippingAmt, setShippingAmt } = useContext(CartContext);
  const {ApiCalling} = useCommonService()
  const { data, mutate, isLoading } = useDelete(AddressAPI, false);
  const { t } = useTranslation("common");


  const removeAddress = async() => {
    // console.log(deleteId);
    if(deleteId?.address?.Type === "Billing") {
      return  ToastNotification('error', 'The Billing Address would be not remove')
    }
    const OBJ = {
      para:JSON.stringify({ClientId:clientId, AddressID:deleteId?.AddressId, ActionMode:'RemoveAddress'}),
      procName:'DeliveryAddress'
    }
    const result = await ApiCalling(OBJ)
    if(result[0]?.StatusCode === "1"){
      setModal(false);
      ToastNotification('success', result[0]?.Msg)
      setrefetchData(!fetchData);
      setDeleteId("")
    }else{
      ToastNotification('error', result[0]?.Msg)
      setModal(false);
    }
  
    // Put your logic here
  };

  useEffect(() => {
    // console.log(addressState);
    if (data?.status) {
      setAddressState((prev) => prev.filter((elem) => elem.id !== deleteId));
      refetch();
      setModal("");
    }
  }, [data]);

  const ChooseShippingAddress = async(ID)=>{
    const CookieID = Cookies.get('userID')
    const OBJ ={
      Para:JSON.stringify({CookieId:CookieID, AddressId:ID, CouponCode:'', PaymentMode:''}),
      procName:'CalculateShippingCharge'
    }
    setShippingID(ID);
    try {
      const result = await ApiCalling(OBJ);
      setShippingAmt(result[0]?.ShippingCost);
    } catch (error) {
      ToastNotification('error', error)
    }


    
  }

  return (
    <Row className="g-4">
      {addressState?.map((address, i) => (
     <>
        {i=== 1 ? <>
          <Col className="top-sec mb-0 pb-0"><h3>Shipping Address</h3> <a class=" btn-solid btn btn-transparent btn-sm">+ Add New</a>
          
          </Col>
        <p className="my-0 py-0 text-theme">Select your address for shipping.</p> 
        </> : null}
        <Col sm="12" key={i}>
          <div className="select-box"  style={{ cursor: 'pointer' }}>
            <div className="address-box">
                <div onClick={()=> { address?.Type === "Shipping" ? ChooseShippingAddress(address?.AddressId) : null}}>
                <AddressTable address={address} />
                </div>
              <div className="bottom">
                <Btn
                  color="transparent"
                  className="bottom_btn"
                  onClick={() => {
                    setEditAddress(address);
                    setModal("edit");
                  }}
                >
                  {t("Edit")}
                </Btn>
                <Btn
                  color="transparent"
                  className="bottom_btn"
                  disabled={address?.Type === "Billing"}
                  onClick={() => {
                    setDeleteId(address);
                    setModal("remove");
                  }}
                >
                  {t("Remove")}
                </Btn>
              </div>
            </div>
          </div>
        </Col>
        </>
      ))}
      <ConfirmDeleteModal modal={modal == "remove"} setModal={setModal} loading={isLoading} confirmFunction={removeAddress} setDeleteId={setDeleteId} />
    </Row>
  );
};

export default AddressData;
