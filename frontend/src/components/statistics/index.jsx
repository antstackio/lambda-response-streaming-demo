import { Statistic } from "antd";
import {
  FieldTimeOutlined,
  CloudDownloadOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

const icons = {
  ttfb: (
    <>
      <FieldTimeOutlined /> {"Time To First Byte"}
    </>
  ),
  apiTime: (
    <>
      <CloudDownloadOutlined /> {"Total API Time"}
    </>
  ),
  ddbItems: (
    <>
      <DatabaseOutlined /> {"DynamoDB Records"}
    </>
  ),
};

const GenericStatistic = (props) => {
  return <Statistic title={icons[props.title]} value={props.value} />;
};
export default GenericStatistic;
