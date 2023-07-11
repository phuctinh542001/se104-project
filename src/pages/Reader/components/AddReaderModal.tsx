import { useState } from "react";
import Modal from "components/Modal/Modal";
import "bootstrap/js/dist/modal";

type AddReaderModalProps = {
  handleSubmit: (addReader: any) => void;
};

const now = new Date();

function AddReaderModal({ handleSubmit }: AddReaderModalProps) {
  const [isValidate, setIsValidate] = useState(false);

  const [inputHoTen, setInputHoTen] = useState("");
  const [inputLoaiDocGia, setInputLoaiDocGia] = useState("");
  const [inputNgaySinh, setInputNgaySinh] = useState("");
  const [inputDiaChi, setInputDiaChi] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputNgayLapThe, setInputNgayLapThe] = useState(
    now.toISOString().split("T")[0]
  );

  function checkValidate() {
    if (
      inputHoTen &&
      inputLoaiDocGia &&
      inputNgaySinh &&
      inputDiaChi &&
      inputEmail &&
      inputNgayLapThe
    ) {
      if (!isValidate) setIsValidate(true);
    } else if (isValidate) {
      setIsValidate(false);
    }
  }

  checkValidate();

  return (
    <Modal title="Thêm thẻ độc giả" modalId="addReader">
      <form
        className="row g-3 needs-validation was-validated"
        noValidate={true}
      >
        {/* Họ và tên */}
        <div className="col-md-6">
          <label htmlFor="inputHoTen" className="form-label">
            Họ và tên
          </label>
          <input
            type="text"
            className="form-control"
            id="inputHoTen"
            placeholder="Nguyễn Văn A"
            value={inputHoTen ? inputHoTen : ""}
            required={true}
            onChange={(e) => {
              setInputHoTen(e.target.value);
            }}
          />
        </div>

        {/* Loại độc giả */}
        <div className="col-md-6">
          <label htmlFor="inputLoaiDocGia" className="form-label">
            Loại độc giả
          </label>
          <select
            id="inputLoaiDocGia"
            className="form-select"
            aria-label="Default select example"
            value={inputLoaiDocGia ? inputLoaiDocGia : ""}
            required={true}
            onChange={(e) => {
              setInputLoaiDocGia(e.target.value);
            }}
          >
            <option defaultValue="" hidden disabled value="">
              Chọn...
            </option>
            <option value="X">X</option>
            <option value="Y">Y</option>
          </select>
        </div>

        {/* Ngày sinh */}
        <div className="col-12">
          <label htmlFor="inputNgaySinh" className="form-label">
            Ngày sinh
          </label>
          <input
            type="date"
            className="form-control"
            id="inputNgaySinh"
            placeholder="01/01/2001"
            value={inputNgaySinh ? inputNgaySinh: ""}
            required={true}
            onChange={(e) => {
              const inputDate = new Date(e.target.value);
              if (inputDate.getTime()) {
                setInputNgaySinh(inputDate.toISOString().split("T")[0]);
              }
            }}
          />
        </div>

        {/* Địa chỉ */}
        <div className="col-12">
          <label htmlFor="inputDiaChi" className="form-label">
            Địa chỉ
          </label>
          <input
            type="text"
            className="form-control"
            id="inputDiaChi"
            placeholder="Dĩ An, Bình Dương"
            value={inputDiaChi ? inputDiaChi : ""}
            required={true}
            onChange={(e) => {
              setInputDiaChi(e.target.value);
            }}
          />
        </div>

        {/* Email */}
        <div className="col-md-12">
          <label htmlFor="inputEmail" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="inputEmail"
            placeholder="example@gmail.com"
            value={inputEmail ? inputEmail : ""}
            required={true}
            onChange={(e) => {
              setInputEmail(e.target.value);
            }}
          />
        </div>

        {/* Ngày lập thẻ */}
        <div className="col-md-12">
          <label htmlFor="inputNgayLapThe" className="form-label">
            Ngày lập thẻ
          </label>
          <input
            type="date"
            className="form-control"
            id="inputNgayLapThe"
            value={inputNgayLapThe ? inputNgayLapThe : ""}
            required={true}
            onChange={(e) => {
              const inputDate = new Date(e.target.value);
              if (inputDate.getTime()) {
                setInputNgayLapThe(inputDate.toISOString().split("T")[0]);
              }
            }}
          />
        </div>
        
        <button
          className="btn btn-primary"
          type="submit"
          data-bs-dismiss="modal"
          disabled={!isValidate}
          onClick={(e) => {
            e.preventDefault();

            const newReader = {
              ho_ten: inputHoTen,
              loai_doc_gia: inputLoaiDocGia,
              ngay_sinh: inputNgaySinh,
              dia_chi: inputDiaChi,
              email: inputEmail,
              ngay_lap_the: inputNgayLapThe,
            };

            setInputHoTen("");
            setInputLoaiDocGia("");
            setInputNgaySinh("");
            setInputDiaChi("");
            setInputEmail("");
            setInputNgayLapThe(now.toISOString().split("T")[0]);
            setIsValidate(false);

            handleSubmit(newReader);
          }}
        >
          Submit
        </button>
      </form>
    </Modal>
  );
}

export default AddReaderModal;
