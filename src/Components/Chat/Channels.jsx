import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
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
      <Dropdown key={id} as={ButtonGroup} onClick={onChannelClick(id)}>
        <Button variant={btnVariant}>{name}</Button>
        {removable && (
        <>
          <Dropdown.Toggle split variant={btnVariant} />
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => dispatch(setType('removing'))} href="#">{t('channels.remove')}</Dropdown.Item>
            <Dropdown.Item onClick={() => dispatch(setType('renaming'))} href="#">{t('channels.rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </>
        )}
      </Dropdown>
    );
  };

  return (
    <>
      <div className="col-4 col-md-2 border-right pt-5 bg-light">
        <div className="d-flex mb-2">
          <span>{t('channels.channelsTitle')}</span>
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
