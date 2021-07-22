import React, { useContext } from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setType } from '../modalTypeSlice';
import { ContextWs } from '../../../contextWs';

const Remove = (props) => {
  const { t } = useTranslation();
  const ctx = useContext(ContextWs);
  const socket = ctx.wsClient;
  const { id } = props;
  const dispatch = useDispatch();

  return (
    <>
      <Modal.Dialog>
        <Modal.Header closeButton onClick={() => dispatch(setType('closing'))}>
          <Modal.Title>{t('modals.remove.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ name: '' }}
            onSubmit={() => {
              socket.emit('removeChannel', {
                id,
              }, () => {
                dispatch(setType('closing'));
              });
            }}
          >
            <Form>
              <FormGroup>
                <div>{t('modals.remove.warning')}</div>
                <button type="button" onClick={() => dispatch(setType('closing'))} className="me-2 btn btn-secondary">{t('modals.cancel')}</button>
                <button type="submit" className="btn btn-danger">{t('modals.remove.submit')}</button>
              </FormGroup>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal.Dialog>
    </>
  );
};

export default Remove;
