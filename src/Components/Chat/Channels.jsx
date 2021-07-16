import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import i18next from 'i18next';
import { setCurrentChannelId } from './channelsSlice';
import { setType } from './modalTypeSlice';
import Modal from './Modals/index';

const Channels = () => {
  const data = useSelector((state) => state.channels.value);
  const dispatch = useDispatch();
  const currentChannelId = data?.currentChannelId;

  const onChannelClick = (id) => () => {
    dispatch(setCurrentChannelId({ currentChannelId: id }));
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

      <Modal id={currentChannelId} />
    </>
  );
};

export default Channels;
