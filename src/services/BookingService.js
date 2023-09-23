import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import axios from "../util/axiosCustomize";

export const getListPhongVe = (maPV) => {
  return axios.get(
    `https://movieapi.cyberlearn.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maPV}`
  );
};

export const postDatVe = (thongTinDatVe = new ThongTinDatVe()) => {
  return axios.post(
    `https://movieapi.cyberlearn.vn/api/QuanLyDatVe/DatVe`,
    thongTinDatVe
  );
};
