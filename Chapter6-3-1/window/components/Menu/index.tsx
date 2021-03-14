import React from 'react';
import { ItemProps } from '../List';
import './index.less';

interface IProps {
  isEditStatus: boolean;
  onCancel: () => void;
  onSave: () => void;
  onEdit: () => void;
  currentDiary: ItemProps | undefined;
}
function Menu({
  currentDiary,
  isEditStatus,
  onCancel,
  onSave,
  onEdit,
}: IProps) {
  return (
    <div styleName="menu">
      <div styleName="left">
        {!isEditStatus && (
          <div styleName="title">{currentDiary?.title || ''}</div>
        )}
      </div>
      <div styleName="right">
        {isEditStatus && (
          <>
            <div styleName="btn cancel" onClick={onCancel}>
              取消
            </div>
            <div styleName="btn save" onClick={onSave}>
              保存
            </div>
          </>
        )}
        {!isEditStatus && (
          <div styleName="btn cancel" onClick={onEdit}>
            编辑
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
