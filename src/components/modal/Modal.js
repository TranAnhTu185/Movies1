import {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {AiOutlineClose} from 'react-icons/ai';
import './Modal.scss';

Modal.propTypes = {
    action: PropTypes.bool,
    id: PropTypes.string
};



function Modal(props) {
    const [action, setAction] = useState(false);

    useEffect(() => {
        setAction(props.action);
    },[props.action]);

    return (
        <div
            id={props.id}
            className={`modal ${ action ? 'active' : null}`}
        >
            {props.children}
        </div>
    );
}

export  const ModalContent = props => {
    const modalRef = useRef(null);
    const closeModal = () => {
        modalRef.current.parentNode.classList.remove('active');
        if(props.onclose) props.onclose();
    }
    return (
        <div
            ref={modalRef}
            className='modal__content'
        >
            {props.children}
            <div className="modal__content-close"
                 onClick={closeModal}>
                <AiOutlineClose/>
            </div>
        </div>
    );
}

export default Modal;