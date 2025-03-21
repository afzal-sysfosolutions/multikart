import WrapperComponent from "@/Components/Widgets/WrapperComponent";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import { useContext, useEffect, useState } from "react";
import CollectionSidebar from "../CollectionSidebar";
import Cookies from "js-cookie";
import MainCollection from "../MainCollection";
import { useCateCollection } from "@/Utils/Services/CateCollection";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { useCommonService } from "@/Utils/Services/Common";
import { useTypeProduct } from "@/Utils/Services/TypeProduct";

const CollectionLeftSidebar = ({  hideCategory, categorySlug }) => {
  const [filter, setFilter] = useState({  brand: [], price: [], attribute: [], rating: [], page: 1, sortBy: "HighToLow", field: "created_at" });
  const { setCollectionMobile } = useContext(ThemeOptionContext);
  const [category, brand, price] = useCustomSearchParams(["category", "brand", "price"]);
  const [CollectionData, setCollectionData] = useState([]);
  const [callApi, setcallApi] =useState(false);
  const [CateList, setCateList] = useState([])
  const [BrandList, setBrandList] = useState([])
  const {ApiCateCalling, loading} =useCateCollection();
  const {ApiCalling} = useCommonService();
  const {ApiProductTypeCalling} = useTypeProduct()

  const FetchCollection = async (ID, Brand, Sort, price)=>{
    const CookieID = Cookies.get('userID');
    setcallApi(true)
    const OBJ ={
      CategoryId: ID || "0", BrandId:Brand, CookieId:CookieID, FilterBy : Sort, Pagination : 0,  ProductName : "", ProductTagId: price}
      const result = await ApiCateCalling(OBJ);
      // console.log(result.length === 0);
      if(result.length === 0){
        setcallApi(false);
        setCollectionData([])
        return;
      }
      setCollectionData(result);
      setcallApi(false)

  }

  const FectFilters = async (id)=>{
    const OBJ ={
      Para:JSON.stringify({CategoryId:id, ActionMode:'GetSubCategory'}),
      procName:'GetCategoryList '
    }
    const OBJ2 ={
      Para:JSON.stringify({CategoryId:id, ActionMode:'BindBrandImage'}),
      procName:'GetCategoryList'
    }
    const CateData = await ApiCalling(OBJ);
    const BrandData = await ApiCalling(OBJ2)
    setCateList(CateData);
    setBrandList(BrandData)
    // console.log(CateData, BrandData);
    
  }

  useEffect(() => {
    // console.log(categorySlug, category, brand, price?.price, "running");  
    setCollectionMobile(false);
    if(!category && !brand && !price){
      FectFilters(categorySlug === "men" ? '1003' : '1002')
      FetchCollection(categorySlug === "men" ? '1003' : '1002', 0, filter?.sortBy)
    }else if(!category && !brand && price){
      FectFilters(categorySlug === "men" ? '1003' : '1002')
      FetchCollection(categorySlug === "men" ? '1003' : '1002', Number(brand?.brand), filter?.sortBy, price?.price)
    }else{
      FetchCollection(category?.category, Number(brand?.brand), filter?.sortBy, price?.price)
    }
  }, [categorySlug, category, brand, price, filter]);

  useEffect(()=>{
    console.log(filter?.sortBy);
    
  }, [filter])
  
  return (
    <WrapperComponent classes={{ sectionClass: "section-b-space collection-wrapper", fluidClass: "container" }} customCol={true}>
      <CollectionSidebar filter={filter} setFilter={setFilter} hideCategory={hideCategory} categorySlug={categorySlug} CategoryData={CateList} BrandList={BrandList}/>
      {!categorySlug && <MainCollection isBanner={true} filter={filter} setFilter={setFilter} />}
      {categorySlug && <MainCollection filter={filter} setFilter={setFilter} categorySlug={categorySlug} CollectionData={CollectionData} callApi={callApi}/>}
    </WrapperComponent>
  );
};

export default CollectionLeftSidebar;
