import './css/modal.css';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <tr className={showHideClassName}>
       
      <td id="modal-main">
      <button id="close" type="button" onClick={handleClose}>
          <img  src="https://icon-library.com/images/x-button-icon/x-button-icon-20.jpg"
          className="h-12 w-12 "
          />
        </button>
        {children} <br/>
       
      </td>
    </tr>
  );
};
export default Modal