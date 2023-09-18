import { IconButton } from "./button";
import styles from "./login.scss";
import styles2 from "./auth.module.scss";
import CloseIcon from "../icons/close.svg";
import { useNavigate } from "react-router-dom";
import { Path } from "../constant";
import React, { useState, useEffect } from 'react';

import Locale from "../locales";

import BotIcon from "../icons/bot.svg";
import { useAccessStore } from "../store";
import { getClientConfig } from "../config/client";



export function LoginPage() {
  const navigate = useNavigate();
  const access = useAccessStore();
  const accessStore = useAccessStore();
  const [buttonText] = useState("立即购买");
  const goHome = () => navigate(Path.Home);

  //网页传递地址参数功能
  // 新增的处理函数，用于设置地址参数并导航到 web.tsx
  const handleOpenWeb = (url: string, mian_title: string, submai_title: string) => {
    navigate(`/web/${encodeURIComponent(url)}/${encodeURIComponent(mian_title)}/${encodeURIComponent(submai_title)}`);
  };
  //结束

  useEffect(() => {
    if (getClientConfig()?.isApp) {
      navigate(Path.Settings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
              onClick={() => navigate(Path.Home)}
            />
          </div>
        </div>
      </div>
      <div className={styles2["auth-page"]}>
        <div className={`no-dark ${styles2["auth-logo"]}`}>
          <BotIcon />
        </div>

        <div className={styles2["auth-title"]}>{Locale.Auth.Title}</div>
        <div className={styles2["auth-tips"]}>{Locale.Auth.Tips}</div>


        <input
          className={styles2["auth-input"]}
          type="text"
          placeholder={Locale.Auth.Input}
          value={accessStore.token}
          onChange={(e) => {
            access.updateToken(e.currentTarget.value);
          }}
        />

        <div className={styles2["auth-actions"]}>
          <IconButton
            text={Locale.Auth.Confirm}
            type="primary"
            onClick={goHome}
          />
          {/* 返回按钮 */}
          {/* <IconButton text={Locale.Auth.Later} onClick={goHome} /> */}
          {/* <IconButton text="立即购买" onClick={() => window.open(HELP_URL, '_blank')} /> */}
          <IconButton text={buttonText} onClick={() => handleOpenWeb('https://j.apagpt.com/help', '使用说明', '购买API key')} />
          
        {/* 你可以将上述的 'https://www.baidu.com' 替换为你想要的地址参数 */}

        </div>


      </div>
    </div>
  );
}
