import { Col, Row } from "antd";
import { useState, useRef, useLayoutEffect } from "react";
import GenericHeader from "../../containers/Header";
import {
  chatGPTapiCallStreamingResponse,
  chatGPTapiCallRegularResponse,
} from "../../utils/api";

import { PlayCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { Input, Typography } from "antd";
const { Search } = Input;
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "./ChatGPT.css";
const ChatGPTPage = () => {
  const [data, setData] = useState([]);
  const [dataLoader, setDataLoader] = useState(false);
  const [data2, setData2] = useState([]);
  const [data2Loader, setData2Loader] = useState(false);
  const [init, setInit] = useState(true);

  const dataAutoScroll = useRef(null);
  const data2AutoScroll = useRef(null);

  useLayoutEffect(() => {
    const contentElement = dataAutoScroll.current;
    contentElement.scrollTop = contentElement.scrollHeight;
  }, [data]);

  useLayoutEffect(() => {
    const contentElement = data2AutoScroll.current;
    contentElement.scrollTop = contentElement.scrollHeight;
  }, [data2]);

  const onSearch = (value) => {
    setInit(false);
    chatGPTapiCallStreamingResponse(setData, value, setDataLoader);
    chatGPTapiCallRegularResponse(setData2, value, setData2Loader);
  };

  const chatIcon = () => {
    if (dataLoader === false && data2Loader === false)
      return <PlayCircleOutlined />;
    else return <LoadingOutlined spin />;
  };

  const initContent = {
    respStreaming: "Response Streaming API",
    regular: "Regular API",
  };

  const markdownContent = (dataLoader, data, type) => {
    if (dataLoader === false && init === false) {
      return <ReactMarkdown children={data} remarkPlugins={[remarkGfm]} />;
    } else if (init === true)
      return (
        <Typography.Title level={1}> {initContent[type]} </Typography.Title>
      );
    else
      return (
        <LoadingOutlined
          spin
          style={{
            fontSize: 75,
          }}
        />
      );
  };

  return (
    <>
      <GenericHeader Title="Streaming ChatGPT" />
      <Row style={{ padding: "8px" }}>
        <Search
          placeholder="ask me anything"
          enterButton={chatIcon()}
          size="large"
          onSearch={onSearch}
          className="input-box"
        />
      </Row>

      <Row className="row-style ">
        <Col
          span={12}
          className="ant-col-chatgpt columnStyle columnLeft"
          ref={dataAutoScroll}
          style={{
            justifyContent: init || dataLoader ? "center" : "normal",
            alignItems: init || dataLoader ? "center" : "normal",
          }}
        >
          {markdownContent(dataLoader, data, "respStreaming")}
        </Col>
        <Col
          span={12}
          className="ant-col-chatgpt columnStyle columnRight"
          ref={data2AutoScroll}
          style={{
            justifyContent: init || data2Loader ? "center" : "normal",
            alignItems: init || data2Loader ? "center" : "normal",
          }}
        >
          {markdownContent(data2Loader, data2, "regular")}
        </Col>
      </Row>
    </>
  );
};
export default ChatGPTPage;
