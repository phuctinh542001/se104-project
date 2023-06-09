import Modal from "components/Modal/Modal";

type DeleteBookModalProps = {
  idBook: number;
  handleSubmit: (idBook: number) => any;
};

function DeleteBookModal({ idBook, handleSubmit }: DeleteBookModalProps) {
  return (
    <Modal title="Xóa thẻ độc giả" modalId="deleteBook">
      <div className="row g-3">
        <div className="col-md-12">Vui lòng xác nhận để xóa</div>
        <button
          className="btn btn-primary"
          type="button"
          data-bs-dismiss="modal"
          onClick={() => {
            handleSubmit(idBook);
          }}
          style={{backgroundColor: "crimson", border: "none"}}
        >
          Xác nhận xóa
        </button>
      </div>
    </Modal>
  );
}

export default DeleteBookModal;
