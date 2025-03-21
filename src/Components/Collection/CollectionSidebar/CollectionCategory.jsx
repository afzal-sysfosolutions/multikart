import NoDataFound from "@/Components/Widgets/NoDataFound";
import CategoryContext from "@/Context/CategoryContext";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AccordionBody, Input, Label } from "reactstrap";

const CollectionCategory = ({ filter, setFilter, filterData }) => {
  const [category,  brand, attribute, price, rating, sortBy, field, layout] = useCustomSearchParams(["category", "brand", "attribute", "price", "rating", "sortBy", "field", "layout"]);
  // const {  filterCategory } = useContext(CategoryContext);
  // const [showList, setShowList] = useState(filterCategory("product"));
  const [state, setState] = useState(false);
  const { t } = useTranslation("common");
  // console.log(filterData);
  
  const router = useRouter();
  const pathname = usePathname();
  const hasValue = (item, term) => {
    let valueToReturn = false;
    if (item && item["name"] && item["name"].toLowerCase().includes(term?.toLowerCase())) {
      valueToReturn = true;
    }
    item["subcategories"]?.length &&
      item["subcategories"].forEach((child) => {
        if (hasValue(child, term)) {
          valueToReturn = true;
        }
      });
    return valueToReturn;
  };

  const filterCategories = (item, term) => {
    const matchingSubcategories = item.subcategories?.map((subcat) => filterCategories(subcat, term)).filter((subcat) => subcat);

    if (item.name.toLowerCase().includes(term.toLowerCase()) || matchingSubcategories?.length) {
      return {
        ...item,
        subcategories: matchingSubcategories,
      };
    }
    return null;
  };

  const handleChange = (event) => {
    setState(!state);
    const keyword = event.target.value.toLowerCase();
    if (keyword !== "") {
      const updatedData = filterCategory("product")
        ?.map((item) => filterCategories(item, keyword))
        .filter((item) => item);
      setShowList(updatedData);
    } else {
      setShowList(filterCategory("product"));
    }
  };
  const redirectToCollection = (event, slug) => {
    let temp = [...filter?.category];

    if (!temp.includes(slug)) {
      temp.push(slug);
    } else {
      temp = temp.filter((elem) => elem !== slug);
    }
    setFilter((prev) => {
      return {
        ...prev,
        category: temp,
      };
    });
    if (temp.length > 0) {
      const queryParams = new URLSearchParams({ ...brand, ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout, category: temp }).toString();
      router.push(`${pathname}?${queryParams}`);
    } else {
      const queryParams = new URLSearchParams({ ...brand, ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout }).toString();
      router.push(`${pathname}?${queryParams}`);
    }
  };

  const SetFilterCategory = (CateId, field)=>{
    if(category?.category === CateId.toString() && !brand && !price){
      return router.push(`${pathname}`)
    }

    if(category?.category === CateId.toString() && brand && !price){
      return router.push(`${pathname}?brand=${brand?.brand}`)
    }
    if(category?.category === CateId.toString() && price && !brand){
      return router.push(`${pathname}?price=${price?.price}`)
    }
    if(category?.category === CateId.toString() && brand && price){
      return router.push(`${pathname}?brand=${brand?.brand}&price=${price}`)
    }
    // setting params
    if(category?.category !== CateId.toString() && !brand && !price ){
      router.push(`${pathname}?category=${CateId}`);
    }
    if(category?.category !== CateId.toString() &&  brand){
      router.push(`${pathname}?category=${CateId}&brand=${brand?.brand}`);
    }
    if(category?.category !== CateId.toString() && price){
      router.push(`${pathname}?category=${CateId}&price=${price?.price}`);
    }

  }

  return (
    <div className="accordion-collapse collapse show">
      <AccordionBody accordionId="1">
        {filterData.length > 5 && (
          <div className="theme-form search-box">
            <Input placeholder={t("Search")} onChange={handleChange} />
          </div>
        )}

        {filterData?.length > 0 ? <RecursiveCategory SetFilterCategory={SetFilterCategory} redirectToCollection={redirectToCollection} categories={filterData} filter={filter}  selectedCategory={category}/> : <NoDataFound customClass="search-not-found-box" title="NoCategoryFound" />}
      </AccordionBody>
    </div>
  );
};

export default CollectionCategory;

const RecursiveCategory = ({ redirectToCollection, categories, filter, SetFilterCategory, }) => {
  const [category] = useCustomSearchParams(["category"]);
  const [activeMenu, setActiveMenu] = useState(false);
  const [MenuID, setMenuID] =useState(null)
  return (
  <ul className="shop-category-list custom-sidebar-height">
    {categories.map((elem, i) => (
      <li key={i}>
        <div className="form-check collection-filter-checkbox">
          <Input className="form-check-input" type="checkbox" id={i} checked={ category?.category === elem.CategoryId.toString()}  onChange={(e)=> { SetFilterCategory(elem?.CategoryId, e.target.checked); setActiveMenu(e.target.checked); setMenuID(elem?.CategoryId)}}/>
          <Label className="form-check-label" htmlFor={elem?.CategoryName}>
            <span className="name">{elem?.CategoryName}</span>
          </Label>
        </div>
      </li>
    ))}
  </ul>
);
  }