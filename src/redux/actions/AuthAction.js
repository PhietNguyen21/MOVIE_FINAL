import {
  getDanhSachNguoiDung,
  getTimKiemNguoiDung,
  postLogin,
  postRegister,
  postThemNguoiDung,
} from "../../services/AuthServices";
import {
  DANG_NHAP_THANH_CONG,
  DANG_NHAP_THAT_BAI,
  LAY_DANH_SACH_USER,
  LOGIN,
  REGISTER,
  TIM_KIEM_NGUOI_DUNG,
} from "./types/AuthType";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GP00 } from "../../types/configType";
import { DIS_LOADING, LOADING } from "./types/LoadingType";

export const postRegisterAction = (
  taiKhoan,
  matKhau,
  email,
  soDt,
  maNhom,
  hoTen
) => {
  return async (dispatch, getState) => {
    try {
      const res = await postRegister(
        taiKhoan,
        matKhau,
        email,
        soDt,
        maNhom,
        hoTen
      );
      if (res && res.statusCode === 0) {
        // console.log(res);
        dispatch({
          type: REGISTER,
          dataUser: {
            taiKhoan,
            matKhau,
            soDt,
            maNhom,
            hoTen,
          },
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

// export const postLoginAction = (taiKhoan, matKhau) => {
//   return async (dispatch, getState) => {
//     try {
//       const res = await postLogin(taiKhoan, matKhau);
//       if (res.statusCode === 200) {
//         toast.success("Đăng nhập thành công");

//         dispatch({
//           type: DANG_NHAP_THANH_CONG,
//           userLogin: res.content,
//           login: true,
//         });
//       } else {
//         toast.error(res.content);
//       }
//     } catch (error) {
//       console.log("error", error);
//     }
//   };
// };

export const getDanhSachNguoiDungAction = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADING,
    });
    try {
      const res = await getDanhSachNguoiDung();
      if (res && res.statusCode === 200) {
        // console.log(res);
        dispatch({
          type: LAY_DANH_SACH_USER,
          lstUser: res.content,
        });
      } else {
        console.log("FAIL", res.cotent);
      }
      setTimeout(() => {
        dispatch({
          type: DIS_LOADING,
        });
      }, [500]);
    } catch (error) {
      console.log("ERROR", error);
    }
  };
};

export const postThemNguoiDungAction = (
  taiKhoan,
  matKhau,
  email,
  soDt,
  maNhom,
  maLoaiNguoiDung,
  hoTen
) => {
  return async (dispatch) => {
    try {
      const res = await postThemNguoiDung(
        taiKhoan,
        matKhau,
        email,
        soDt,
        maNhom,
        maLoaiNguoiDung,
        hoTen
      );
      if (res && res.statusCode === 200) {
        toast.success("Thêm thành công");
      } else {
        toast.error(res.content);
      }
    } catch (error) {
      console.log("ERR", error);
    }
  };
};
export const getTimKiemNguoiDungAction = (tuKhoa) => {
  return async (dispatch) => {
    try {
      const res = await getTimKiemNguoiDung(tuKhoa);
      if (res && res.statusCode === 200) {
        dispatch({
          type: TIM_KIEM_NGUOI_DUNG,
          dataUser: res.content,
        });
      } else {
        console.log("LOI", res);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
};
