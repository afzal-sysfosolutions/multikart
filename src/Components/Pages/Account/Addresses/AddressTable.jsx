import AccountContext from "@/Context/AccountContext";
import { useContext } from "react";

const AddressTable = ({ address }) => {
  const { accountData, ShippingID } = useContext(AccountContext);
  return (
    <>
      <div className="top">
        <h6 className="d-flex justify-content-between align-items-center">
          <p> <input type="radio" className="form-check-input form-check-input mx-2 mb-2" checked={address?.Type === "Billing" || address?.AddressId === ShippingID} readOnly/>
          {address?.FullName}</p>
        <span>{address?.Type}</span>
        </h6>
      </div>
      <div className="middle mt-0">
        <div className="address">
          <p>{address?.FlatHouseBuildingNo}, {address?.CityName}</p>
          <p className="d-inline">{address?.StateName}, {address?.CountryName}, </p><p className="d-inline">{address?.Pincode},</p>
          <span><p className="d-inline"> Phone : +91 {address?.MobileNo}
          </p></span>
        </div>
        {/* <div className="number">
          <p>
            Phone: +91 {address?.MobileNo}
          </p>
        </div> */}
      </div>
    </>
  );
};

export default AddressTable;
