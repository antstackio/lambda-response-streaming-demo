import { useEffect, useState } from "react";
import { apiCallStreamingResponse } from "../../utils/api";
import GenericTable from "../../components/table";
import { Statistic, Row, Space, Typography, Image } from "antd";
import responseStreamingImage from "../../assets/responseStreamingApi.svg";

const ResponseStreamTable = () => {
  const [data, setData] = useState([]);
  const [ttfb, setTtfb] = useState("0");
  const [apiTime, setApiTime] = useState("0");
  const [ddbItems, setDdbItems] = useState("0");
  const [ddbItemsSize, setDdbItemsSize] = useState("0");

  const responseStreamingTableRender = {
    tableData: data,
    scroll: {
      // to be used in conjunction with "width" property in table headers data
      y: "30vh",
    },
  };

  useEffect(() => {
    apiCallStreamingResponse(
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
      <Title level={4}>{"Response Streaming API"}</Title>

      <div style={{ height: "120px" }}>
        <Image height={"100%"} src={responseStreamingImage} />
      </div>
      <Row>
        <Space size="small">
          <Statistic title="Time To First Byte" value={ttfb} />
          <Statistic title="API Time" value={apiTime} />
          <Statistic title="# DynamoDB Records" value={ddbItems} />
          {/* <Statistic title="Data Size" value={ddbItemsSize} /> */}
        </Space>
      </Row>
      <GenericTable {...responseStreamingTableRender} />
    </>
  );
};
export default ResponseStreamTable;
