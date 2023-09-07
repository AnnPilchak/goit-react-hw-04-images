import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import { Overlay, Box } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ image, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => {
      window.addEventListener('keydown', closeModal);
    }
  })

  const closeModal = evt => {
    if (evt.code === 'Escape' || evt.currentTarget === evt.target)
      onClose();
  }

  return createPortal(
    <Overlay onClick={closeModal}>
      <Box>
        <img src={image} alt="piska" />
      </Box>
    </Overlay>,
    modalRoot
  );
}

export default Modal; 
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};
