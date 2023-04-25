import { Col, Row } from "antd";
import ResponseStreamTable from "../../features/ResponseStreamAPITable";
import RegularTable from "../../features/RegularAPITable";
import "./Dashboard.css";

// test commit
const Dashboard = () => (
  <Row>
    <Col span={12} className="columnStyle columnLeft">
      <ResponseStreamTable />
    </Col>
    <Col span={12} className="columnStyle columnRight">
      <RegularTable />
    </Col>
  </Row>
);
export default Dashboard;
