import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "components/Modal/Modal";
import "bootstrap/js/dist/modal";
import { API_URL } from "assets/config";

type UpdateBookLoanModalProps = {
  idUpdate: number;
  handleSubmit: (idUpdate: number, newUpdate: any) => void;
};

const now = new Date();

function UpdateBookLoanModal({
  idUpdate,
  handleSubmit,
}: UpdateBookLoanModalProps) {
  const [isValidate, setIsValidate] = useState(false);

  const [books, setBooks] = useState([]) as any;
  const [readers, setReaders] = useState([]) as any;
  const [pmsDetail, setPMSDetail] = useState([]) as any

  const [inputTenDocGia, setInputTenDocGia] = useState("");
  const [inputNgayMuon, setInputNgayMuon] = useState(
    now.toISOString().split("T")[0]
  );

  useEffect(() => {
    if (idUpdate !== 0) {
      axios
        .get(API_URL + "phieu-muon-sach/" + idUpdate)
        .then((response: any) => {
          setPMSDetail(response.data.ds_sach);
          setInputTenDocGia(response.data.id_the_doc_gia);
          setInputNgayMuon(response.data.ngay_muon);
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(API_URL + "sach")
        .then((response: any) => {
          setBooks(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(API_URL + "the-doc-gia")
        .then((response: any) => {
          setReaders(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [idUpdate]);

  function checkValidate() {
    if (inputTenDocGia && inputNgayMuon) {
      if (!isValidate) setIsValidate(true);
    } else if (isValidate) {
      setIsValidate(false);
    }
  }

  checkValidate();

  return (
    <Modal title="Cập nhật phiếu mượn sách" modalId="updateBookLoanTicket" size="modal-lg">
      <form
        className="row g-3 modal-lg needs-validation was-validated"
        noValidate={true}
      >
        {/* Mã sách */}
        <div className="col-md-6">
          <label htmlFor="inputMaSach" className="form-label">
            Tên độc giả
          </label>
          <select
            className="form-select"
            id="inputMaSach"
            placeholder="Nguyen Van A"
            value={inputTenDocGia ? String(inputTenDocGia) : ""}
            required={true}
            onChange={(e) => {
              setInputTenDocGia(e.target.value);
            }}
          >
            <option defaultValue="" hidden disabled value="">
              Chọn...
            </option>
            {readers.map((reader: any, index: number) => {
              return (
                <option key={index} value={reader.id}>
                  {reader.ho_ten}
                </option>
              );
            })}
          </select>
        </div>

        {/* Tên sách */}
        <div className="col-md-6">
          <label htmlFor="inputTenSach" className="form-label">
            Ngày mượn
          </label>
          <input
            type="date"
            className="form-control"
            id="inputTenSach"
            placeholder="Truyện Kiều"
            value={inputNgayMuon ? inputNgayMuon : ""}
            required={true}
            onChange={(e) => {
              setInputNgayMuon(e.target.value);
            }}
          />
        </div>

        {/* Tên sách */}
        <div className="col-md-1">
          <label htmlFor="inputTenSach" className="form-label">
            STT
          </label>
        </div>
        <div className="col-md-2">
          <label htmlFor="inputTenSach" className="form-label">
            Mã sách
          </label>
        </div>
        <div className="col-md-4">
          <label htmlFor="inputTenSach" className="form-label">
            Tên sách
          </label>
        </div>
        <div className="col-md-2">
          <label htmlFor="inputTenSach" className="form-label">
            Thể loại
          </label>
        </div>
        <div className="col-md-3">
          <label htmlFor="inputTenSach" className="form-label">
            Tác giả
          </label>
        </div>
        <div className="container">
          
          {pmsDetail.length !== 0 && inputTenDocGia !== ""
            ? pmsDetail.map((book: any, index: number) => {
                return (
                  <div key={index} className="row">
                    <div className="col-1 p-0">
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        value={index + 1}
                        disabled
                      />
                    </div>
                    <div className="col-2 p-0">
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        value={books.find((b: any) => b.id === book.id) ? books.find((b: any) => b.id === book.id).ma_sach : ""}
                        disabled
                      />
                    </div>
                    <div className="col-4 p-0">
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        value={books.find((b: any) => b.id === book.id) ? books.find((b: any) => b.id === book.id).ten_sach : ""}
                        disabled
                      />
                    </div>
                    <div className="col-2 p-0">
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        value={books.find((b: any) => b.id === book.id) ? books.find((b: any) => b.id === book.id).ten_the_loai : ""}
                        disabled
                      />
                    </div>
                    <div className="col-3 p-0">
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        value={books.find((b: any) => b.id === book.id) ? books.find((b: any) => b.id === book.id).ten_tac_gia : ""}
                        disabled
                      />
                    </div>
                  </div>
                );
              })
            : ""}
        </div>

        <button
          className="btn btn-primary"
          type="submit"
          data-bs-dismiss="modal"
          disabled={!isValidate}
          onClick={(e) => {
            e.preventDefault();

            const newBookLoanTicket = {
              id_the_doc_gia: Number(inputTenDocGia),
              ten_doc_gia: readers.find(
                (reader: any) => reader.id === Number(inputTenDocGia)
              ).ho_ten,
              ngay_muon: inputNgayMuon,
            };

            console.log(newBookLoanTicket);

            setInputTenDocGia("");
            setInputNgayMuon(now.toISOString().split("T")[0]);
            setPMSDetail([]);
            setIsValidate(false);

            handleSubmit(idUpdate, newBookLoanTicket);
          }}
        >
          Submit
        </button>
      </form>
    </Modal>
  );
}

export default UpdateBookLoanModal;
