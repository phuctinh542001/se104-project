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

import styles from "../Pages.module.scss";

function Home() {
  const [readers, setReaders] = useState([]) as any;
  const [idUpdateReader, setIdUpdateReader] = useState(0);
  const [idDeleteReader, setIdDeleteReader] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3030/readers")
      .then((response: any) => {
        setReaders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleAdd(newReader: any) {
    axios
      .post("http://localhost:3030/readers", newReader)
      .then(function (response) {
        setReaders([...readers, response.data]);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log("Thêm thành công");
  }

  function handleUpdate(idReader: number, newReader: any) {
    axios
      .put("http://localhost:3030/readers/" + idReader, newReader)
      .then(function (response) {
        setReaders(readers.map((reader: any) => {
          if (reader.id === idReader)
            return response.data
          return reader
        }));
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setIdUpdateReader(0);
    console.log("Cập nhật thành công");
  }

  function handleDelete(idReader: number) {
    console.log(idReader)
    axios
      .delete("http://localhost:3030/readers/" + idReader)
      .then(function (response) {
        setReaders(
          readers.filter((reader: any) => {
            return reader.id !== idReader;
          })
        );
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setIdDeleteReader(0);
    console.log("Xóa thành công");
  }

  const tableHead = [
    "STT",
    "Họ và tên",
    "Loại độc giả",
    "Ngày sinh",
    "Địa chỉ",
    "Email",
    "Ngày lập thẻ",
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

export default Home;
