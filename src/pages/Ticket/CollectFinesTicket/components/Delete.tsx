import Modal from "components/Modal/Modal";

type DeleteBookLoanModalProps = {
  idDelete: number;
  handleSubmit: (idReader: number) => any;
};

function DeleteBookLoanModal({ idDelete, handleSubmit }: DeleteBookLoanModalProps) {
  return (
    <Modal title="Xóa Phiếu thu tiền phạt" modalId="deleteBookLoanTicket">
      <div className="row g-3">
        <div className="col-md-12">Vui lòng xác nhận để xóa</div>
        <button
          className="btn btn-primary"
          type="button"
          data-bs-dismiss="modal"
          onClick={() => {
            handleSubmit(idDelete);
          }}
          style={{ backgroundColor: "crimson", border: "none" }}
        >
          Xác nhận xóa
        </button>
      </div>
    </Modal>
  );
}

export default DeleteBookLoanModal;
