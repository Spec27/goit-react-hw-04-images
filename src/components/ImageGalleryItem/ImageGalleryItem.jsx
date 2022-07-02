import {  useState } from "react";
import s from "./ImageGalleryItem.module.css";
import Modal from "components/Modal";
import PropTypes from 'prop-types';


function ImageGalleryItem({smallImgURL,id,bigUrl}) {
    const [showModal, setShowodal] = useState(false);

    const  toggleModal = () => {
        setShowodal(!showModal)
    };


    return (
        <li className={s.GalleryItem}>
            <img
                className={s.Img}
                src={smallImgURL}
                alt={id}
                onClick={toggleModal}
            />
            {showModal && <Modal onClose={toggleModal}
                srs={bigUrl}
            />}
        </li>
    );
};

ImageGalleryItem.propTypes = {
    id: PropTypes.number.isRequired,
    smallImgURL: PropTypes.string.isRequired,
  };
export default ImageGalleryItem;