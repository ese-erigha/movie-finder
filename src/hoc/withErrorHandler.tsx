import React from 'react';
import useHttpErrorHandler from 'hooks/useHttpErrorHandler';
import { PageProps } from 'types';
import { axiosInstance } from 'api/httpClient';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const WithErrorHandler = ({ children }: PageProps) => {
  const { error, clearErrorHandler } = useHttpErrorHandler(axiosInstance);
  const showModal = !!error?.message;
  return (
    <>
      {showModal && (
        <Modal
          show={showModal}
          onHide={clearErrorHandler}
          backdrop="static"
          keyboard={false}
          centered={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          {error?.message && <Modal.Body>{error?.message}</Modal.Body>}
          <Modal.Footer>
            <Button data-testid="close-button" variant="secondary" onClick={clearErrorHandler}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {children}
    </>
  );
};
export default WithErrorHandler;
