import { LoadingOutlined } from "@ant-design/icons";
import {Table, Typography } from "antd";
import benchmarksData from "../../data/benchmark.json"
// import GenericStatistic from "../../components/statistics";

// import regularApiImage from "../../assets/regularApi.svg";

const BenchmarkTable = () => {

  const data = benchmarksData.Benchmarks

  const regularTableRender = {
    tableData: data,
    scroll: {
      // to be used in conjunction with "width" property in table headers data
      y: "60vh",
    },
  };

  const { Title } = Typography;
  return (
    <>
      <Title level={4}>{"Benchmark"}</Title>
      {/* <div style={{ height: "120px" }}>
        <Image height={"100%"} src={regularApiImage} />
      </div> */}
      {/* <Row>
        <Space>
          <GenericStatistic {...{ title: "ttfb", value: 1 }} />
          <GenericStatistic {...{ title: "apiTime", value: 2 }} />
          <GenericStatistic {...{ title: "ddbItems", value: 3 }} />
          <GenericStatistic {...{ title: "Data Size", value: ddbItems }} />
        </Space>
      </Row> */}
      <Table
      columns={[
        {
          title: 'Operation',
          dataIndex: 'Operation',
          key: 'Operation',
        },
        {
          title: 'Normalised Scan',
          dataIndex: 'Normalised Scan',
          key: 'Normalised Scan',
        },
        {
          title: 'Single Table Query',
          dataIndex: 'Single Table Query',
          key: 'Single Table Query',
        },
      ]}
      dataSource={regularTableRender.tableData}
      size="small"
      scroll={regularTableRender.scroll ? regularTableRender.scroll : undefined}
      loading={
        regularTableRender.tableData.length > 1
          ? false
          : {
              indicator: <LoadingOutlined spin />,
              size: "large",
            }
      }
    />
    </>
  );
};
export default BenchmarkTable;
