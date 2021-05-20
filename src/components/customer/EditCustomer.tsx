
import { Typography } from 'antd';
import { Form, Input, InputNumber, Button,Row,Col,
  } from "antd";

  import { IconType } from "antd/lib/notification";
  import React, { useEffect, useState } from "react";
  import axios from "axios";
import { CustomerForm } from './CustomerForm';
  
const { Title } = Typography;

interface Props {
    match: any;
    history: any;
    location: any;
}

export const EditCustomer = (props: Props) => {
    const [customer, setCustomer]= useState(Object) ; 
    const id = props.match.params.id;
    useEffect(() => {
        axios
          .get("http://localhost:8080/api/getFormById/" + id)
          .then((response) => {
            console.log(response.data);
            setCustomer(response.data);
           
          });
      }, []);
    const onFinish = (values: any) => {
        console.log('Success:', values);
      };
    return (
        <div>
            <Row>
      <Col span={24}>
        <h1>{customer.name}</h1>
        <Form  name="customer-form" onFinish={onFinish}>
        
              <Form.Item
                 label={customer.name} 
                 name="firstName"
                 initialValue={customer.name} 
                 rules={[{ required: true, message: 'Please input customer first name!' }]}
                
                
              >
               <Input  />
              </Form.Item>
              <Form.Item
                 label="Last name"
                 name="lastName"
                 initialValue= {`${customer.name}`}
                 rules={[{ required: true, message: 'Please input customer last name!' }]}
              >
               <Input/>
              </Form.Item>
              <Form.Item
                 label="Email"
                 name="email"
                 
                 rules={[{ required: true, message: 'Please input customer email' } ,{ type: "email", message: 'wrong email structure' } ]}
              >
             <Input />
              </Form.Item>
         
               <Button type="primary" htmlType="submit"  >
          Submit
        </Button>
        </Form>
     
      </Col>
    </Row>
        </div>
    )
}
