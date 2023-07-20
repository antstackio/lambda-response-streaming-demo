import { Col, Row } from "antd";
import ResponseStreamTable from "../../features/ResponseStreamAPITable";
import RegularTable from "../../features/RegularAPITable";
import GenericHeader from "../../containers/Header";

import "./Ddb.css";
const DDBPage = () => (
  <>
    <GenericHeader Title="Revolutionizing Data Retrieval" />
    <Row>
      <Col span={12} className="columnStyle columnLeft">
        <ResponseStreamTable />
      </Col>
      <Col span={12} className="columnStyle columnRight">
        <RegularTable />
      </Col>
    </Row>
  </>
);
export default DDBPage;
