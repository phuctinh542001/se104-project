import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "components/Modal/Modal";
import "bootstrap/js/dist/modal";
import { API_URL } from "assets/config";

type AddBookLoanModalProps = {
  handleSubmit: (addReader: any) => void;
};

const bookInit = {
  id: 0,
  ma_sach: "",
  ten_sach: "",
  ten_the_loai: "",
  ten_tac_gia: "",
};

const now = new Date();

function AddBookLoanModal({ handleSubmit }: AddBookLoanModalProps) {
  const [isValidate, setIsValidate] = useState(false);

  const [books, setBooks] = useState([]) as any;
  const [readers, setReaders] = useState([]) as any;
  const [bookList, setBookList] = useState([
    bookInit,
    bookInit,
    bookInit,
    bookInit,
    bookInit,
  ]);

  const [inputTenDocGia, setInputTenDocGia] = useState("");
  const [inputNgayMuon, setInputNgayMuon] = useState(
    now.toISOString().split("T")[0]
  );

  useEffect(() => {
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
  }, []);

  function checkValidate() {
    if (inputTenDocGia && inputNgayMuon) {
      if (!isValidate) setIsValidate(true);
    } else if (isValidate) {
      setIsValidate(false);
    }
  }

  checkValidate();

  return (
    <Modal
      title="Thêm Phiếu mượn sách"
      modalId="addBookLoanTicket"
      size="modal-lg"
    >
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
            value={inputTenDocGia ? inputTenDocGia : ""}
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
          {bookList.map((book, index) => {
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
                    onChange={(e) => {
                      const findBook = books.find((book: any) => {
                        return book.ma_sach === e.target.value;
                      });
                      if (findBook) {
                        const newBook = {
                          id: findBook.id,
                          ma_sach: findBook.ma_sach,
                          ten_sach: findBook.ten_sach,
                          ten_the_loai: findBook.ten_the_loai,
                          ten_tac_gia: findBook.ten_tac_gia,
                        };
                        setBookList(
                          bookList.map((book: any, i) => {
                            if (i === index) return newBook;
                            return book;
                          })
                        );
                      } else
                        setBookList(
                          bookList.map((book: any, i) => {
                            if (i === index) return bookInit;
                            return book;
                          })
                        );
                    }}
                  />
                </div>
                <div className="col-4 p-0">
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    value={book.ten_sach}
                    disabled
                  />
                </div>
                <div className="col-2 p-0">
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    value={book.ten_the_loai}
                    disabled
                  />
                </div>
                <div className="col-3 p-0">
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    value={book.ten_tac_gia}
                    disabled
                  />
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="btn btn-primary"
          type="submit"
          data-bs-dismiss="modal"
          disabled={!isValidate}
          onClick={(e) => {
            e.preventDefault();

            const ds_sach: any[] = [];
            bookList.forEach((book: any) => {
              if (book.id) ds_sach.push({ id: book.id });
            });

            const newBookLoanTicket = {
              id_the_doc_gia: Number(inputTenDocGia),
              ten_doc_gia: readers.find(
                (reader: any) => reader.id === Number(inputTenDocGia)
              ).ho_ten,
              ngay_muon: inputNgayMuon,
              ds_sach: ds_sach,
            };

            console.log(newBookLoanTicket);

            setInputTenDocGia("");
            setInputNgayMuon(now.toISOString().split("T")[0]);
            setBookList([bookInit, bookInit, bookInit, bookInit, bookInit]);
            setIsValidate(false);

            handleSubmit(newBookLoanTicket);
          }}
        >
          Submit
        </button>
      </form>
    </Modal>
  );
}

export default AddBookLoanModal;
