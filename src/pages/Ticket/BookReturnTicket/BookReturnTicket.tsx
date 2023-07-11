import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../../../layouts/Layout/Layout";
import Banner from "layouts/Banner/Banner";
import TitleSection from "components/Title/TitleSection/TitleSection";
import Table from "components/Table/Table";
import Button from "components/Buton/Button";
import AddBookReturnModal from "./components/AddBookReturnModal";
import UpdateBookReturnModal from "./components/UpdataBookReturn";
import DeleteBookLoanModal from "./components/Delete";


import styles from "assets/Pages.module.scss";
import { API_URL } from "assets/config";

const BookReturnTicket = () => {
  const [books, setBooks] = useState([]) as any;
  const [idUpdate, setIdUpdate] = useState(0);
  const [idDelete, setIdDelete] = useState(0);
  useEffect(() => {
    axios
      .get(API_URL + "phieu-tra-sach")
      .then((response: any) => {
        setBooks(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleAdd(newBookReturnTicket: any) {
    axios
      .post(API_URL + "phieu-tra-sach", newBookReturnTicket)
      .then(function (response) {
        setBooks([...books, {tien_phat_ky_nay: response.data.tien_phat_ky_nay, ...newBookReturnTicket}]);
        alert("Thêm thành công");
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  function handleUpdate(idUpdate: number, newUpdate: any) {
    axios
      .put(API_URL + "phieu-tra-sach/" + idUpdate, newUpdate)
      .then(function (response) {
        setBooks(
          books.map((reader: any) => {
            if (reader.id === idUpdate)
              return {
                id: idUpdate,
                ...newUpdate,
              };
            return reader;
          })
        );
        alert("Cập nhật thành công");
      })
      .catch(function (error) {
        alert(error.response.data);
      });
    setIdUpdate(0);
  }

  function handleDelete(idReader: number) {
    console.log(idReader);
    axios
      .delete(API_URL + "phieu-tra-sach/" + idReader)
      .then(function (response) {
        setBooks(
          books.filter((reader: any) => {
            return reader.id !== idReader;
          })
        );
        alert("Xóa thành công");
      })
      .catch(function (error) {
        alert(error.response.data);
      });
      setIdDelete(0);
  }

  const tableHead = ["STT", "Họ tên độc giả", "Ngày trả", "Tiền phạt kỳ này"];

  const tableData: string[][] = [];
  if (books) {
    books.forEach((book: any, index: number) => {
      const rowItem = [
        (index + 1).toString(),
        book.ten_doc_gia,
        book.ngay_tra,
        book.tien_phat_ky_nay,
        book.id,
      ];
      tableData.push(rowItem);
    });
  }

  const actionHandle = [
    {
      title: "Cập nhật",
      modal: "#updateBookReturnTicket",
      handleClick: (id: number) => {
        setIdUpdate(id);
      },
    },
    {
      title: "Xóa",
      modal: "#deleteBookLoanTicket",
      handleClick: (id: number) => {
        setIdDelete(id);
      },
    },
  ];

  return (
    <Layout>
      <Banner title="Quản lý phiếu trả sách" />
      <TitleSection title="Danh sách những phiếu trả sách trong thư viện" />
      <Table
        tableHead={tableHead}
        tableData={tableData}
        actionHandle={actionHandle}
      />
      <div className={styles["container-button"]}>
        <Button>
          <button
            type="button"
            className={`btn btn-primary ${styles["button-add"]}`}
            data-bs-toggle="modal"
            data-bs-target="#addBookReturnTicket"
          >
            Thêm Phiếu trả sách
          </button>
        </Button>
      </div>
      <AddBookReturnModal handleSubmit={handleAdd} />
      <UpdateBookReturnModal idUpdate={idUpdate} handleSubmit={handleUpdate} />
      <DeleteBookLoanModal
        idDelete={idDelete}
        handleSubmit={handleDelete}
      />
    </Layout>
  );
};

export default BookReturnTicket;
