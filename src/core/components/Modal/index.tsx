import './styles.scss'

type Props = {
  showModal: boolean;
  setShowModal: (state: boolean) => void;
  children: React.ReactNode;
}

const Modal = ({ showModal, setShowModal, children }: Props) => {

  function outsideClick(e: EventTarget) {
    const modal = document.getElementById("teste");

    if ((e === modal)) {
      setShowModal(false);
    }
  }

  return (
    <div
      id="modal"
      onClick={(e) => outsideClick(e.target)}
      className={`modal-background ${showModal ? "show" : ""}`}
    >
      {children}
    </div>
  );
}

export default Modal;