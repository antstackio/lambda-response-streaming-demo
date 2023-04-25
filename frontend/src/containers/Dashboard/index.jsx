import { Col, Row } from "antd";
import ResponseStreamTable from "../../features/ResponseStreamAPITable";
import RegularTable from "../../features/RegularAPITable";
import logo from "../../assets/antstack_type_logo.svg";

import "./Dashboard.css";
//trigger
const Dashboard = () => (
  <>
  <div className="logo">
    <a href="https://www.antstack.com/" target="_blank">

    <img src={logo} alt="atstack"/>
    </a>
  </div>
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
export default Dashboard;
