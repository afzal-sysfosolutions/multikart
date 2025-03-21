"use client";
import AccountProvider from "@/Context/AccountContext/AccountProvider";
import BlogProvider from "@/Context/BlogContext/BlogProvider";
import BlogIdsProvider from "@/Context/BlogIdsContext/BlogIdsProvider";
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import BrandProvider from "@/Context/BrandContext/BrandProvider";
import BrandIdsProvider from "@/Context/BrandIdsContext/BrandIdsProvider";
import CartProvider from "@/Context/CartContext/CartProvider";
import CategoryProvider from "@/Context/CategoryContext/CategoryProvider";
import CompareProvider from "@/Context/CompareContext/CompareProvider";
import CurrencyProvider from "@/Context/CurrencyContext/CurrencyProvider";
import ProductProvider from "@/Context/ProductContext/ProductProvider";
import ProductIdsProvider from "@/Context/ProductIdsContext/ProductIdsProvider";
import SettingProvider from "@/Context/SettingContext/SettingProvider";
import ThemeOptionProvider from "@/Context/ThemeOptionsContext/ThemeOptionProvider";
import WishlistProvider from "@/Context/WishlistContext/WishlistProvider";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import SubLayout from "./SubLayout";

const MainLayout = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  function generateID() {
    return Math.random().toString(36).substr(2, 16); // Random ID generate
}
  useEffect(() => {
    let cookies = document.cookie.split("; ").find(row => row.startsWith("userID="));

    if (!cookies) {
        let userID = generateID();
        document.cookie = `userID=${userID}; path=/; max-age=31536000`; // 1 saal valid
        console.log("New Cookie Set:", userID);
    } else {
        console.log("Existing Cookie:", cookies.split("=")[1]);
    }
}, []);


  return (
    <>
      
      <QueryClientProvider client={queryClient}>
        <Hydrate state={children.dehydratedState}>
          {/* <SettingProvider> */}
            <CompareProvider>
              <CategoryProvider>
                <BlogProvider>
                  <ThemeOptionProvider>
                    <BrandProvider>
                      {/* <CurrencyProvider> */}
                        <ProductIdsProvider>
                          <AccountProvider>
                            <CartProvider>
                              <WishlistProvider>
                                <BrandIdsProvider>
                                  <BlogIdsProvider>
                                    <ProductProvider>
                                    <SkeletonTheme baseColor="#f1e7e2" highlightColor="#f3d8cb">
                                      <SubLayout children={children} />
                                      </SkeletonTheme>
                                    </ProductProvider>
                                  </BlogIdsProvider>
                                </BrandIdsProvider>
                              </WishlistProvider>
                            </CartProvider>
                          </AccountProvider>
                        </ProductIdsProvider>
                      {/* </CurrencyProvider> */}
                    </BrandProvider>
                  </ThemeOptionProvider>
                </BlogProvider>
              </CategoryProvider>
            </CompareProvider>
          {/* </SettingProvider> */}
        </Hydrate>
      </QueryClientProvider>
    
      <ToastContainer autoClose={2000} theme="colored" />
    </>
  );
};

export default MainLayout;
