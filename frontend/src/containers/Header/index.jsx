import { Typography, Layout, Image, Divider } from "antd";
import antstackLogo from "../../assets/antstack_type_logo.svg";
const { Title } = Typography;
import "./Header.css";
const { Header } = Layout;

const GenericHeader = (props) => (
  <>
    <Header className="header">
      <a
        href="https://www.antstack.com/"
        target="_blank"
        style={{ marginRight: "16px" }}
      >
        <Image src={antstackLogo} alt="antstack" width={256} preview={false} />
      </a>
      <div>
        <Title style={{ margin: "auto" }} level={3}>
          {props.Title}
        </Title>
        <Title style={{ margin: "auto" }} level={5}>
          How Lambda Response Streaming APIs Beat Regular APIs
        </Title>
      </div>
    </Header>
    <Divider style={{ margin: 0 }} />
  </>
);
export default GenericHeader;
