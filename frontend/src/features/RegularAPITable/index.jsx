import { useEffect, useState } from "react";
import { apiCallRegularResponse } from "../../utils/api";
import GenericTable from "../../components/table";
import { Statistic, Row, Space, Typography, Image } from "antd";

import regularApiImage from "../../assets/regularApi.svg";

const RegularTable = () => {
  const [data, setData] = useState([]);
  const [ttfb, setTtfb] = useState("0");
  const [apiTime, setApiTime] = useState("0");
  const [ddbItems, setDdbItems] = useState("0");
  const [ddbItemsSize, setDdbItemsSize] = useState("0");

  const regularTableRender = {
    tableData: data,
    scroll: {
      // to be used in conjunction with "width" property in table headers data
      y: "30vh",
    },
  };

  useEffect(() => {
    apiCallRegularResponse(
      setData,
      setTtfb,
      setApiTime,
      setDdbItems,
      setDdbItemsSize
    );
  }, []);

  const { Title } = Typography;
  return (
    <>
      <Title level={4}>{"Regular API"}</Title>
      <div style={{ height: "120px" }}>
        <Image height={"100%"} src={regularApiImage} />
      </div>
      <Row>
        <Space size="medium">
          <Statistic title="Time To First Byte" value={ttfb} />
          <Statistic title="API Time" value={apiTime} />
          <Statistic title="# DynamoDB Records" value={ddbItems} />
          {/* <Statistic title="Data Size" value={ddbItems} /> */}
        </Space>
      </Row>
      <GenericTable {...regularTableRender} />
    </>
  );
};
export default RegularTable;
