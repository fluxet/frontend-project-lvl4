import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dropdown, Button, ButtonGroup, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setCurrentChannelId } from '../../stateSlices/channelsSlice.js';
import { openModal, setModalId } from '../../stateSlices/modalSlice.js';
import { channelsSelector } from '../../stateSelectors/channelsSelectors.js';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const data = useSelector(channelsSelector);
  const currentChannelId = data?.currentChannelId;

  const onChannelClick = (id) => () => {
    dispatch(setCurrentChannelId({ currentChannelId: id }));
  };
  const onDropDownClick = (id) => () => {
    dispatch(setModalId(id));
  };

  const renderChannelItem = (item) => {
    const { name, id, removable } = item;
    const btnVariant = (id === currentChannelId) ? 'secondary' : '';
    return (
      <Dropdown key={id} as={ButtonGroup} onClick={onDropDownClick(id)} className="w-100">
        <Button variant={btnVariant} onClick={onChannelClick(id)} className="w-100 text-start text-truncate">{name}</Button>
        {removable && (
        <Nav.Item>
          <Dropdown.Toggle split variant={btnVariant} />
          <Dropdown.Menu>
            <Dropdown.Item active={false} onClick={() => dispatch(openModal('removing'))} href="#">{t('channels.remove')}</Dropdown.Item>
            <Dropdown.Item active={false} onClick={() => dispatch(openModal('renaming'))} href="#">{t('channels.rename')}</Dropdown.Item>
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
          <Button variant="outline-primary" className="ml-auto p-0" onClick={() => dispatch(openModal('adding'))}>+</Button>
        </div>
        <Nav variant="pills" className="flex-column">
          {!!data.channels.length && data.channels.map((item) => renderChannelItem(item))}
        </Nav>
      </div>
    </>
  );
};

export default Channels;
