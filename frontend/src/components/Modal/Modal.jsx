import React from 'react';
import './Modal.css';

const Modal = props => (
  <div className="overlay" onClick={e => e.target.className === 'overlay' && props.onCancel()}>
    <div className="modal">
      <header className="modal__header">
        <h1>{props.title}</h1>
      </header>
      <section className="modal__content">
        {props.children}
      </section>
      <section className="modal__actions">
        {props.canCancel && <button className="red" onClick={props.onCancel}>Close</button>}
        {props.canBook && <button className="gold" onClick={props.onBook}>Book</button>}
        {props.canConfirm && <button className="blue" onClick={props.onConfirm}>Confirm</button>}
      </section>
    </div>
  </div>
);
export default Modal;