import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../../layouts/Layout/Layout";
import Banner from "layouts/Banner/Banner";
import TitleSection from "components/Title/TitleSection/TitleSection";
import Table from "components/Table/Table";
import Button from "components/Buton/Button";
import AddReaderModal from "./components/AddReaderModal";
import UpdateReaderModal from "./components/UpdateReaderModal";
import DeleteReaderModal from "./components/DeleteReaderModal";

import styles from "assets/Pages.module.scss";
import { API_URL } from "assets/config";

function Reader() {
  const [readers, setReaders] = useState([]) as any;
  const [idUpdateReader, setIdUpdateReader] = useState(0);
  const [idDeleteReader, setIdDeleteReader] = useState(0);

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

  function handleAdd(newReader: any) {
    axios
      .post(API_URL + "the-doc-gia", newReader)
      .then(function (response) {
        setReaders([...readers, response.data]);
        alert("Thêm Thành Công");
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  function handleUpdate(idReader: number, newReader: any) {
    axios
      .put(API_URL + "the-doc-gia/" + idReader, newReader)
      .then(function (response) {
        setReaders(
          readers.map((reader: any) => {
            if (reader.id === idReader) 
              return {
                id: idReader,
                ...response.data
              };
            return reader;
          })
        );
        alert("Cập nhật thành công");
      })
      .catch(function (error) {
        alert(error.response.data);
      });
    setIdUpdateReader(0);
  }

  function handleDelete(idReader: number) {
    console.log(idReader);
    axios
      .delete(API_URL + "the-doc-gia/" + idReader)
      .then(function (response) {
        setReaders(
          readers.filter((reader: any) => {
            return reader.id !== idReader;
          })
        );
        alert("Xóa thành công");
      })
      .catch(function (error) {
        alert(error.response.data);
      });
    setIdDeleteReader(0);
  }

  const tableHead = [
    "STT",
    "Họ và tên",
    "Loại độc giả",
    "Ngày sinh",
    "Địa chỉ",
    "Email",
    "Ngày lập thẻ",
    "Tổng nợ",
  ];

  const tableData: string[][] = [];
  if (readers) {
    readers.forEach((reader: any, index: number) => {
      const rowItem = [
        (index + 1).toString(),
        reader.ho_ten,
        reader.loai_doc_gia,
        reader.ngay_sinh,
        reader.dia_chi,
        reader.email,
        reader.ngay_lap_the,
        reader.tong_no,
        reader.id,
      ];
      tableData.push(rowItem);
    });
  }

  const actionHandle = [
    {
      title: "Chỉnh sửa",
      modal: "#updateReader",
      handleClick: (id: number) => {
        setIdUpdateReader(id);
      },
    },
    {
      title: "Xóa",
      modal: "#deleteReader",
      handleClick: (id: number) => {
        setIdDeleteReader(id);
      },
    },
  ];

  return (
    <Layout>
      <Banner title="Quản lý thẻ độc giả" />
      <TitleSection title="Danh sách thẻ độc giả trong thư viện" />
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
            data-bs-target="#addReader"
          >
            Thêm thẻ độc giả
          </button>
        </Button>
      </div>

      <AddReaderModal handleSubmit={handleAdd} />
      <UpdateReaderModal
        idReader={idUpdateReader}
        handleSubmit={handleUpdate}
      />
      <DeleteReaderModal
        idReader={idDeleteReader}
        handleSubmit={handleDelete}
      />
    </Layout>
  );
}

export default Reader;
