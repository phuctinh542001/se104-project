import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "components/Modal/Modal";
import "bootstrap/js/dist/modal";
import { API_URL } from "assets/config";

type UpdateBookLoanModalProps = {
  idUpdate: number;
  handleSubmit: (idUpdate: number, newUpdate: any) => void;
};

function UpdateBookLoanModal({
  idUpdate,
  handleSubmit,
}: UpdateBookLoanModalProps) {
  const [isValidate, setIsValidate] = useState(false);

  const [books, setBooks] = useState([]) as any;
  const [readers, setReaders] = useState([]) as any;
  let tongNo = 0;
  let tienThuChenhLech = 0;
  const [inputTenDocGia, setInputTenDocGia] = useState(0);
  const [inputSoTienThu, setSoTienThu] = useState(0);
  const [conLai, setConlai] = useState(0);

  useEffect(() => {
    if (idUpdate !== 0) {
      axios
        .get(API_URL + "phieu-thu-tien-phat/" + idUpdate)
        .then((response: any) => {
          setInputTenDocGia(response.data.id_the_doc_gia);
          setSoTienThu(response.data.so_tien_thu);
          tienThuChenhLech = response.data.so_tien_thu;
          setConlai(response.data.con_lai);
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
    if (inputTenDocGia && inputSoTienThu) {
      if (!isValidate) setIsValidate(true);
    } else if (isValidate) {
      setIsValidate(false);
    }
  }

  tongNo = inputSoTienThu + conLai;

  checkValidate();

  return (
    <Modal title="Cập nhật phiếu thu tiền phạt" modalId="updateBookLoanTicket">
      <form
        className="row g-3 modal-lg needs-validation was-validated"
        noValidate={true}
      >
        {/* Mã sách */}
        <div className="col-md-12">
          <label htmlFor="inputMaSach" className="form-label">
            Tên độc giả
          </label>
          <select
            className="form-select"
            id="inputMaSach"
            value={inputTenDocGia ? inputTenDocGia : ""}
            required={true}
            onChange={(e) => {
              setInputTenDocGia(Number(e.target.value));
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
        <div className="col-md-12">
          <label htmlFor="inputTenSach" className="form-label">
            Tổng nợ
          </label>
          <input
            type="text"
            className="form-control"
            id="inputTenSach"
            value={tongNo}
            required={true}
            disabled
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="inputTenSach" className="form-label">
            Số tiền thu
          </label>
          <input
            type="text"
            className="form-control"
            id="inputTenSach"
            value={inputSoTienThu ? inputSoTienThu : ""}
            required={true}
            onChange={(e) => {
              tienThuChenhLech -= Number(e.target.value);
              setSoTienThu(Number(e.target.value));
            }}
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="inputTenSach" className="form-label">
            Nợ còn lại
          </label>
          <input
            type="text"
            className="form-control"
            id="inputTenSach"
            value={conLai}
            required={true}
            disabled
          />
        </div>

        <button
          className="btn btn-primary"
          type="submit"
          data-bs-dismiss="modal"
          disabled={!isValidate}
          onClick={(e) => {
            e.preventDefault();

            const newBookLoanTicket = {
                id_the_doc_gia: inputTenDocGia,
                so_tien_thu: tienThuChenhLech,
                con_lai: conLai
            };

            setReaders(readers.map((r: any) => {
                if (r.id === inputTenDocGia) {
                    console.log('hello')
                    return {
                        ...r,
                        tong_no: conLai,
                    }
                }
                return r
            }))

            setInputTenDocGia(0);
            setSoTienThu(0)
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
