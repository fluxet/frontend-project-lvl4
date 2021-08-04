import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setVisibility } from '../modalTypeSlice';
import ContextWs from '../../../contextWs';

const Remove = (props) => {
  const { t } = useTranslation();
  const ctx = useContext(ContextWs);
  const socket = ctx.wsClient;
  const { id } = props;
  const dispatch = useDispatch();

  return (
    <Modal show>
      <Modal.Header closeButton onClick={() => dispatch(setVisibility(false))}>
        <Modal.Title>{t('modals.remove.title')}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={() => {
          socket.emit('removeChannel', {
            id,
          }, () => {
            dispatch(setVisibility(false));
          });
        }}
      >
        <Form>
          <Modal.Body>
            <div>{t('modals.remove.warning')}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => dispatch(setVisibility(false))}>{t('modals.cancel')}</Button>
            <Button variant="danger" type="submit">{t('modals.remove.submit')}</Button>
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>
  );
};

export default Remove;
