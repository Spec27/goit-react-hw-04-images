import { createPortal } from "react-dom";
import s from "./Modal.module.css";
import PropTypes from 'prop-types';
import { useEffect } from "react";

const modalRoot = document.querySelector("#modal-root");

function Modal({ onClose, srs }) {

    const  hendleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            onClose();
        };
  };
    
    useEffect(() => {
        const hendleKeyDown = e => {
            if (e.code === 'Escape') {
                onClose();
            };
        };

        window.addEventListener('keydown', hendleKeyDown);
        return () => {
            window.removeEventListener('keydown', hendleKeyDown);
        };
    },[onClose]);
    

    return createPortal (
        <div className={s.Overlay} onClick={hendleBackdropClick}>
            <div className={s.Modal}>
                <img src={srs} alt='' />
            </div>
        </div>,modalRoot,
    );
}

Modal.propTypes = {
    srs: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

export default Modal;