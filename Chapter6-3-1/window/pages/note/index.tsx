import React, { useState, useCallback, useEffect } from 'react';
import './index.less';
import Menu from '../../components/Menu';
import List, { ItemProps } from '../../components/List';
import Editor from '../../components/Editor';
import MyScrollBox from '../../components/MyScrollBox';
import ConfirmModal from '../../components/ConfirmModal';
import { remote } from 'electron';
import { readData, updateData } from '../../utils/jsonFile';
import path from 'path';

const jsonFileDataPath = path.join(
  remote.getGlobal('ROOT_PATH'),
  'data.json'
);

function JsonFile() {
  const [height, setHeight] = useState(0);
  const [index, setIndex] = useState(0);
  const [list, setList] = useState<ItemProps[]>([]);
  const [jsonData, setJsonData] = useState<any>();
  const [currentDiary, setCurrentDiary] = useState<ItemProps>();
  const [isEditStatus, setEditStatus] = useState(false);
  const [isEditModal, setIsEditModal] = useState({
    show: false,
    prevEditIndex: -1,
    nextEditIndex: -1,
  });
  const [isCancelModal, setIsCancelModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState({
    show: false,
    deleteIndex: -1,
  });
  const [isSaveModal, setIsSaveModal] = useState(false);

  useEffect(() => {
    setHeight(document.body.clientHeight);
  }, [document.body]);

  useEffect(() => {
    // 读取jsonfile本地文件内容
    const values = readData(jsonFileDataPath);
    setJsonData(values);
    if (values && values.list.length > 0) {
      setList([...values.list]);
      setCurrentDiary(values?.list[index]);
    }
  }, []);

  // 切换笔记
  const changeIndex = (newIndex: number) => {
    if (index !== newIndex) {
      // 当前正处于编辑状态
      if (isEditStatus) {
        setIsEditModal({
          show: true,
          prevEditIndex: index,
          nextEditIndex: newIndex,
        });
      } else {
        setIndex(newIndex);
        setCurrentDiary(list[newIndex]);
        setEditStatus(false);
      }
    }
  };

  const onChangeEditCancel = useCallback(() => {
    setIsEditModal((prev) => {
      return {
        ...prev,
        show: false,
      };
    });
  }, [isEditModal]);

  const onChangeEditOk = useCallback(() => {
    const nextEditIndex = isEditModal.nextEditIndex;
    setCurrentDiary(list[nextEditIndex]);
    setIndex(nextEditIndex);
    setIsEditModal({
      show: false,
      prevEditIndex: -1,
      nextEditIndex: -1,
    });
    setEditStatus(false);
  }, [isEditModal]);

  // 修改笔记为编辑状态
  const onEdit = () => {
    if (!isEditStatus) {
      setEditStatus(true);
    }
  };

  // 修改笔记内容
  const onChangeEditorDiary = (updateItem: ItemProps) => {
    if (currentDiary) {
      setCurrentDiary(updateItem);
    }
  };

  // 删除笔记
  const onDelete = (newIndex: number) => {
    setIsDeleteModal({
      show: true,
      deleteIndex: newIndex,
    });
  };
  const onDeleteCancel = useCallback(() => {
    setIsDeleteModal({
      show: false,
      deleteIndex: -1,
    });
  }, [index, isDeleteModal]);
  
  const onDeleteOk = useCallback(() => {
    let nextList = [...list];
    const nextDeleteIndex = isDeleteModal.deleteIndex;
    nextList.splice(nextDeleteIndex, 1);
    setIndex(0);
    setList(nextList);
    setCurrentDiary(nextList[0] || undefined);
    setIsDeleteModal({
      show: false,
      deleteIndex: -1,
    });
    const newJsonData = {
      ...jsonData,
      list: [...nextList],
    };
    setJsonData(newJsonData);
    updateData(jsonFileDataPath, newJsonData);
    setEditStatus(false);
  }, [index, isDeleteModal]);

  // 编辑状态-取消笔记编辑
  const onCancel = () => {
    setIsCancelModal(true);
  };
  const onEditCancel = () => {
    setIsCancelModal(false);
  };
  const onEditOk = () => {
    // 只是将当前编辑的日记做个重置操作，并不会同步到 jsonfile
    setCurrentDiary(list[index]);
    setIsCancelModal(false);
  };

  // 编辑状态-保存笔记
  const onSave = () => {
    setIsSaveModal(true);
  };
  const onSaveOk = () => {
    setIsSaveModal(false);
    // 将当前编辑的日记同步到 state 和 jsonfile
    if (currentDiary) {
      let nextList = [...list];
      nextList[index] = {
        ...currentDiary,
        date: new Date().valueOf(),
      };
      setList(nextList);
      const newJsonData = {
        ...jsonData,
        list: [...nextList],
      };
      setJsonData(newJsonData);
      updateData(jsonFileDataPath, newJsonData);
      setEditStatus(false);
    }
  };
  const onSaveCancel = () => {
    setIsSaveModal(false);
  };

  // 新增状态-添加笔记
  const onAdd = () => {
    const newAddItem: ItemProps = {
      title: '未命名笔记',
      date: new Date().valueOf(),
      content: '',
    };
    setIndex(0);
    let nextList = [...list];
    nextList.unshift(newAddItem);
    setList(nextList);
    const newJsonData = {
      ...jsonData,
      list: [...nextList],
    };
    setJsonData(newJsonData);
    updateData(jsonFileDataPath, newJsonData);
  };

  return (
    <div styleName="container">
      <div styleName="navigation">
        <div styleName="header">
          <div styleName="title">{jsonData?.title || '本地笔记'}</div>
          <div styleName="tips">{jsonData?.desc || 'demo例子～'}</div>
          <div styleName="btn" onClick={onAdd}>
            新增日记
          </div>
        </div>
        <div styleName="list">
          <MyScrollBox maxHeight={height - 96}>
            <List
              index={index}
              list={list}
              changeIndex={changeIndex}
              onDelete={onDelete}
            />
          </MyScrollBox>
        </div>
      </div>
      <div styleName="content">
        <div styleName="header">
          <Menu
            isEditStatus={isEditStatus}
            onEdit={onEdit}
            currentDiary={currentDiary}
            onCancel={onCancel}
            onSave={onSave}
          />
        </div>
        <div styleName="text">
          <Editor
            isEditStatus={isEditStatus}
            currentDiary={currentDiary}
            onChangeEditorDiary={onChangeEditorDiary}
          />
        </div>
      </div>
      {isEditModal.show && (
        <ConfirmModal
          title="当前笔记正在编辑，是否放弃？"
          onCancel={onChangeEditCancel}
          onOk={onChangeEditOk}
        />
      )}
      {isCancelModal && (
        <ConfirmModal
          title="你确定放弃编辑的笔记内容？"
          onCancel={onEditCancel}
          onOk={onEditOk}
        />
      )}
      {isDeleteModal.show && (
        <ConfirmModal
          title="你确定删除此笔记？"
          onCancel={onDeleteCancel}
          onOk={onDeleteOk}
        />
      )}
      {isSaveModal && (
        <ConfirmModal
          title="保存笔记？"
          onCancel={onSaveCancel}
          onOk={onSaveOk}
        />
      )}
    </div>
  );
}

export default JsonFile;
