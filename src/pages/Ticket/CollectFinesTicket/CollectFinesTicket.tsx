import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../../../layouts/Layout/Layout";
import Banner from "layouts/Banner/Banner";
import TitleSection from "components/Title/TitleSection/TitleSection";
import Table from "components/Table/Table";
import Button from "components/Buton/Button";
import AddBookLoanModal from "./components/Add";
import UpdateBookLoanModal from "./components/Update";
import DeleteBookLoanModal from "./components/Delete";

import styles from "assets/Pages.module.scss";
import { API_URL } from "assets/config";

const CollectFinesTicket = () => {
  const [books, setBooks] = useState([]) as any;
  const [readers, setReaders] = useState([]) as any;

  const [idUpdate, setIdUpdate] = useState(0);
  const [idDelete, setIdDelete] = useState(0);

  useEffect(() => {
    axios
      .get(API_URL + "phieu-thu-tien-phat")
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

  function handleAdd(newCollectFinesTicket: any) {
    axios
      .post(API_URL + "phieu-thu-tien-phat", newCollectFinesTicket)
      .then(function (response) {
        setBooks([...books, {"id": response.data.id,...newCollectFinesTicket}]);
        console.log(response.data)
        alert("Thêm thành công");
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  function handleUpdate(idUpdate: number, newUpdate: any) {
    axios
      .put(API_URL + "phieu-thu-tien-phat/" + idUpdate, newUpdate)
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
      .delete(API_URL + "phieu-thu-tien-phat/" + idReader)
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

  const tableHead = ["STT", "Họ tên độc giả", "Số tiền thu", "Còn lại"];

  const tableData: string[][] = [];
  if (books) {
    books.forEach((book: any, index: number) => {
      const rowItem = [
        (index + 1).toString(),
        readers.find((r: any) => r.id===book.id_the_doc_gia) ? readers.find((r: any) => r.id===book.id_the_doc_gia).ho_ten : "",
        book.so_tien_thu,
        book.con_lai,
        book.id,
      ];
      tableData.push(rowItem);
    });
  }

  const actionHandle = [
    {
      title: "Cập nhật",
      modal: "#updateBookLoanTicket",
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
      <Banner title="Quản lý phiếu thu tiền phạt" />
      <TitleSection title="Danh sách những phiếu thu tiền phạt trong thư viện" />
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
            data-bs-target="#addBookLoanTicket"
          >
            Thêm Phiếu thu tiền phạt
          </button>
        </Button>
      </div>
      <AddBookLoanModal handleSubmit={handleAdd} />
      <UpdateBookLoanModal idUpdate={idUpdate} handleSubmit={handleUpdate} />
      <DeleteBookLoanModal
        idDelete={idDelete}
        handleSubmit={handleDelete}
      />
    </Layout>
  );
};

export default CollectFinesTicket;
