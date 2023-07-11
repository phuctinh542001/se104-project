import Modal from "components/Modal/Modal";

type DeleteReaderModalProps = {
  idReader: number;
  handleSubmit: (idReader: number) => any;
};

function DeleteReaderModal({ idReader, handleSubmit }: DeleteReaderModalProps) {
  return (
    <Modal title="Xóa Thẻ Độc Giả" modalId="deleteReader">
      <div className="row g-3">
        <div className="col-md-12">Vui lòng xác nhận để xóa</div>
        <button
          className="btn btn-primary"
          type="button"
          data-bs-dismiss="modal"
          onClick={() => {
            handleSubmit(idReader);
          }}
          style={{backgroundColor: "crimson", border: "none"}}
        >
          Xác nhận xóa
        </button>
      </div>
    </Modal>
  );
}

export default DeleteReaderModal;
