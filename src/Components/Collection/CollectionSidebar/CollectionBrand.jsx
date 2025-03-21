import NoDataFound from "@/Components/Widgets/NoDataFound";
import BrandContext from "@/Context/BrandContext";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AccordionBody, Input, Label } from "reactstrap";

const CollectionBrand = ({ filter, setFilter, BrandList }) => {
  const [category,brand, attribute, price, rating, sortBy, field, layout] = useCustomSearchParams(["category", "brand", "attribute", "price", "rating", "sortBy", "field", "layout"]);
  const { brandState,isLoading,refetch } = useContext(BrandContext);
  const [Brand, setBrand] = useState(null)
  const { t } = useTranslation("common");
  
  useEffect(() => {
    refetch();
  }, []);

  // useEffect(() => {
  //   !isLoading && setShowList(brandState);
  // }, [brandState,isLoading]);

  const router = useRouter();
  const pathname = usePathname();
  const hasValue = (item, term) => {
    let valueToReturn = false;
    if (item && item["name"] && item["name"].toLowerCase().includes(term?.toLowerCase())) {
      valueToReturn = true;
    }
    return valueToReturn;
  };
  const handleChange = (event) => {
    const keyword = event.target.value;
    if (keyword !== "") {
      const updatedData = [];
      brandState?.forEach((item) => {
        hasValue(item, keyword) && updatedData.push(item);
      });
      setShowList(updatedData);
    } else {
      setShowList(brandState);
    }
  };
  const redirectToCollection = (event, slug) => {
    event.preventDefault();
    let temp = [...filter?.brand];

    if (!temp.includes(slug)) {
      temp.push(slug);
    } else {
      temp = temp.filter((elem) => elem !== slug);
    }
    setFilter((prev) => {
      return {
        ...prev,
        brand: temp,
      };
    });
    if (temp.length > 0) {
      const queryParams = new URLSearchParams({ ...category, ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout, brand: temp }).toString();
      router.push(`${pathname}?${queryParams}`);
    } else {
      const queryParams = new URLSearchParams({ ...category, ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout }).toString();
      router.push(`${pathname}?${queryParams}`);
    }
  };

  const SetBrandFilter = (BrandID)=>{
     // setting params
    if(brand?.brand !== BrandID.toString() && !category && !price ){
      router.push(`${pathname}?brand=${BrandID}`);
    }
      if(brand?.brand !== BrandID.toString() &&  category && !price){
      router.push(`${pathname}?category=${category?.category}&brand=${BrandID}`);
    }
    if(brand?.brand !== BrandID.toString() && price && !category){
      router.push(`${pathname}?brand=${BrandID}&price=${price?.price}`);
    }
    if(brand?.brand !== BrandID.toString() && price && category){
      router.push(`${pathname}?category=${category?.category}&brand=${BrandID}&price=${price?.price}`);
    }
    
    if(brand?.brand === BrandID.toString() && !category && !price){
      return router.push(`${pathname}`)
    }

    if(brand?.brand === BrandID.toString() && category && !price){
      return router.push(`${pathname}?category=${category?.category}`)
    }

    if(brand?.brand === BrandID.toString() && price && !category){
      return router.push(`${pathname}?price=${price?.price}`)
    }

    if(brand?.brand === BrandID.toString() && category && price){
      return router.push(`${pathname}?category=${category?.category}&price=${price?.price}`)
    }

  

  


    
  }

  return (
    <div className="collapse show accordion-collapse collapsed ">
      <AccordionBody accordionId="2" className=" collection-brand-filter ">
        {brandState.length > 5 && (
          <div className="theme-form search-box">
            <Input type="search" placeholder={t("Search")} onChange={handleChange} />
          </div>
        )}
        <div className="custom-sidebar-height">
          {BrandList?.length > 0 ? (
            <ul className="shop-category-list ">
              {BrandList?.map((elem, i) => (
                <li key={i}>
                  <div className="form-check collection-filter-checkbox"> 
                    <Input className="checkbox_animated" type="checkbox" checked={brand?.brand === elem?.BrandId.toString()} id={elem?.BrandId} onChange={(e)=> {SetBrandFilter(elem?.BrandId); setBrand(elem?.BrandId) }}/>
                    <Label className="form-check-label" htmlFor={elem?.BrandName}>
                      <span className="name">{elem?.BrandName}</span>
                    </Label>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <NoDataFound customClass="search-not-found-box" title="NoBrandFound" />
          )}
        </div>
      </AccordionBody>
    </div>
  );
};

export default CollectionBrand;
