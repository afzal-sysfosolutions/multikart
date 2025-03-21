import request from "@/Utils/AxiosUtils";
import { SelfAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import AccountContext from ".";

const AccountProvider = (props) => {
  // const cookies = Cookies.get("uat");
  const [clientId, setClientId] = useState(null);
  const [mobileSideBar, setMobileSideBar] = useState(false);
  const [accountData, setAccountData] = useState();
  const [countryList, setCountryList] = useState([]);
  const [fetchData, setrefetchData] = useState(false);
  const [ShippingID, setShippingID] =useState(null);
  const [isLogin, setisLogin] = useState(false)

  useEffect(() => {
    // Fetch ClientId from localStorage on component mount
    const storedClientId = localStorage.getItem('ClientId');
    if (storedClientId) {
        setClientId(storedClientId);
    }

    // Handle storage changes from other tabs/windows
    const handleStorageChange = (event) => {
        if (event.key === 'ClientId') {
            setClientId(event.newValue);
        }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup event listener on component unmount
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
}, [isLogin]);

  
 
  return <AccountContext.Provider value={{ ...props, accountData, setAccountData, setrefetchData, ShippingID, setShippingID,isLogin, setisLogin, fetchData, countryList,setCountryList, clientId, setClientId,  mobileSideBar, setMobileSideBar }}>{props.children}</AccountContext.Provider>;
};

export default AccountProvider;
