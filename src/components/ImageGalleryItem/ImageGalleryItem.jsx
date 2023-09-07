import { useState } from "react";
import Modal from "../Modal/Modal";

import { Item, Image } from "./ImageGalleryItem.styled"

import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, tags, largeImage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
      <Item>
        <Image
          onClick={toggleModal}
          src={image}
          alt={tags}
        />
        {isModalOpen && <Modal onClose={toggleModal} image={largeImage} />}
      </Item>
    );
} 

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};