import { useEffect, useState } from 'react';
import { apiCallStreamingResponse } from '../../utils/api';
import GenericTable from '../../components/table';
import { Row, Space, Typography, Image } from 'antd';
import responseStreamingImage from '../../assets/responseStreamingApi.svg';
import GenericStatistic from '../../components/statistics';

const ResponseStreamTable = () => {
  const [data, setData] = useState([]);
  const [ttfb, setTtfb] = useState('0');
  const [apiTime, setApiTime] = useState('0');
  const [ddbItems, setDdbItems] = useState('0');
  const [ddbItemsSize, setDdbItemsSize] = useState('0');

  const responseStreamingTableRender = {
    tableData: data,
    scroll: {
      // to be used in conjunction with "width" property in table headers data
      y: '30vh',
    },
  };

  useEffect(() => {
    apiCallStreamingResponse(setData, setTtfb, setApiTime, setDdbItems, setDdbItemsSize);
  }, []);

  const { Title } = Typography;
  return (
    <>
      <Title level={4}>{'Response Streaming API - Scan Table '}</Title>

      <div style={{ height: '120px' }}>
        <Image height={'100%'} src={responseStreamingImage} />
      </div>
      <Row>
        <Space size='small'>
          <GenericStatistic {...{ title: 'ttfb', value: ttfb }} />
          <GenericStatistic {...{ title: 'apiTime', value: apiTime }} />
          <GenericStatistic {...{ title: 'ddbItems', value: ddbItems }} />
          {/* <Statistic title="Data Size" value={ddbItemsSize} /> */}
        </Space>
      </Row>
      {/* <GenericTable {...responseStreamingTableRender} /> */}
    </>
  );
};
export default ResponseStreamTable;
