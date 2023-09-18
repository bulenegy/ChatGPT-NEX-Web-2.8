import { IconButton } from "./button";
import { ErrorBoundary } from "./error";
import styles from "./login.scss";
import styles2 from "./auth.module.scss";
import CloseIcon from "../icons/close.svg";
import { useNavigate,useParams } from "react-router-dom";
import {  Path } from "../constant";
import React, { useEffect } from 'react';

import { getClientConfig } from "../config/client";

export function WebPage() {
  const navigate = useNavigate();
  const goHome = () => navigate(Path.Home);

  useEffect(() => {
    if (getClientConfig()?.isApp) {
      navigate(Path.Settings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 获取地址参数
  const { url } = useParams();
//   const urlParams = new URLSearchParams(window.location.search);
//   const webUrl = urlParams.get('url');
  return (
    <div style={{ height: "100%" }}>
      <div className="window-header">
        <div className="window-header-title">
          <div className="window-header-main-title">
            登录
            {/* {Locale.Mask.Page.Title} */}
          </div>
          <div className="window-header-submai-title">
            开始使用ChatGPT
            {/* {Locale.Mask.Page.SubTitle(allMasks.length)} */}
          </div>
        </div>
        <div className="window-actions">
          <div className="window-action-button">
            <IconButton
              icon={<CloseIcon />}
              bordered
              onClick={() => navigate(-1)}
            />
          </div>
        </div>

      </div>
      <iframe src={decodeURIComponent(url)} style={{ width: "100%", height: "calc(100% - 80px)" }} />
    </div>
  );
}
