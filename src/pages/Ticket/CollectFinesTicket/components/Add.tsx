import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "components/Modal/Modal";
import "bootstrap/js/dist/modal";
import { API_URL } from "assets/config";

type AddBookLoanModalProps = {
  handleSubmit: (addReader: any) => void;
};


function AddBookLoanModal({ handleSubmit }: AddBookLoanModalProps) {
  const [isValidate, setIsValidate] = useState(false);

  const [readers, setReaders] = useState([]) as any;


  let tongNo = 0;
  let conLai = 0;
  const [inputTenDocGia, setInputTenDocGia] = useState(0);
  const [inputSoTienThu, setSoTienThu] = useState(0);

  useEffect(() => {
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
    if (inputTenDocGia && inputSoTienThu ) {
      if (!isValidate) setIsValidate(true);
    } else if (isValidate) {
      setIsValidate(false);
    }
  }

  checkValidate();

  if (readers.find((r: any) => r.id === inputTenDocGia)) {
    tongNo = readers.find((r: any) => r.id === inputTenDocGia)["tong_no"]
    conLai  = tongNo - inputSoTienThu
  }

  return (
    <Modal title="Thêm Phiếu thu tiền phạt" modalId="addBookLoanTicket">
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
            value={
              readers.find((r: any) => r.id === inputTenDocGia) !== undefined
                ? readers.find((r: any) => r.id === inputTenDocGia)["tong_no"]
                : ""
            }
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
            required={true}
            onChange={(e) => {
                setSoTienThu(Number(e.target.value))
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
                so_tien_thu: inputSoTienThu,
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
