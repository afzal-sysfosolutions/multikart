"use client";
import { Container, Row, Col } from 'reactstrap'
import { ImagePath } from "@/Utils/Constants";
import { useState, useContext } from 'react';
import CartContext from "@/Context/CartContext";
import { usePathname, useRouter } from "next/navigation";

const SuccessOrder = () => {
  const [data, setData] = useState([]);
    const router = useRouter();
  const {orderNumber, setorderNumber} = useContext(CartContext);
  const GotToOderlistPage = (orderNumber)=>{
    router.push(`account/order/details/${orderNumber}`);
  }
  return (
    <Container>
      <Row className='justify-content-center min-vh-100 align-items-center'>
        <Col sm="8" className='text-center'>
          <img src={`${ImagePath}/success_img.png`} className="img-fluid img-md-auto" style={{height:'250px'}}/> 
          <h4 className='text-theme fs-4 fw-bold'>Thank You Mr_A</h4>
          <h4 className='title fs-4 fw-bold px-5'>You order is #{orderNumber} completed successfully!</h4> 
          <Row className='gap-2 justify-content-center my-2'>
            <Col md="4">
                <button type="button" class="btn-solid buy-button btn btn-transparent w-100" onClick={()=> GotToOderlistPage(orderNumber)}>View Order</button>
            </Col>
            <Col md="4">
                <button type="button" class="btn-solid buy-button btn btn-transparent w-100">Continue Shopping</button>
            </Col>
          </Row>
         
        </Col>
      </Row>
    </Container>
  )
}

export default SuccessOrder
