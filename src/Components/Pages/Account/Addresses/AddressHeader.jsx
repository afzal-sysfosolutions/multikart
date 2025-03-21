import CustomModal from "@/Components/Widgets/CustomModal";
import NoDataFound from "@/Components/Widgets/NoDataFound";
import AccountContext from "@/Context/AccountContext";
import Btn from "@/Elements/Buttons/Btn";
import { AddressAPI } from "@/Utils/AxiosUtils/API";
import useCreate from "@/Utils/Hooks/useCreate";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiAddLine } from "react-icons/ri";
import { Card, CardBody } from "reactstrap";
import AddAddressForm from "./AddAddressForm";
import AddressData from "./AddressData";
import { ImagePath } from "@/Utils/Constants";
import { useCommonService } from "@/Utils/Services/Common";

const AddressHeader = () => {
  const { t } = useTranslation("common");
  const [addressState, setAddressState] = useState([]);
  const [editAddress, setEditAddress] = useState();
  const [addresscount, setaddresscount] = useState(0)
  const {ApiCalling} = useCommonService()
  const [modal, setModal] = useState("");
  const { accountData, refetch, fetchData, clientId } = useContext(AccountContext);
  useEffect(() => {
    accountData?.address.length > 0 && setAddressState((prev) => [...accountData?.address]);
  }, [accountData]);

  // const { mutate, isLoading } = useCreate(AddressAPI, false, false, "Address Added successfully", (resDta) => {
  //   setAddressState((prev) => [...prev, resDta?.data]);
  //   refetch();
  //   setModal("");
  // });

  // const { mutate: editMutate, isLoading: editLoader } = useCreate(`${AddressAPI}/${editAddress?.id}`, false, false, "Address Updated successfully", (resDta) => {
  //   setAddressState((prev) =>
  //     prev.map((elem) => {
  //       if (elem?.id == resDta?.data?.id) {
  //         return (elem = resDta?.data);
  //       } else {
  //         return elem;
  //       }
  //     })
  //   );
  //   refetch();
  //   setModal("");
  //   setEditAddress("");
  // });

  const FetchUserAddress = async()=>{
    const clientID = localStorage.getItem('ClientId')
    const OBJ = {
      para:JSON.stringify({ClientId:clientID, ActionMode:'Select'}),
      procName:'DeliveryAddress'
    }
    const res = await ApiCalling(OBJ);
    // console.log(res);
    setAddressState(res)
    setaddresscount(res.length)
  }

  useEffect(()=>{
    FetchUserAddress()
  },[fetchData])

  return (
    <Card>
      <CardBody>
        <div className="top-sec">
          <h3>{t("Billing Address")}</h3>
          {/* <Btn tag="a" size="sm" color="transparent" className=" btn-solid" onClick={() => setModal("add")}>
            + {t("Add New")}
          </Btn> */}
        </div>
        {addressState?.length > 0 ? (
          <>
            <div className="address-book-section">
              <AddressData addressState={addressState} setAddressState={setAddressState} modal={modal} setModal={setModal} setEditAddress={setEditAddress} />
            </div>
          </>
        ) : (
          <NoDataFound customClass="no-data-added" imageUrl={`/assets/svg/empty-items.svg`} title="NoAddressFound" description="NoAddressDescription" height="300" width="300" />
        )}

        <div className="checkout-detail">
          <CustomModal addressState={addressState} modal={modal == "add" || modal == "edit" ? true : false} setModal={setModal} classes={{ modalClass: "theme-modal-2 view-modal address-modal", title: modal == "add" ? "Add Address" : "Edit Address" }}>
            <div className="right-sidebar-box">
              <AddAddressForm setModal={setModal} addresscount={addresscount} modal={modal} editValues={addressState} setEditAddress={setEditAddress} editAddress={editAddress}/>
              {/* <AddAddressForm mutate={modal == "add" ? mutate : editMutate} method={modal == "add" ? "POST" : ""} isLoading={isLoading || editLoader} setModal={setModal} setEditAddress={setEditAddress} editAddress={editAddress} modal={modal} setAddressState={setAddressState} /> */}
            </div>
          </CustomModal>
        </div>
      </CardBody>
    </Card>
  );
};

export default AddressHeader;
