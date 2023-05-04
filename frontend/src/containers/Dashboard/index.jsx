import { Col, Row } from 'antd';
import ResponseStreamTableScan from '../../features/ResponseStreamAPITableScan';
import ResponseStreamTableQuery from '../../features/ResponseStreamAPITableQuery';
import RegularTableScan from '../../features/RegularAPITableScan';
import RegularTableQuery from '../../features/RegularAPITableQuery';
import GenericHeader from '../Header';
import './Dashboard.css';

const Dashboard = () => (
  <>
    <GenericHeader />
    <Row>
      <Col span={12} className='columnStyle columnLeft'>
        <ResponseStreamTableScan />
        <br />
        <ResponseStreamTableQuery />
      </Col>
      <Col span={12} className='columnStyle columnRight'>
        <RegularTableScan />
        <br />
        <RegularTableQuery />
      </Col>
    </Row>
  </>
);
export default Dashboard;
