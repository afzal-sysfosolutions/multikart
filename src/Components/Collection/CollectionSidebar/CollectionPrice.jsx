import { FilterPrice } from "@/Data/CustomData";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AccordionBody, AccordionHeader, AccordionItem, Input, Label } from "reactstrap";

const CollectionPrice = ({ filter, setFilter, attributeAPIData, isOffCanvas }) => {
  const router = useRouter();
  const [category,brand, price] = useCustomSearchParams(["category", "brand", "price",]);
  const [selectID, setselectedID] = useState(null)
  const { t } = useTranslation("common");
  const pathname = usePathname();
  const checkPrice = (value) => {
    if (filter?.price?.indexOf(value) != -1) {
      return true;
    } else return false;
  };
  // const applyPrice = (event) => {
  //   const index = filter?.price.indexOf(event?.target?.value);
  //   let temp = [...filter?.price];
  //   if (event.target.checked) {
  //     temp.push(event?.target?.value);
  //   } else {
  //     temp.splice(index, 1);
  //   }
  //   setFilter((prev) => {
  //     return {
  //       ...prev,
  //       price: temp,
  //     };
  //   });
  //   if (temp.length > 0) {
  //     const queryParams = new URLSearchParams({ ...category, ...attribute, ...sortBy, ...field, ...rating, ...layout, price: temp }).toString();
  //     router.push(`${pathname}?${queryParams}`);
  //   } else {
  //     const queryParams = new URLSearchParams({ ...category, ...attribute, ...sortBy, ...field, ...rating, ...layout }).toString();
  //     router.push(`${pathname}?${queryParams}`);
  //   }
  // };

  const PriceFilter =(id, Amt)=>{
    setselectedID(id)
    // const queryParams = new URLSearchParams({ ...category, ...brand }).toString();
    //   router.push(`${pathname}?${queryParams}&price=${Amt}`);
       // setting params
       if(price?.price !== Amt.toString() && !category && !price ){
        router.push(`${pathname}?price=${Amt}`);
      }
        if(price?.price  !== Amt.toString() &&  category && !brand){
        router.push(`${pathname}?category=${category?.category}&price=${Amt}`);
      }
      if(price?.price  !== Amt.toString() && brand && !category){
        router.push(`${pathname}?brand=${Amt}&price=${price?.price}`);
      }
      if(price?.price !== Amt.toString() && brand && category){
        router.push(`${pathname}?category=${category?.category}&brand=${brand?.brand}&price=${Amt}`);
      }
      
      if(price?.price  === Amt.toString() && !category && !brand){
        return router.push(`${pathname}`)
      }
  
      if(price?.price  === Amt.toString() && category && !brand){
        return router.push(`${pathname}?category=${category?.category}`)
      }
  
      if(price?.price  === Amt.toString() && brand && !category){
        return router.push(`${pathname}?brand=${brand?.brand}`)
      }
  
      if(price?.price === Amt.toString() && category && brand){
        return router.push(`${pathname}?category=${category?.category}&brand=${brand?.brand}`)
      }
  



  }

  return (
    <AccordionItem className={`open ${isOffCanvas ? "col-lg-3" : ""}`}>
      <AccordionHeader targetId={(attributeAPIData?.length + 3).toString()}>
        <span>{t("Price")}</span>
      </AccordionHeader>
      <AccordionBody accordionId={(attributeAPIData?.length + 3).toString()}>
        <div className="custom-sidebar-height">
          <ul className="shop-category-list ">
            {FilterPrice.map((Price, i) => (
              <div key={i} className="form-check collection-filter-checkbox">
                <Input className="checkbox_animated" type="checkbox" id={`price-${Price.id}`} checked={price?.price === Price?.maxPrice?.toString() }   onChange={()=> PriceFilter(Price?.id, Price?.maxPrice)} />
                <Label className="form-check-label" htmlFor={`price-${Price.id}`}>
                  {Price?.price ? (
                    <span className="name">
                      {Price.text} ₹{Price.price}
                    </span>
                  ) : (
                    <span className="name">
                      ₹{Price.minPrice} - ₹{Price.maxPrice}
                    </span>
                  )}
                </Label>
              </div>
            ))}
          </ul>
        </div>
      </AccordionBody>
    </AccordionItem>
  );
};

export default CollectionPrice;
