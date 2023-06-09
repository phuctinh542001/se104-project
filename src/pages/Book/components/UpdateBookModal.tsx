import { useState, useEffect } from "react";
import axios from "axios";

import Modal from "components/Modal/Modal";

type UpdateBookModalProps = {
  idBook: number;
  handleSubmit: (idBook: number, newBook: any) => any;
};

const now = new Date();

function UpdateBookModal({ idBook, handleSubmit }: UpdateBookModalProps) {
  const [isValidate, setIsValidate] = useState(false);

  const [inputTenSach, setInputTenSach] = useState("");
  const [inputTheLoai, setInputTheLoai] = useState("");
  const [inputTacGia, setInputTacGia] = useState("");
  const [inputNamXB, setInputNamXB] = useState("");
  const [inputNXB, setInputNXB] = useState("");
  const [inputNgayNhap, setInputNgayNhap] = useState(
    now.toISOString().split("T")[0]
  );
  const [inputTriGia, setInputTriGia] = useState("");

  function checkValidate() {
    if (
      inputTenSach &&
      inputTheLoai &&
      inputTacGia &&
      inputNamXB &&
      inputNXB &&
      inputNgayNhap &&
      inputTriGia
    ) {
      if (!isValidate) setIsValidate(true);
    } else if (isValidate) {
      setIsValidate(false);
    }
  }

  useEffect(() => {
    if (idBook !== 0)
      axios
        .get("http://localhost:3030/books/" + idBook)
        .then((response: any) => {
          setInputTenSach(response.data.ten_sach);
          setInputTheLoai(response.data.the_loai);
          setInputTacGia(response.data.tac_gia);
          setInputNamXB(response.data.nam_xb);
          setInputNXB(response.data.nxb);
          setInputNgayNhap(response.data.ngay_nhap);
          setInputTriGia(response.data.tri_gia);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [idBook]);

  checkValidate();

  return (
    <Modal title="Cập nhật sách" modalId="updateBook">
      <form
        className="row g-3 needs-validation was-validated"
        noValidate={true}
      >
        {/* Tên sách */}
        <div className="col-md-12">
          <label htmlFor="inputTenSach" className="form-label">
            Tên sách
          </label>
          <input
            type="text"
            className="form-control"
            id="inputTenSach"
            value={inputTenSach}
            required={true}
            onChange={(e) => {
              setInputTenSach(e.target.value);
            }}
          />
        </div>
        {/* Thể loại */}
        <div className="col-4">
          <label htmlFor="inputTheLoai" className="form-label">
            Thể loại
          </label>
          <select
            id="inputTheLoai"
            className="form-select"
            aria-label="Default select example"
            value={inputTheLoai}
            required={true}
            onChange={(e) => {
              setInputTheLoai(e.target.value);
            }}
          >
            <option defaultValue="" hidden disabled value="">
              Chọn...
            </option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        {/* Tác giả */}
        <div className="col-8">
          <label htmlFor="inputTacGia" className="form-label">
            Tác giả
          </label>
          <input
            type="text"
            className="form-control"
            id="inputTacGia"
            value={inputTacGia}
            required={true}
            onChange={(e) => {
              setInputTacGia(e.target.value);
            }}
          />
        </div>
        {/* Năm xuất bản */}
        <div className="col-4">
          <label htmlFor="inputNamXB" className="form-label">
            Năm xuất bản
          </label>
          <input
            type="text"
            className="form-control"
            id="inputNamXB"
            value={inputNamXB}
            required={true}
            onChange={(e) => {
              setInputNamXB(e.target.value);
            }}
          />
        </div>
        {/* Nhà XB */}
        <div className="col-8">
          <label htmlFor="inputNXB" className="form-label">
            Nhà Xuất bản
          </label>
          <input
            type="text"
            className="form-control"
            id="inputNXB"
            value={inputNXB}
            required={true}
            onChange={(e) => {
              setInputNXB(e.target.value);
            }}
          />
        </div>
        {/* Ngày nhập */}
        <div className="col-md-12">
          <label htmlFor="inputNgayNhap" className="form-label">
            Ngày nhập
          </label>
          <input
            type="date"
            className="form-control"
            id="inputNgayNhap"
            value={inputNgayNhap}
            required={true}
            onChange={(e) => {
              const inputDate = new Date(e.target.value);
              setInputNgayNhap(inputDate.toISOString().split("T")[0]);
            }}
          />
        </div>
        {/* Trị giá */}
        <div className="col-md-12">
          <label htmlFor="inputTriGia" className="form-label">
            Trị giá
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="inputTriGia"
              value={inputTriGia}
              required={true}
              onChange={(e) => {
                setInputTriGia(e.target.value);
              }}
              aria-describedby="addon-trigia"
            />
            <span className="input-group-text" id="addon-trigia">
              VND
            </span>
          </div>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          data-bs-dismiss="modal"
          disabled={!isValidate}
          onClick={(e) => {
            e.preventDefault();

            const newBook = {
              ten_sach: inputTenSach,
              the_loai: inputTheLoai,
              tac_gia: inputTacGia,
              nam_xb: inputNamXB,
              nxb: inputNXB,
              ngay_nhap: inputNgayNhap,
              tri_gia: inputTriGia,
            };

            setInputTenSach("");
            setInputTheLoai("");
            setInputTacGia("");
            setInputNamXB("");
            setInputNXB("");
            setInputNgayNhap(now.toISOString().split("T")[0]);
            setInputTriGia("");
            setIsValidate(false);

            handleSubmit(idBook, newBook);
          }}
        >
          Submit
        </button>
      </form>
    </Modal>
  );
}

export default UpdateBookModal;
