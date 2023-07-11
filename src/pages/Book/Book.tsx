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

import styles from "assets/Pages.module.scss";
import { API_URL } from "assets/config";

function Book() {
  const [books, setBooks] = useState([]) as any;
  const [superBooks, setSuperBooks] = useState([]) as any;
  const [inputSearch, setInputSearch] = useState("");
  const [idUpdateBook, setIdUpdateBook] = useState(0);
  const [idDeleteBook, setIdDeleteBook] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/sach")
      .then((response: any) => {
        setBooks(response.data);
        setSuperBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleAdd(newBook: any) {
    axios
      .post(API_URL + "sach", newBook)
      .then(function (response) {
        setBooks([...books, newBook]);
        alert("Thêm thành công");
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  function handleUpdate(idBook: number, newBook: any) {
    console.log(newBook);
    axios
      .put(API_URL + "sach/" + idBook, newBook)
      .then(function (response) {
        setBooks(
          books.map((book: any) => {
            if (book.id === idBook)
              return {
                id: idBook,
                ...newBook,
              };
            return book;
          })
        );
        alert("Cập nhật thành công");
      })
      .catch(function (error) {
        alert(error.response.data);
      });
    setIdUpdateBook(0);
  }

  function handleDelete(idBook: number) {
    axios
      .delete(API_URL + "sach/" + idBook)
      .then(function (response) {
        setBooks(
          books.filter((book: any) => {
            return book.id !== idBook;
          })
        );
        alert("Xóa thành công");
      })
      .catch(function (error) {
        alert(error.response.data);
      });
    setIdDeleteBook(0);
  }

  function handleSearch() {
    if (inputSearch != "") {
      setBooks(superBooks.filter((b: any) => {
        return b.ten_sach.includes(inputSearch)
      }))
    } else
      setBooks(superBooks)
  }
  const tableHead = [
    "STT",
    "Mã sách",
    "Tên sách",
    "Thể loại",
    "Tác giả",
    "Trị giá",
    "Số lượng",
  ];

  const tableData: string[][] = [];
  if (books) {
    books.forEach((book: any, index: number) => {
      const rowItem = [
        (index + 1).toString(),
        book.ma_sach,
        book.ten_sach,
        book.ten_the_loai,
        book.ten_tac_gia,
        book.tri_gia,
        book.so_luong,
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
      <input
        style={{
          marginBottom: "20px",
          width: "400px"
        }}
        type="text"
        placeholder="Nhập tên sách cần tìm"
        onChange={(e) => {setInputSearch(e.target.value)}}
      />
      <button onClick={handleSearch}>Tìm kiếm</button>
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
      <UpdateBookModal idBook={idUpdateBook} handleSubmit={handleUpdate} />
      <DeleteBookModal idBook={idDeleteBook} handleSubmit={handleDelete} />
    </Layout>
  );
}

export default Book;
