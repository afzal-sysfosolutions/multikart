"use client";
import request from "@/Utils/AxiosUtils";
import { ThemeOptionsAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ThemeOptionContext from ".";
import { ThemeOptionData } from "@/Data/Themeoption/ThemeOptionData";


const ThemeOptionProvider = (props) => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [modalState, setmodalState] = useState('login')
  const [openOffCanvas, setOpenOffCanvas] = useState(false);
  const [paginationDetails, setPaginationDetails] = useState({});
  const [cartCanvas, setCartCanvas] = useState(false);
  const [mobileSideBar, setMobileSideBar] = useState(false);
  const [collectionMobile, setCollectionMobile] = useState(false);
  const [themeOption, setThemeOption] = useState({});
  const [ModalData, setModalData] =useState([])
  const [variant, setVariant] = useState("");

  useEffect(() => {
    if (ThemeOptionData) {
      setThemeOption(ThemeOptionData?.options);
    }
  }, []);

  return (
    <>
      <ThemeOptionContext.Provider value={{ ...props, setVariant, variant,  openAuthModal, setOpenAuthModal,modalState, setmodalState, themeOption, setModalData, ModalData,  openOffCanvas, paginationDetails, setPaginationDetails, setOpenOffCanvas, cartCanvas, setCartCanvas, mobileSideBar, setMobileSideBar, collectionMobile, setCollectionMobile }}>{props.children}</ThemeOptionContext.Provider>
    </>
  );
};

export default ThemeOptionProvider;