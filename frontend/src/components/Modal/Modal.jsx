import React from 'react';
import './Modal.css';

const Modal = props => (
    <div className="overlay">
      <div className="modal">
        <header className="modal__header">
          <h1>{props.title}</h1>
        </header>
        <section className="modal__content">
          {props.children}
        </section>
        <section className="modal__actions">
          {props.canConfirm && <button className="gold" onClick={props.onConfirm}>Confirm</button>}
          {props.canCancel && <button className="red" onClick={props.onCancel}>Close</button>}
        </section>
      </div>
    </div>
);
export default Modal;