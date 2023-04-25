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

  const regularTableRender = {
    tableData: data,
    scroll: {
      // to be used in conjunction with "width" property in table headers data
      y: "30vh",
    },
  };

  useEffect(() => {
    apiCallRegularResponse(setData, setTtfb, setApiTime, setDdbItems);
  }, []);

  const { Title } = Typography;
  return (
    <>
      <Title level={2}>{"Regular API"}</Title>
      <div style={{ height: "120px" }}>
        <Image height={"100%"} src={regularApiImage} />
      </div>
      <Row>
        <Space size="large">
          <Statistic title="Time To First Byte (TTFB)" value={ttfb} />
          <Statistic title="API Time" value={apiTime} />
          <Statistic title="DynamoDB Items Processed" value={ddbItems} />
        </Space>
      </Row>
      <GenericTable {...regularTableRender} />
    </>
  );
};
export default RegularTable;
