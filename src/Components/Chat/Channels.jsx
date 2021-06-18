import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import i18next from 'i18next';
import axios from 'axios';
import { setChannels, setCurrentChannelId } from './channelsSlice';
import Modal from './Modals/index';
import { Context } from '../../context';

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

  const ctx = useContext(Context);
  const options = { headers: { Authorization: `Bearer ${ctx.token}` } };

  const updateChannelsInfo = (dispatchCb) => (response) => {
    console.log('socket response: ', response);
    showModal('closing')();

    const getChannelsInfo = async () => {
      try {
        const channelsInfo = await axios.get('/api/v1/data', options);
        dispatchCb(setChannels(channelsInfo.data));
      } catch (err) {
        console.log('home get error: ', err);
      }
    };

    getChannelsInfo();
  };

  const renderChannelItem = (item) => {
    const { name, id, removable } = item;
    const btnVariant = (id === currentChannelId) ? 'secondary' : '';
    return (
      <Dropdown key={id} as={ButtonGroup} onClick={onChannelClick(id)}>
        <Button variant={btnVariant}>{name}</Button>
        {removable && <>
          <Dropdown.Toggle split variant={btnVariant}/>
          <Dropdown.Menu>
            <Dropdown.Item onClick={showModal('removing')} href="#">{i18next.t('channels.remove')}</Dropdown.Item>
            <Dropdown.Item onClick={showModal('renaming')} href="#">{i18next.t('channels.rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </>}
      </Dropdown>
    );
  };

  return (
    <>
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>{i18next.t('channels.channelsTitle')}</span>
          <button type="button" className="ml-auto p-0 btn btn-link" onClick={showModal('adding')}>+</button>
        </div>
        <ul className="nav flex-column nav-pills nav-fill">
          {!!data.channels && data.channels.map((item) => renderChannelItem(item))}
        </ul>
      </div>

      <Modal type={modalType} showModal={showModal} id={currentChannelId} updateChannelsInfo={updateChannelsInfo}/>
    </>
  );
};

export default Channels;
