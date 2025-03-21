"use client";
import WrapperComponent from "@/Components/Widgets/WrapperComponent";
import AccountContext from "@/Context/AccountContext";
import CartContext from "@/Context/CartContext";
import SettingContext from "@/Context/SettingContext";
import { ImagePath } from "@/Utils/Constants";
import Image from "next/image";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Loader from "@/Layout/Loader";
import request from "@/Utils/AxiosUtils";
import { AddToCartAPI, AddressAPI } from "@/Utils/AxiosUtils/API";
import Breadcrumbs from "@/Utils/CommonComponents/Breadcrumb";
import useCreate from "@/Utils/Hooks/useCreate";
import { emailSchema, idCreateAccount, nameSchema, phoneSchema } from "@/Utils/Validation/ValidationSchema";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik, Field} from "formik";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useContext, useEffect, useState } from "react";
import { Col, Row, TabPane } from "reactstrap";
import * as Yup from "yup";
import CheckoutForm from "./CheckoutForm";
import CheckoutSidebar from "./CheckoutSidebar";
import DeliveryAddress from "./DeliveryAddress";
import DeliveryOptions from "./DeliveryOptions";
import PaymentOptions from "./PaymentOptions";
import ResponsiveMenuOpen from "../Account/Common/ResponsiveMenuOpen";
import AddressHeader from "../Account/Addresses/AddressHeader";

