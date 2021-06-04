import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import { setCurrentChannelId } from './channelsSlice.js';
import Add from './Modals/Add.jsx';
import Rename from './Modals/Rename.jsx';
import Remove from './Modals/Remove.jsx';

const Channels = () => {
  const data = useSelector((state) => state.channels.value);
  const dispatch = useDispatch();
  const currentChannelId = data?.currentChannelId;
  const onChannelClick = (id) => () => {
    dispatch(setCurrentChannelId({ currentChannelId: id }));
  };
  const [modalType, setModalType] = useState(null);

  const showModal = (type) => () => {
    setModalType(type);
  };
  const renderModal = (type) => {
    console.log('type: ', type);
    return (
      <>
        {(type === 'adding') && <Add showModal={showModal} id={currentChannelId} />}
        {(type === 'renaming') && <Rename showModal={showModal} id={currentChannelId} />}
        {(type === 'removing') && <Remove showModal={showModal} id={currentChannelId} />}
      </>
    );
  };

  const renderChannelItem = (item) => {
    const { name, id, removable } = item;
    const btnVariant = (id === currentChannelId) ? 'secondary' : '';
    return (
      <Dropdown key={id} as={ButtonGroup}>
        <Button onClick={onChannelClick(id)} variant={btnVariant}>{name}</Button>
        {removable && <>
          <Dropdown.Toggle split variant={btnVariant}/>
          <Dropdown.Menu>
            <Dropdown.Item onClick={showModal('removing')} href="#">Удалить</Dropdown.Item>
            <Dropdown.Item onClick={showModal('renaming')} href="#">Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </>}
      </Dropdown>
    );
  };

  return (
    <>
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>Каналы</span>
          <button type="button" className="ml-auto p-0 btn btn-link" onClick={showModal('adding')}>+</button>
        </div>
        <ul className="nav flex-column nav-pills nav-fill">
          {!!data.channels && data.channels.map((item) => renderChannelItem(item))}
        </ul>
      </div>

      {renderModal(modalType)}
    </>
  );
};

export default Channels;
