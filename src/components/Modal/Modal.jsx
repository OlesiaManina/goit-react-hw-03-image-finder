import React from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends React.Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleBackdrop = e => {
    if (e.currentTarget === e.target) {
        this.props.onClose();
    }
    }

    render() {
    return createPortal (
    <div className={css.overlay} onClick={this.handleBackdrop}>
        <div className={css.modal}>
        {this.props.children}
      </div>
    </div>, modalRoot)
    }
}

export default Modal;