const CheckoutContent = () => {
  const { accountData, refetch } = useContext(AccountContext);
  // const { settingData } = useContext(SettingContext);
  const [address, setAddress] = useState([]);
  const [activeAdd, setactiveAdd] = useState(1);
  const [showForm, setshowForm] =useState(false)
  const [modal, setModal] = useState("");
  const access_token = Cookies.get("uat");
 

  const path = usePathname();
  const router = useRouter();
  const { cartProducts } = useContext(CartContext);

  useEffect(() => {
    accountData?.address.length > 0 && setAddress((prev) => [...accountData?.address]);
  }, [accountData]);

  const { mutate, isLoading } = useCreate(AddressAPI, false, false, "Address Added successfully", (resDta) => {
    setAddress((prev) => [...prev, resDta?.data]);
    refetch();
    setModal("");
  });

  // Calling Add to Cart API
  const { data: addToCartData, isLoading: addToCartLoader, refetch: addToCartRefatch } = useQuery([AddToCartAPI], () => request({ url: AddToCartAPI }, router), { enabled: false, refetchOnWindowFocus: false, cacheTime: 0, select: (res) => res?.data });

  useEffect(() => {
    access_token && !addToCartLoader && addToCartRefatch();
  }, [addToCartLoader, access_token]);

  const { isLoading: themLoad } = useContext(ThemeOptionContext);

  const addressSchema = Yup.object().shape({
    title: nameSchema,
    street: nameSchema,
    city: nameSchema,
    country_code: nameSchema,
    phone: nameSchema,
    pincode: nameSchema,
    country_id: nameSchema,
    state_id: nameSchema,
  });

  const Add_Address = async()=>{

  }


  if (themLoad) return <Loader />;
  return (
    <Fragment>
      <Breadcrumbs title={"Checkout"} subNavigation={[{ name: "Checkout" }]} />
      <WrapperComponent classes={{ sectionClass: "section-b-space checkout-section-2", fluidClass: "container", }} noRowCol={true} >
        <div className="checkout-page checkout-form dashboard-section section-b-space user-dashboard-section">
          <div className="checkout-form">
            <Row className="g-sm-4 g-3 row">

              {/* <Col className="col-lg-7">
                <Col className="left-sidebar-checkout">
                  <Col className="checkout-detail-box">
                    <Col className="checkout-form-section">
                        {!showForm ? <>
                          <Col className="checkbox-main-box">
                          <div class="checkout-title1"><h2>Select Address</h2></div>
                              <Row className="g-sm-4 g-3 row">
                                <Col className="col-xxl-6 col-12">
                                  <Col className="payment-option">
                                    <div className="payment-category w-100" style={{cursor:'pointer'}}>
                                      <div className="form-check custom-form-check gap-0 hide-check-box w-100 flex-column ">
                                          <div>
                                            <input type="radio" checked className="form-check-input form-check-input" />
                                            <label  class="form-check-label form-label">Rajesh Kumar</label>
                                          </div>
                                          <div>
                                            <p className="py-0 my-0 ms-4">Flat No 609, Eldeco Green Apartments</p>
                                            <p className="py-0 my-0 ms-4">Sector E Aliganj Ring Road Luccknow</p>
                                            <p className="py-0 my-0 ms-4">Mobile No: 8318753610</p>
                                            <p className="ms-4 menu-label bg-danger d-inline-block">Billing</p>
                                          </div>
                                      </div>
                                    </div>
                                  </Col>
                                        </Col> 
                                        <Col className="col-xxl-6 col-12">
                                  <Col className="payment-option">
                                    <div className="payment-category w-100" style={{cursor:'pointer'}}>
                                      <div className="form-check custom-form-check gap-0 hide-check-box w-100 flex-column "  onClick={()=> setactiveAdd(1)}>
                                          <div>
                                            <input type="radio" checked={activeAdd === 1} className="form-check-input form-check-input" />
                                            <label  class="form-check-label form-label">Rajesh Kumar</label>
                                          </div>
                                          <div>
                                          <p className="py-0 my-0 ms-4">Flat No 609, Eldeco Green Apartments</p>
                                          <p className="py-0 my-0 ms-4">Sector E Aliganj Ring Road Luccknow</p>
                                          <p className="py-0 my-0 ms-4">Mobile No: 8318753610</p>
                                          <p className="ms-4 menu-label bg-danger d-inline-block">Shipping</p>
                                          </div>
                                      </div>
                                    </div>
                                  </Col>
                                        </Col> 
                                        <Col className="col-xxl-6 col-12">
                                  <Col className="payment-option">
                                    <div className="payment-category w-100" style={{cursor:'pointer'}}>
                                      <div className="form-check custom-form-check gap-0 hide-check-box w-100 flex-column" onClick={()=> setactiveAdd(2)}>
                                          <div>
                                          <input type="radio" checked={activeAdd === 2}  className="form-check-input" />
                                          <label  className="form-check-label form-label">Rajesh Kumar</label>
                                          </div>
                                          <div>
                                          <p className="py-0 my-0 ms-4">Flat No 609, Eldeco Green Apartments</p>
                                          <p className="py-0 my-0 ms-4">Sector E Aliganj Ring Road Luccknow</p>
                                          <p className="py-0 my-0 ms-4">Mobile No: 8318753610</p>
                                          <p className="ms-4 menu-label bg-danger d-inline-block">Shipping</p>
                                          </div>
                                      </div>
                                    </div>
                                  </Col>
                                        </Col>
                                        <Col className="col-xxl-6 col-12">
                                  <Col className="payment-option">
                                    <div className="payment-category w-100" style={{cursor:'pointer'}}>
                                      <div className="form-check custom-form-check gap-0 hide-check-box w-100 flex-column justify-content-center align-items-center">
                                          <Image src={`${ImagePath}/Plus_button.png`} alt="grid image" height={80} width={80} className="product-2-layout-view mt-2" onClick={()=> setshowForm(!showForm)}/>
                                          <p className="mt-1">Add Shipping address</p> 
                                      </div>
                                    </div>
                                  </Col>
                                        </Col> 
                          </Row> 
                          </Col>
                          <Col className="checkbox-main-box">
                            <div class="checkout-title1"><h2>Payment Details</h2></div>
                            <Row className="g-sm-4 g-3 row">
                              <Col className="col-xxl-6 col-12">
                                  <Col className="payment-option">
                                    <Col className="payment-category w-100">
                                      <Col className="form-check custom-form-check gap-0 hide-check-box w-100">
                                      <input id="cod" class="form-check-input form-check-input" type="radio" checked="" name="payment_method"/>
                                      <label for="cod" class="form-check-label form-label">Cash on Delivery</label>
                                      </Col>
                                    </Col>
                                  </Col>
                              </Col>
                              <Col className="col-xxl-6 col-12">
                                  <Col className="payment-option">
                                    <Col className="payment-category w-100">
                                      <Col className="form-check custom-form-check gap-0 hide-check-box w-100">
                                      <input id="cod" class="form-check-input form-check-input" type="radio" checked="" name="payment_method"/>
                                      <label for="cod" class="form-check-label form-label">Online Payment</label>
                                      </Col>
                                    </Col>
                                  </Col>
                              </Col>
                            </Row>
                          </Col>
                        
                        </>
                          : 
                          <Col className="checkbox-main-box">
                            <div class="checkout-title1"><h2>Fill Your Address</h2></div>
                          <Row className="g-sm-4 g-3 row">
                              <Col className="col-12">
                                  <Formik
                                  initialValues={{}}
                                  validationSchema={{}}
                                  onSubmit={Add_Address}
                                  >
                                     {({ values, setFieldValue, errors }) => (
                                        <Form>
                                          <Row className="checkout-form g-md-4 g-sm-3 g-2">
                                             <Col md="12">
                                                <div className="form-box">
                                                  <label for="name" class="form-label">Name<span class="theme-color required-dot">*</span></label>
                                                  <Field className="form-control" id="name" name="name" placeholder="Enter Title" require="true"/>
                                                </div>
                                              </Col>
                                              <Col md="6">
                                              <div className="form-box">
                                                  <label for="Title" class="form-label">Phone No<span class="theme-color required-dot">*</span></label>
                                                  <Field className="form-control" type="number" id="shipping_address.title" name="shipping_address.title" placeholder="Enter Phone " require="true"/>
                                                </div>
                                              </Col>
                                              <Col md="6">
                                                <div className="form-box">
                                                <label for="Title" class="form-label">Address Type<span class="theme-color required-dot">*</span></label>
                                                <div className="form-control d-flex gap-3">
                                                <label>
                                                <Field  type="checkbox" id="Home" name="addressType"  value="Home"/>
                                                  <span className="ps-2">Home</span>
                                                </label>
                                                <label>
                                                <Field  type="checkbox" id="Office" name="addressType" value="Office"/>
                                                  <span className="ps-2">Office</span>
                                                </label>
                                                <label>
                                                <Field  type="checkbox" id="Other" name="addressType" value="Other"/>
                                                <span className="ps-2">Other</span>
                                                </label>
                                                </div>
                                                </div>
                                              </Col>
                                              <Col md="12">
                                                <div className="form-box">
                                                <label for="Title" class="form-label">Address 1<span class="theme-color required-dot">*</span></label>
                                                <Field className="form-control" type="text" id="shipping_address.title" name="address1" placeholder="Enter Address" require="true"/>
                                                </div>
                                              </Col>
                                              <Col md="12">
                                                <div className="form-box">
                                                <label for="address2" class="form-label">Address 2<span class="theme-color required-dot">*</span></label>
                                                <Field className="form-control" type="text" id="address2" name="address2" placeholder="Enter Address" require="true"/>
                                                </div>
                                              </Col>
                                              <Col md="6">
                                                <div className="form-box">
                                                <label for="Landmark" class="form-label">Landmark<span class="theme-color required-dot">*</span></label>
                                                <Field className="form-control" type="text" id="Landmark" name="Landmark" placeholder="Enter Landmark" require="true"/>
                                                </div>
                                              </Col>
                                              <Col md="6">
                                                <div className="form-box">
                                                   <label for="Landmark" class="form-label">Pincode<span class="theme-color required-dot">*</span></label>
                                                  <Field className="form-control" type="text" id="Landmark" name="Landmark" placeholder="Enter Pincode" require="true"/>
                                                </div>
                                              </Col>
                                              <Col md="6">
                                                <div className="form-box">
                                                  <label for="Title" class="form-label">Country<span class="theme-color required-dot">*</span></label>
                                                  <Field className="form-select" as="select" type="number" id="shipping_address.title" name="shipping_address.title" placeholder="Enter Phone " require="true">
                                                    <option>Select</option>
                                                  </Field>
                                                </div>
                                              </Col>
                                              <Col md="6">
                                                <div className="form-box">
                                                  <label for="Title" class="form-label">State<span class="theme-color required-dot">*</span></label>
                                                  <Field className="form-select" as="select" type="number" id="State" name="State"  require="true">
                                                    <option>Select State</option>
                                                  </Field>
                                                </div>
                                              </Col>
                                              <Col md="6">
                                                <div className="form-box">
                                                <label for="City" class="form-label">City<span class="theme-color required-dot">*</span></label>
                                                <Field className="form-control" type="text" id="City" name="City" placeholder="Enter City" require="true"/>
                                                </div>
                                              </Col>
                                              <Col md="6">
                                                <div className="form-box">
                                                <label for="OTP" class="form-label">OTP Code<span class="theme-color required-dot">*</span></label>
                                                <Field className="form-control" type="text" id="OTP" name="OTP"  require="true"/>
                                                </div>
                                              </Col>
                                              <Col sm="12">
                                                <Row>
                                                  <Col>
                                                     <button className="order-btn btn btn-transparent">
                                                    Submit
                                                  </button>
                                                  </Col>
                                                  <Col>
                                                     <button className="order-btn btn btn-transparent" onClick={()=> setshowForm(!showForm)}>
                                                    Cancel
                                                  </button>
                                                  </Col> 
                                                 </Row>
                                                 
                                              </Col>
                                              </Row>
                                        </Form>
                                     )}

                                  </Formik>
                               </Col> 
                          </Row>
                          </Col>
                          }
                    </Col>
                  </Col>
                </Col>
              </Col> */}
              <Col lg={7}>
                <div className="faq-content">
                <div className="tab-content">
                    <ResponsiveMenuOpen/>
                    <TabPane className="show fade active">
                      <AddressHeader />
                    </TabPane>
                  </div>
                </div>
              </Col>
              <CheckoutSidebar
                    addToCartData={addToCartData}
                    values={[]}
                    setFieldValue={[]}
                    errors={[]}
                  />
            
            </Row>
          </div>
        </div>
      </WrapperComponent>
    </Fragment>
  );
};

export default CheckoutContent;
