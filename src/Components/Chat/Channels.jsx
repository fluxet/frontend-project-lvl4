import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import i18next from 'i18next';
import axios from 'axios';
import { setChannels, setCurrentChannelId } from './channelsSlice';
import { setType } from './modalTypeSlice';
import Modal from './Modals/index';
import { Context } from '../../context';
import routes from '../../routes';

const Channels = () => {
  const ctx = useContext(Context);
  const data = useSelector((state) => state.channels.value);
  const modalType = useSelector((state) => state.modalType.value);
  const dispatch = useDispatch();
  const currentChannelId = data?.currentChannelId;

  const onChannelClick = (id) => () => {
    dispatch(setCurrentChannelId({ currentChannelId: id }));
  };

  // const showModal = (type) => () => dispatch(setType(type));

  const options = { headers: { Authorization: `Bearer ${ctx.token}` } };

  const updateChannelsInfo = (dispatchCb) => (response) => {
    console.log('socket response: ', response);
    dispatch(setType('closing'));
    // showModal('closing')();

    const getChannelsInfo = async () => {
      try {
        const channelsInfo = await axios.get(routes.dataPath(), options);
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
            <Dropdown.Item onClick={() => dispatch(setType('removing'))} href="#">{i18next.t('channels.remove')}</Dropdown.Item>
            <Dropdown.Item onClick={() => dispatch(setType('renaming'))} href="#">{i18next.t('channels.rename')}</Dropdown.Item>
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
          <button type="button" className="ml-auto p-0 btn btn-link" onClick={() => dispatch(setType('adding'))}>+</button>
        </div>
        <ul className="nav flex-column nav-pills nav-fill">
          {!!data.channels && data.channels.map((item) => renderChannelItem(item))}
        </ul>
      </div>

      <Modal
        type={modalType}
        showModal={(type) => () => dispatch(setType(type))}
        id={currentChannelId}
        updateChannelsInfo={updateChannelsInfo}
      />
    </>
  );
};

export default Channels;
