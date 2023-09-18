import { IconButton } from "./button";
import { ErrorBoundary } from "./error";
import styles from "./login.scss";
import styles2 from "./auth.module.scss";
import CloseIcon from "../icons/close.svg";
import { useNavigate } from "react-router-dom";
import { FileName, Path } from "../constant";
import React, { useState, useEffect } from 'react';




import Locale from "../locales";

import BotIcon from "../icons/bot.svg";
import { useAccessStore } from "../store";
import { getClientConfig } from "../config/client";



export function LoginPage() {
  const navigate = useNavigate();
  const access = useAccessStore();
  const accessStore = useAccessStore();


  const [showIframe, setShowIframe] = useState(false);
  const [buttonText, setButtonText] = useState("立即购买");

  const handleBuyNow = () => {
    setShowIframe(!showIframe);
    setButtonText(showIframe ? "立即购买" : "隐藏购买页");
  };

  const goHome = () => navigate(Path.Home);

  useEffect(() => {
    if (getClientConfig()?.isApp) {
      navigate(Path.Settings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
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
              onClick={() => navigate(Path.Home)}
            />
          </div>
        </div>
        <iframe src="https://j.apagpt.com/help" style={{ width: "100%", height: "100%" }} />
    </div>
    

  );
}
