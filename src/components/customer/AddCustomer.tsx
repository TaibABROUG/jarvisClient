
import { Modal, Space, Typography } from 'antd';
import {
  Form, Input, InputNumber, Button, Row, Col, notification
} from "antd";

import { IconType } from "antd/lib/notification";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MailOutlined,
  PhoneOutlined,
  SaveOutlined,
  UserOutlined,
} from '@ant-design/icons';
const { Title } = Typography;
type Props = {
  handleCancel: () => void;
  reloadAfterSave:() =>void;
}


export const AddCustomer = ({ handleCancel ,reloadAfterSave}: Props) => {
const [isLoading,setLoading] = useState(false);
  const [form] = Form.useForm();
  const openNotificationWithIcon = (type: any) => {
    notification[type as IconType]({
      message: " Form added Successfully",
      top: 125,
    });
  };
  const onFinish = (values: any) => {
    console.log("values", values);
    setLoading(true);

    axios
      .post("http://localhost:8000/api/customers", {
        user: values,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        openNotificationWithIcon("success");
        form.resetFields();
        handleCancel();
        


      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        handleCancel();
        reloadAfterSave();
      });

    console.log(values);
  };
  return (
    <div>



      <Row>
        <Col span={24}>

          <Form name="nest-messages" form={form} onFinish={onFinish}>
            <Row gutter={16}>
              <Col md={12} xs={24}  >
                <Form.Item
                label="First name"
                name="firstName"
                rules={[{ required: true, message: 'Please input customer first name!' }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
              </Col>
              <Col md={12} xs={24} >
              <Form.Item
                label="Last name"
                name="lastName"
                rules={[{ required: true, message: 'Please input customer last name!' }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>
              </Col>
            </Row>
            <Row>
            
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input customer email' }, { type: "email", message: 'wrong email structure' }]}
              >
                <Input prefix={<MailOutlined />} />
              </Form.Item>
          
            </Row>
            <Row>
              <Form.Item
                label="Phone"
                name="phone"

              >
                <Input prefix={<PhoneOutlined />} />
              </Form.Item>
              <Form.Item
                label="Mobile"
                name="mobile"

              >
                <Input prefix={<PhoneOutlined />} />
              </Form.Item>

            </Row>
            <Row justify={'center'}>
              <Form.Item>
                <Space>
                <Button
                    size={'middle'}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    size={'middle'}
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                    loading={isLoading}
                  >
                    Save
                  </Button>
                </Space>
              </Form.Item>
            </Row>

          </Form>

        </Col>
      </Row>

    </div>
  )
}
