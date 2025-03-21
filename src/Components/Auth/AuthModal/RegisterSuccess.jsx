import ThemeOptionContext from '@/Context/ThemeOptionsContext';
import React, { useContext } from 'react'
import { Col, Row } from 'reactstrap';

const RegisterSuccess = () => {
      const {  modalState, setmodalState, ModalData, setModalData  } = useContext(ThemeOptionContext);
  return (
    <div>
        <Row>
                <Col className='text-end col-6 pe-0'>
                    <strong>Mobile No  :</strong>
                </Col>
                <Col  className='col-6'>
                    <strong>{ModalData[0]?.MobileNo}</strong> 
                </Col>
                <Col  className='text-end col-6 pe-0'>
                    <strong>Password  :</strong> 
                </Col>
                <Col md="6">
                    <strong>{ModalData[0]?.Password}</strong>
                </Col>
                
                <p className='text-center'>Save your credentials securely.</p>
           
        </Row>
        
    </div>
  )
}

export default RegisterSuccess
