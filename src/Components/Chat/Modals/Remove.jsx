import React, { useContext } from 'react';
import { Modal, FormGroup, Button } from 'react-bootstrap';
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
    <>
      <Modal.Dialog>
        <Modal.Header closeButton onClick={() => dispatch(setVisibility(false))}>
          <Modal.Title>{t('modals.remove.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              <FormGroup>
                <div>{t('modals.remove.warning')}</div>
                <Button variant="secondary" onClick={() => dispatch(setVisibility(false))}>{t('modals.cancel')}</Button>
                <Button type="submit">{t('modals.add.submit')}</Button>
              </FormGroup>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal.Dialog>
    </>
  );
};

export default Remove;
