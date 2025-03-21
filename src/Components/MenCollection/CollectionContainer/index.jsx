import WrapperComponent from "@/Components/Widgets/WrapperComponent";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import { useContext, useEffect, useState } from "react";
import CollectionSidebar from "./CollectionSidebar";
import MainCollection from "./MainCollection";
import { useCommonService } from "@/Utils/Services/Common";

const CollectionContainer = ({ filter, setFilter, hideCategory, categorySlug }) => {
  const { setCollectionMobile } = useContext(ThemeOptionContext);
    const {ApiCalling} = useCommonService();
    const [CateList, setCateList] = useState([])
    const [BrandList, setBrandList] = useState([])

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
    setCollectionMobile(false);
  }, []);
  return (
    <WrapperComponent classes={{ sectionClass: "section-b-space collection-wrapper", fluidClass: "container" }} customCol={true}>
      <CollectionSidebar filter={filter} setFilter={setFilter} hideCategory={hideCategory} categorySlug={categorySlug} CategoryData={CateList} BrandList={BrandList}/>

        <MainCollection isBanner={true} filter={[]} setFilter={[]} categorySlug={[]}/>
        {/* <MainCollection filter={[]} setFilter={[]} categorySlug={[]} /> */}
      {/* {!categorySlug && <MainCollection isBanner={true} filter={[]} setFilter={[]} />}
      {categorySlug && <MainCollection filter={[]} setFilter={[]} categorySlug={[]} />} */}
    </WrapperComponent>
  );
};

export default CollectionContainer;
