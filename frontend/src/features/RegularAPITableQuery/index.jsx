import { useEffect, useState } from 'react';
import { apiCallRegularResponse } from '../../utils/api';
import GenericTable from '../../components/table';
import { Statistic, Row, Space, Typography, Image, Alert } from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';
import GenericStatistic from '../../components/statistics';

import regularApiImage from '../../assets/regularApi.svg';

const RegularTable = () => {
  const [data, setData] = useState([]);
  const [ttfb, setTtfb] = useState('0');
  const [apiTime, setApiTime] = useState('0');
  const [ddbItems, setDdbItems] = useState('0');
  const [ddbItemsSize, setDdbItemsSize] = useState('0');
  const [coldStart, setColdStart] = useState(false);

  const regularTableRender = {
    tableData: data,
    scroll: {
      // to be used in conjunction with "width" property in table headers data
      y: '30vh',
    },
  };

  useEffect(() => {
    apiCallRegularResponse(setData, setTtfb, setApiTime, setDdbItems, setDdbItemsSize, setColdStart, true);
  }, []);

  const { Title } = Typography;
  return (
    <>
      <Title level={4}>{'Regular API - Query Table'}</Title>
      <div style={{ height: '120px' }}>
        <Image height={'100%'} src={regularApiImage} />
      </div>
      {coldStart ? <Alert message='Cold Start' type='error' /> : null}

      <Row>
        <Space size='medium'>
          <GenericStatistic {...{ title: 'ttfb', value: ttfb }} />
          <GenericStatistic {...{ title: 'apiTime', value: apiTime }} />
          <GenericStatistic {...{ title: 'ddbItems', value: ddbItems }} />
          {/* <Statistic title="Data Size" value={ddbItems} /> */}
        </Space>
      </Row>
      {/* <GenericTable {...regularTableRender} /> */}
    </>
  );
};
export default RegularTable;
