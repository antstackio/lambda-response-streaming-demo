import { Link } from "react-router-dom";
import DDBImage from "../../assets/amazonDDB.png";
import ChatGPTImage from "../../assets/chatGPT.png";
import GenericHeader from "../../containers/Header";
import PerformanceBenchmarkImage from "../../assets/performance.png"

import { Card } from "antd";
const { Meta } = Card;

const HomePage = () => {
  return (
    <>
      <GenericHeader Title="Lambda Response Streaming"></GenericHeader>
      <div
        style={{
          width: "100vw",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10%",
        }}
      >
        <Link to="/ddb">
          <Card
            style={{
              width: 300,
            }}
            cover={<img src={DDBImage} />}
          >
            <Meta
              title="DynamoDB Use Case"
              description="Supercharge user experience for large tables"
            />
          </Card>
        </Link>
        <Link to="/chat">
          <Card
            style={{
              width: 300,
            }}
            cover={<img style={{ background: "#0ca37f" }} src={ChatGPTImage} />}
          >
            <Meta
              title="ChatGPT Use Case"
              description="Streamlined user experience for advanced chat bots"
            />
          </Card>
        </Link>
        <Link to="/benchmark">
          <Card
            style={{
              width: 300,
            }}
            cover={<img style={{ background: "#8bb6fc" }} src={PerformanceBenchmarkImage} />}
          >
            <Meta
              title="Normalised Scan vs Single Table Query"
              description="Benchmarking the performance of Normalised scan vs single table query"
            />
          </Card>
        </Link>
      </div>
    </>
  );
};
export default HomePage;
