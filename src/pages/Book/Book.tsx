import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../../layouts/Layout/Layout";
import Banner from "layouts/Banner/Banner";
import TitleSection from "components/Title/TitleSection/TitleSection";
import Table from "components/Table/Table";
import Button from "components/Buton/Button";
import AddBookModal from "./components/AddBookModal";
import UpdateBookModal from "./components/UpdateBookModal";
import DeleteBookModal from "./components/DeleteBookModal";

import styles from "../Pages.module.scss";

function Book() {
  const [books, setBooks] = useState([]) as any;
  const [idUpdateBook, setIdUpdateBook] = useState(0);
  const [idDeleteBook, setIdDeleteBook] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3030/books")
      .then((response: any) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleAdd(newBook: any) {
    axios
      .post("http://localhost:3030/books", newBook)
      .then(function (response) {
        setBooks([...books, response.data]);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log("Thêm thành công");
  }

  function handleUpdate(idBook: number, newBook: any) {
    console.log(newBook);
    axios
      .put("http://localhost:3030/books/" + idBook, newBook)
      .then(function (response) {
        setBooks(books.map((book: any) => {
          if (book.id === idBook)
            return response.data
          return book
        }));
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setIdUpdateBook(0);
    console.log("Cập nhật thành công");
  }

  function handleDelete(idBook: number) {
    axios
      .delete("http://localhost:3030/books/" + idBook)
      .then(function (response) {
        setBooks(
          books.filter((book: any) => {
            return book.id !== idBook;
          })
        );
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setIdDeleteBook(0);
    console.log("Xóa thành công");
  }

  const tableHead = [
    "STT",
    "Tên sách",
    "Thể loại",
    "Tác giả",
    "Năm XB",
    "Nhà XB",
    "Ngày nhập",
    "Trị giá"
  ];

  const tableData: string[][] = [];
  if (books) {
    books.forEach((book: any, index: number) => {
      const rowItem = [
        (index + 1).toString(),
        book.ten_sach,
        book.the_loai,
        book.tac_gia,
        book.nam_xb,
        book.nxb,
        book.ngay_nhap,
        book.tri_gia,
        book.id,
      ];
      tableData.push(rowItem);
    });
  }

  const actionHandle = [
    {
      title: "Chỉnh sửa",
      modal: "#updateBook",
      handleClick: (id: number) => {
        setIdUpdateBook(id);
      },
    },
    {
      title: "Xóa",
      modal: "#deleteBook",
      handleClick: (id: number) => {
        setIdDeleteBook(id);
      },
    },
  ];

  return (
    <Layout>
      <Banner title="Quản lý sách" />
      <TitleSection title="Danh sách những quyển sách trong thư viện" />
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
            data-bs-target="#addBook"
          >
            Thêm sách
          </button>
        </Button>
      </div>

      <AddBookModal handleSubmit={handleAdd} />
      <UpdateBookModal
        idBook={idUpdateBook}
        handleSubmit={handleUpdate}
      />
      <DeleteBookModal
        idBook={idDeleteBook}
        handleSubmit={handleDelete}
      />
    </Layout>
  );
}

export default Book;
