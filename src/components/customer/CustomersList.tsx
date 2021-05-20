import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Button, notification, Tooltip, Modal, Space} from 'antd';
import { Typography } from 'antd';
import axios from "axios";
import {AddCustomer} from "./AddCustomer"
import { EyeOutlined, DeleteOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { IconType } from "antd/lib/notification";
import { Link } from "react-router-dom";
import { isMobile } from 'react-device-detect';
interface Props {

}
const { Title } = Typography;
export const CustomersList = (props: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading , setIsLoading] = useState(false)

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };
    const [data, setCustomersList] = useState([]);
    const getuserList = () => {
      setIsLoading(true) ; 
        axios.get("http://localhost:8000/api/customers").then((response) => {
            console.log(response.data);
            setCustomersList(response.data.map((data: any) => {
                return (
                    {
                      firstName: data.firstName,
                      lastName: data.lastName,
                      email: data.email,

                        key: data.id,
                        actions: data.id
                    }
                )
            }));
            setIsLoading(false) ; 
        })
        .catch((error)=> {
          openNotificationWithIcon("error");
          setIsLoading(false) ; 
        });

    }
    useEffect(() => {
      getuserList();
    }, []);
    const openNotificationWithIcon = (type: any) => {
        notification[type as IconType]({
            message: " done",
            top: 125,
        });
    };

    const reloadAfterSave=() => {
      getuserList();
    }
    const deleteRow = (values: any) => {
        // axios
        // .delete("http://localhost:8000/api/customers/" + values, )
        // .then((res) => {
        //   console.log(res);
         
        //     axios.get("http://localhost:8000/api/customers").then((response) => {
        //       console.log(response.data);
        //       setCustomersList(response.data.map((data:any)=>{ return(
        //         {name:data.name,
        //           key:data._id,
        //           actions:data._id
        //         }
        //       )}));
              
        //     });
         
        //   openNotificationWithIcon("success");
        // })
        // .catch((err) => {
        //   console.log(err);
        // });
        
        console.log(values);
      };
    const columns = [
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
          title: "Last Name",
          dataIndex: "lastName",
          key: "lastName",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (Actions: string) => {
                return (
                    <div>
                        <Tooltip title={"edit"}>
                <Link
                  to={{
                    pathname: `/edit/${Actions}`,
                  }}
                >
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<UnorderedListOutlined />}
                    size="small"
                  />
                </Link>
              </Tooltip>
        
                        <Tooltip title={"Delete"}>
                <Button
                   onClick={(e) => deleteRow(Actions)}
                  type="primary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  size="small"
                />
            </Tooltip>
                    </div>
                );
            },
        },
    ];
    return (
        <div>
            
      <Modal width={!isMobile ? "60vw":undefined} title="Add customer" visible={isModalVisible} onCancel={handleCancel} onOk={handleOk} footer={null} >
        <AddCustomer handleCancel={handleCancel} reloadAfterSave={reloadAfterSave} />
      </Modal>
            <Row justify="end">
          
                <Col style={{margin: '25px' }}>
                    <Link to="#"> <Button  onClick={showModal} type="primary">Add customer</Button></Link>
                </Col>
                <Col span={24}>
                    <Table dataSource={data} columns={columns} loading={isLoading} />
      </Col>
   
            </Row>
        </div>
    )
}
