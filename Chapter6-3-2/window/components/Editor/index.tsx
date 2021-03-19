import React, { useEffect, useRef } from 'react';
import './index.less';
import { ItemProps } from '../List';

interface IProps {
  isEditStatus: boolean;
  currentDiary: ItemProps | undefined;
  onChangeEditorDiary: (updateItem: ItemProps) => void;
}
function Editor({ isEditStatus, currentDiary, onChangeEditorDiary }: IProps) {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef && textRef.current) {
      // textRef.current.focus();
    }
  }, []);

  return (
    <div styleName="textarea">
      {currentDiary && (
        <>
          {isEditStatus && (
            <>
              <input
                placeholder="标题"
                value={currentDiary.title}
                onChange={(e: any) => {
                  if (e && onChangeEditorDiary) {
                    onChangeEditorDiary({
                      ...currentDiary,
                      title: e.target.value,
                    });
                  }
                }}
              />
              <textarea
                placeholder="想说点什么..."
                value={currentDiary.content}
                onChange={(e: any) => {
                  if (e && onChangeEditorDiary) {
                    onChangeEditorDiary({
                      ...currentDiary,
                      content: e.target.value,
                    });
                  }
                }}
                ref={textRef}
                autoFocus={true}
              />
            </>
          )}
          {!isEditStatus && (
            <div
              styleName="text"
              dangerouslySetInnerHTML={{ __html: currentDiary.content }}
            ></div>
          )}
        </>
      )}
    </div>
  );
}

export default Editor;
