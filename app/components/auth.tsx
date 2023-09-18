import styles from "./auth.module.scss";
import { IconButton } from "./button";
import CloseIcon from "../icons/close.svg";
import { useNavigate } from "react-router-dom";
import { Path,HELP_URL } from "../constant";
import { useAccessStore } from "../store";
import Locale from "../locales";

import BotIcon from "../icons/bot.svg";
import { useEffect,useState } from "react";
import { getClientConfig } from "../config/client";
import { ErrorBoundary } from "./error";
import {
  Input,
  List,
  ListItem,
  Modal,
  PasswordInput,
  Popover,
  Select,
  showConfirm,
  showToast,
} from "./ui-lib";



import ReturnIcon from "../icons/return.svg";




export function AuthPage() {
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
    <ErrorBoundary>
    
    <div className="window-header" data-tauri-drag-region>
        <div className="window-header-title">
          <div className="window-header-main-title">
            {Locale.Settings.Title}
          </div>
          <div className="window-header-sub-title">
            {Locale.Settings.SubTitle}
          </div>
        </div>
        <div className="window-actions">
          <div className="window-action-button"></div>
          <div className="window-action-button"></div>
          <div className="window-action-button">
            <IconButton
              icon={<CloseIcon />}
              onClick={() => navigate(Path.Home)}
              bordered
            />
          </div>
        </div>
      </div>
    <div className={styles["auth-page"]}>
      
      <div className={`no-dark ${styles["auth-logo"]}`}>
        <BotIcon />
      </div>

      <div className={styles["auth-title"]}>{Locale.Auth.Title}</div>
      <div className={styles["auth-tips"]}>{Locale.Auth.Tips}</div>

      {/* <input
        className={styles["auth-input"]}
        type="password"
        placeholder={Locale.Auth.Input}
        value={access.accessCode}
        onChange={(e) => {
          access.updateCode(e.currentTarget.value);
        }}
      /> */}

      <input
        className={styles["auth-input"]}
        type="text"
        placeholder={Locale.Auth.Input}
        value={accessStore.token}
        onChange={(e) => {
          access.updateToken(e.currentTarget.value);
        }}
      />


      {/* <PasswordInput
        className={styles["auth-input"]}
        type="password"
        placeholder={Locale.Auth.Input}
        value={accessStore.token}
        onChange={(e) => {
          access.updateToken(e.currentTarget.value);
        }}
      /> */}
    
      <div className={styles["auth-actions"]}>
        <IconButton
          text={Locale.Auth.Confirm}
          type="primary"
          onClick={goHome}
        />
        <IconButton text={Locale.Auth.Later} onClick={goHome} />
        {/* <IconButton text="立即购买" onClick={() => window.open(HELP_URL, '_blank')} /> */}
        <IconButton text={buttonText} onClick={handleBuyNow} />
      </div>

      {showIframe && (
        <iframe src="https://j.apagpt.com/help" style={{ width: "100%", height: "100%" }} />
      )}

      {/* <iframe src="https://j.apagpt.com/help" style={{ width: "100vw", height: "100vh" }} /> */}
    </div>
    
    </ErrorBoundary>
  );
}
