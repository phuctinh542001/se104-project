import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../../layouts/Layout/Layout";
import Banner from "layouts/Banner/Banner";
import TitleSection from "components/Title/TitleSection/TitleSection";

import { API_URL } from "assets/config";

function Regulation() {
  const [isValidate, setIsValidate] = useState(false);

  const [tuoiToiThieu, setTuoiToiThieu] = useState(0);
  const [tuoiToiDa, setTuoiToiDa] = useState(0);
  const [thoiHanThe, setThoiHanThe] = useState(0);
  const [thoiGianXB, setThoiGianXB] = useState(0);
  const [muonToiDa, setMuonToiDa] = useState(0);
  const [thoiHanMuon, setThoiHanMuon] = useState(0);
  const [phatTraTre, setPhatTratre] = useState(0);

  useEffect(() => {
    axios
      .get(API_URL + "tham-so")
      .then((response: any) => {
        setTuoiToiThieu(response.data[0].gia_tri);
        setTuoiToiDa(response.data[1].gia_tri);
        setThoiHanThe(response.data[2].gia_tri);
        setThoiGianXB(response.data[3].gia_tri);
        setMuonToiDa(response.data[4].gia_tri);
        setThoiHanMuon(response.data[5].gia_tri);
        setPhatTratre(response.data[6].gia_tri);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleUpdate() {
    const quydinh = [];

    quydinh.push({
      gia_tri: tuoiToiThieu,
    });
    quydinh.push({
      gia_tri: tuoiToiDa,
    });
    quydinh.push({
      gia_tri: thoiHanThe,
    });
    quydinh.push({
      gia_tri: thoiGianXB,
    });
    quydinh.push({
      gia_tri: muonToiDa,
    });
    quydinh.push({
      gia_tri: thoiHanMuon,
    });
    quydinh.push({
      gia_tri: phatTraTre,
    });
    axios
      .put(API_URL + "tham-so", quydinh)
      .then(function (response) {
        alert("Cập nhật thành công");
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  }

  function checkValidate() {
    if (
      tuoiToiThieu &&
      tuoiToiDa &&
      thoiHanThe &&
      thoiGianXB &&
      muonToiDa &&
      thoiHanMuon &&
      phatTraTre
    ) {
      if (!isValidate) setIsValidate(true);
    } else if (isValidate) {
      setIsValidate(false);
    }
  }

  checkValidate();

  return (
    <Layout>
      <Banner title="Quản lý quy định" />
      <TitleSection title="Những quy định trong thư viện" />
      <form
        className="row g-3 needs-validation was-validated"
        noValidate={true}
      >
        <div className="col-md-6">
          <label htmlFor="inputTriGia" className="form-label">
            Độ tuổi tối thiểu của độc giả
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="inputTriGia"
              value={tuoiToiThieu ? tuoiToiThieu : ""}
              aria-describedby="addon-trigia"
              onChange={(e) => setTuoiToiThieu(Number(e.target.value))}
              required
            />
            <span className="input-group-text" id="addon-trigia">
              Tuổi
            </span>
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputTriGia" className="form-label">
            Độ tuổi tối da của độc giả
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="inputTriGia"
              value={tuoiToiDa ? tuoiToiDa : ""}
              aria-describedby="addon-trigia"
              onChange={(e) => setTuoiToiDa(Number(e.target.value))}
              required
            />
            <span className="input-group-text" id="addon-trigia">
              Tuổi
            </span>
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="inputTriGia" className="form-label">
            Thời hạn thẻ
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="inputTriGia"
              value={thoiHanThe ? thoiHanThe : ""}
              aria-describedby="addon-trigia"
              onChange={(e) => setThoiHanThe(Number(e.target.value))}
              required
            />
            <span className="input-group-text" id="addon-trigia">
              Tháng
            </span>
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="inputTriGia" className="form-label">
            Thời gian xuất bản
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="inputTriGia"
              value={thoiGianXB ? thoiGianXB : ""}
              aria-describedby="addon-trigia"
              onChange={(e) => setThoiGianXB(Number(e.target.value))}
              required
            />
            <span className="input-group-text" id="addon-trigia">
              Năm
            </span>
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="inputTriGia" className="form-label">
            Mượn tối đa
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="inputTriGia"
              value={muonToiDa ? muonToiDa : ""}
              aria-describedby="addon-trigia"
              onChange={(e) => setMuonToiDa(Number(e.target.value))}
              required
            />
            <span className="input-group-text" id="addon-trigia">
              Quyển
            </span>
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="inputTriGia" className="form-label">
            Thời hạn mượn
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="inputTriGia"
              value={thoiHanMuon ? thoiHanMuon : ""}
              aria-describedby="addon-trigia"
              onChange={(e) => setThoiHanMuon(Number(e.target.value))}
              required
            />
            <span className="input-group-text" id="addon-trigia">
              Ngày
            </span>
          </div>
        </div>
        <div className="col-md-4">
          <label htmlFor="inputTriGia" className="form-label">
            Phạt trả trể
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="inputTriGia"
              value={phatTraTre ? phatTraTre : ""}
              aria-describedby="addon-trigia"
              onChange={(e) => setPhatTratre(Number(e.target.value))}
              required
            />
            <span className="input-group-text" id="addon-trigia">
              VND
            </span>
          </div>
        </div>
        <div className="col-md-12">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "240px", height: "60px" }}
            onClick={(e) => {
              e.preventDefault();
              handleUpdate()
            }}
            disabled={!isValidate}
          >
            Cập nhật quy định
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default Regulation;
