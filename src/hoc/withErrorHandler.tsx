import React from 'react';
import useHttpErrorHandler from 'hooks/useHttpErrorHandler';
import { PageProps } from 'types';
import axiosInstance from 'api/axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const WithErrorHandler = ({ children }: PageProps) => {
  const { error, clearErrorHandler } = useHttpErrorHandler(axiosInstance);
  return (
    <>
      <Modal
        show={!!error}
        onHide={clearErrorHandler}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error?.message ?? null}</Modal.Body>
        <Modal.Footer>
          <Button data-testid="close-button" variant="secondary" onClick={clearErrorHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {children}
    </>
  );
};
export default WithErrorHandler;
