import React from 'react';
import './index.less';

interface IProps {
  title: string;
  onOk: () => void;
  onCancel: () => void;
}
function ConfirmModal({ title, onOk, onCancel }: IProps) {
  return (
    <div styleName="modal">
      <div styleName="mask" />
      <div styleName="content">
        <div styleName="title">{title}</div>
        <div styleName="footer">
          <div styleName="cancel" onClick={onCancel}>
            取消
          </div>
          <div styleName="submit" onClick={onOk}>
            确定
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
