import { useState, useEffect } from "react";
import axios from "axios";

import Modal from "components/Modal/Modal";
import { API_URL } from "assets/config";


type UpdateReaderModalProps = {
  idReader: number;
  handleSubmit: (idReader: number, newReader: any) => any;
};

const now = new Date();

function UpdateReaderModal({ idReader, handleSubmit }: UpdateReaderModalProps) {
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

  useEffect(() => {
    if (idReader !== 0)
      axios
        .get(API_URL + "the-doc-gia/" + idReader)
        .then((response: any) => {
          setInputHoTen(response.data.ho_ten);
          setInputLoaiDocGia(response.data.loai_doc_gia);
          setInputNgaySinh(response.data.ngay_sinh);
          setInputDiaChi(response.data.dia_chi);
          setInputEmail(response.data.email);
          setInputNgayLapThe(response.data.ngay_lap_the);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [idReader]);

  checkValidate();

  return (
    <Modal title="Cập nhật thẻ độc giả" modalId="updateReader">
      <form
        className="row g-3 needs-validation was-validated"
        noValidate={true}
      >
        {/* Họ và tên */}
        <div className="col-md-8">
          <label htmlFor="inputHoTen" className="form-label">
            Họ và tên
          </label>
          <input
            type="text"
            className="form-control"
            id="inputHoTen"
            value={inputHoTen ? inputHoTen : ""}
            required={true}
            onChange={(e) => {
              setInputHoTen(e.target.value);
            }}
          />
        </div>
        {/* Loại độc giả */}
        <div className="col-md-4">
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
            value={inputNgaySinh ? inputNgaySinh : ""}
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
            value={inputEmail ? inputEmail : ""}
            required={true}
            onChange={(e) => {
              setInputEmail(e.target.value);
            }}
            disabled
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

            setIsValidate(false);

            handleSubmit(idReader, newReader);
          }}
        >
          Submit
        </button>
      </form>
    </Modal>
  );
}

export default UpdateReaderModal;
