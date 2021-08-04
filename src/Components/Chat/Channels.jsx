import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dropdown, Button, ButtonGroup, Nav,
} from 'react-bootstrap';
// import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { setCurrentChannelId } from './channelsSlice';
import { setType } from './modalTypeSlice';
import Modal from './Modals/index.jsx';

const Channels = () => {
  const { t } = useTranslation();
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
      <Dropdown key={id} as={ButtonGroup} onClick={onChannelClick(id)} className="nav-item w-100">
        <Button variant={btnVariant} className="w-100 text-start text-truncate">{name}</Button>
        {removable && (
        <Nav.Item>
          <Dropdown.Toggle split variant={btnVariant} />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => dispatch(setType('removing'))} href="#">{t('channels.remove')}</Dropdown.Item>
            <Dropdown.Item onClick={() => dispatch(setType('renaming'))} href="#">{t('channels.rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Nav.Item>
        )}
      </Dropdown>
    );
  };

  return (
    <>
      <div className="col-4 col-md-2 border-right pt-5 bg-light w-100">
        <div className="d-flex mb-2">
          <span>{t('channels.channelsTitle')}</span>
          <Button variant="outline-primary" className="ml-auto p-0" onClick={() => dispatch(setType('adding'))}>+</Button>
        </div>
        <Nav variant="pills" className="flex-column">
          {!!data.channels && data.channels.map((item) => renderChannelItem(item))}
        </Nav>
      </div>

      <Modal id={currentChannelId} />
    </>
  );
};

export default Channels;
