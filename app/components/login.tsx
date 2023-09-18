import { IconButton } from "./button";
import { ErrorBoundary } from "./error";
import styles from "./mask.module.scss";
import "./login.scss";
import CloseIcon from "../icons/close.svg";
import { useNavigate } from "react-router-dom";
import { FileName, Path } from "../constant";
import React, { useState, useEffect } from 'react';
// import articleList from './article';

export function LoginPage() {
  const navigate = useNavigate();
  return (
    <ErrorBoundary>
      <div className={styles["mask-page"]}>
        <div className="window-header">
          <div className="window-header-title">
            <div className="window-header-main-title">
              学习中心
              {/* {Locale.Mask.Page.Title} */}
            </div>
            <div className="window-header-submai-title">
              学习更多ChatGPT使用技巧
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
        <div style={{ padding: '1rem', overflow: 'scroll' }}>
          <div className="LoginConten">
            {/* {articleList.sort((a, b) => a.id - b.id).map((article) => (
              <div key={article.id} className="article" onClick={() => window.open(article.link, '_blank')}>
                <img src={article.image} alt="Article Image" />
                <a>{article.name}</a>
              </div>
            ))} */}
          </div>

        </div>
      </div>
    </ErrorBoundary>
  );
}
