import { Table } from "antd";
import { tableColumns } from "../../utils/constants";
import { LoadingOutlined } from "@ant-design/icons";
import "./Table.css";

const GenericTable = (props) => {
  return (
    <Table
      columns={tableColumns(props.headerSource)}
      dataSource={props.tableData}
      size="small"
      scroll={props.scroll ? props.scroll : undefined}
      loading={
        props.tableData.length > 1
          ? false
          : {
              indicator: <LoadingOutlined spin />,
              size: "large",
            }
      }
    />
  );
};
export default GenericTable;
