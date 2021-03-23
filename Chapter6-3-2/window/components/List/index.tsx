import React, { useEffect } from 'react';
import './index.less';
import DeleteIcon from '../../images/delete.png';
import { formatToString } from '../../utils/time';
export interface ItemProps {
  content: string;
  date: number;
  title: string;
  id: string;
}

interface IProps {
  index: number;
  list: ItemProps[];
  onDelete: (index: number) => void;
  changeIndex: (index: number) => void;
}
function List({ index, list, onDelete, changeIndex }: IProps) {
  return (
    <div styleName="note-list">
      {list &&
        list.length > 0 &&
        list.map((item: ItemProps, i: number) => {
          return (
            <div
              styleName={`note-item ${i === index ? 'is-select' : ''} `}
              key={i}
              onClick={() => {
                changeIndex(i);
              }}
            >
              <div styleName="note-item-box">
                <div styleName="note-item-title">{item.title}</div>
                <div styleName="note-item-date">
                  {formatToString(item.date)}
                </div>
              </div>
              <div styleName="note-item-action">
                <div
                  styleName="note-delete"
                  onClick={() => {
                    onDelete(i);
                  }}
                >
                  <img src={DeleteIcon} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      {!list ||
        (!list.length && (
          <div styleName="empty">
            <div styleName="empty-tips">你还没有笔记内容，快记录一下吧～</div>
          </div>
        ))}
    </div>
  );
}

export default List;
