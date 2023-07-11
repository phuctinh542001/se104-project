import { useState } from "react";
import Modal from "components/Modal/Modal";
import "bootstrap/js/dist/modal";

type AddBookModalProps = {
  handleSubmit: (addReader: any) => void;
};

const now = new Date();

function AddBookModal({ handleSubmit }: AddBookModalProps) {
  const [isValidate, setIsValidate] = useState(false);

  const [inputMaSach, setInputMaSach] = useState("");
  const [inputTenSach, setInputTenSach] = useState("");
  const [inputTheLoai, setInputTheLoai] = useState("");
  const [inputTacGia, setInputTacGia] = useState("");
  const [inputNamXB, setInputNamXB] = useState("");
  const [inputNXB, setInputNXB] = useState("");
  const [inputNgayNhap, setInputNgayNhap] = useState(
    now.toISOString().split("T")[0]
  );
  const [inputTriGia, setInputTriGia] = useState("");
  const [inputSoLuong, setInputSoLuong] = useState("");

  function checkValidate() {
    if (
      inputMaSach &&
      inputTenSach &&
      inputTheLoai &&
      inputTacGia &&
      inputNamXB &&
      inputNXB &&
      inputNgayNhap &&
      inputTriGia &&
      inputSoLuong
    ) {
      if (!isValidate) setIsValidate(true);
    } else if (isValidate) {
      setIsValidate(false);
    }
  }

  checkValidate();

  return (
    <Modal title="Thêm sách" modalId="addBook">
      <form
        className="row g-3 needs-validation was-validated"
        noValidate={true}
      >
        {/* Mã sách */}
        <div className="col-md-6">
          <label htmlFor="inputMaSach" className="form-label">
            Mã sách
          </label>
          <input
            type="text"
            className="form-control"
            id="inputMaSach"
            placeholder="A123"
            value={inputMaSach ? inputMaSach : ""}
            required={true}
            onChange={(e) => {
              setInputMaSach(e.target.value);
            }}
          />
        </div>

        {/* Tên sách */}
        <div className="col-md-12">
          <label htmlFor="inputTenSach" className="form-label">
            Tên sách
          </label>
          <input
            type="text"
            className="form-control"
            id="inputTenSach"
            placeholder="Truyện Kiều"
            value={inputTenSach ? inputTenSach : ""}
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
            value={inputTheLoai ? inputTheLoai : ""}
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
            placeholder="Nguyễn Du"
            value={inputTacGia ? inputTacGia : ""}
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
            placeholder="2001"
            value={inputNamXB ? inputNamXB : ""}
            required={true}
            onChange={(e) => {
              setInputNamXB(e.target.value);
            }}
          />
        </div>

        {/* Nhà XB */}
        <div className="col-8">
          <label htmlFor="inputNXB" className="form-label">
            Nhà xuất bản
          </label>
          <input
            type="text"
            className="form-control"
            id="inputNXB"
            placeholder="Kim Đồng"
            value={inputNXB ? inputNXB : ""}
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
            value={inputNgayNhap ? inputNgayNhap : ""}
            required={true}
            onChange={(e) => {
              const inputDate = new Date(e.target.value);
              if (inputDate.getTime()) {
                setInputNgayNhap(inputDate.toISOString().split("T")[0]);
              }
            }}
          />
        </div>

        {/* Trị giá */}
        <div className="col-md-8">
          <label htmlFor="inputTriGia" className="form-label">
            Trị giá
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="inputTriGia"
              value={inputTriGia ? inputTriGia : ""}
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

        {/* Số lượng */}
        <div className="col-md-4">
          <label htmlFor="inputSoLuong" className="form-label">
            Số lượng
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="inputSoLuong"
              value={inputSoLuong ? inputSoLuong : ""}
              required={true}
              onChange={(e) => {
                setInputSoLuong(e.target.value);
              }}
            />
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
              ten_the_loai: inputTheLoai,
              ten_tac_gia: inputTacGia,
              ten_nxb: inputNXB,
              ma_sach: inputMaSach,
              ten_sach: inputTenSach,
              nam_xb: Number(inputNamXB),
              ngay_nhap: inputNgayNhap,
              tri_gia: Number(inputTriGia),
              so_luong: Number(inputSoLuong)
            };

            setInputMaSach("");
            setInputTenSach("");
            setInputTheLoai("");
            setInputTacGia("");
            setInputNamXB("");
            setInputNXB("");
            setInputNgayNhap(now.toISOString().split("T")[0]);
            setInputTriGia("");
            setInputSoLuong("");
            setIsValidate(false);

            handleSubmit(newBook);
          }}
        >
          Submit
        </button>
      </form>
    </Modal>
  );
}

export default AddBookModal;
