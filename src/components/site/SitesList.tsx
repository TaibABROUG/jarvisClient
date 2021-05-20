import React, { useEffect, useState } from 'react'
import { Row, Col, Table, Button, notification, Tooltip, Modal} from 'antd';
import { Typography } from 'antd';
import axios from "axios";

import { EyeOutlined, DeleteOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { IconType } from "antd/lib/notification";
import { Link } from "react-router-dom";
import { isMobile } from 'react-device-detect';
interface Props {

}
const { Title } = Typography;
export const SitesList = (props: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading , setIsLoading] = useState(false)


    const [data, setSitesList] = useState([]);
    const getuserList = () => {
      setIsLoading(true) ; 
        axios.get("http://localhost:8000/api/sites").then((response) => {
            console.log(response.data);
            setSitesList(response.data.map((data: any) => {
                return (
                    { id: data.id,
                      name: data.name,
                      userName: data.user.firstName,
                      userEmail: data.user.email,

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
            message: " template deleted Successfully",
            top: 125,
        });
    };

    const reloadAfterSave=() => {
      getuserList();
    }
    const deleteRow = (values: any) => {
        axios
        .delete("http://localhost:8000/api/sites/" + values, )
        .then((res) => {
          console.log(res);
         
            axios.get("http://localhost:8000/api/sites").then((response) => {
              console.log(response.data);
              setSitesList(response.data.map((data:any)=>{ return(
                { id: data.id,
                  name: data.name,
                  userName: data.user.firstName,
                  userEmail: data.user.email,
                  key: data.id,
                  actions: data.id
                }
              )}));
              
            });
         
          openNotificationWithIcon("success");
        })
        .catch((err) => {
          console.log(err);
        });
        
        console.log(values);
      };
    const columns = [
      {
        title: "user name",
        dataIndex: "userName",
        key: "name",
    },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
          title: "id site",
          dataIndex: "id",
          key: "id",
      },
      
      {
        title: "Email",
        dataIndex: "userEmail",
        key: "userEmail",
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
            
            <Row justify="end">
                <Col span={24}>
                    <Table dataSource={data} columns={columns} loading={isLoading} />
      </Col>
            </Row>
        </div>
    )
}
