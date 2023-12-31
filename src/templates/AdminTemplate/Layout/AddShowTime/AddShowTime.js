import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  getThongTinCumRap,
  getThongTinHeThongRap,
} from "../../../../services/ManagerCinemaService";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";

import moment from "moment";
import { parseInt } from "lodash";
import { useDispatch } from "react-redux";
import { postTaoLichChieuAction } from "../../../../redux/actions/BookingTicketAction";
const AddShowTime = () => {
  const param = useParams();
  const { maPhim, tenPhim } = param;
  const dispatch = useDispatch();
  const [thongTinHeThongRap, setThongTinHeThongRap] = useState([]);

  const refSelect = useRef();
  const [thongTinCumRap, setThongTinCumRap] = useState([]);

  const layThongTinHeThongRap = async () => {
    try {
      const res = await getThongTinHeThongRap();
      if (res && res.statusCode === 200) {
        setThongTinHeThongRap(res.content);
      } else {
        console.log("ERR REQUEST", res);
      }
    } catch (error) {
      console.log("ERRR", error);
    }
  };

  const layThongTinCumRap = async (maHtr) => {
    try {
      const res = await getThongTinCumRap(maHtr);
      if (res && res.statusCode === 200) {
        setThongTinCumRap(res.content);
        // console.log("SUCCESS", res);
      } else {
        console.log("ERRR", res);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  //   console.log({ thongTinHeThongRap });
  useEffect(() => {
    layThongTinHeThongRap();
  }, []);

  const reverseThongTinHeThongRap = () => {
    return thongTinHeThongRap?.map((htr, index) => {
      return {
        label: htr.tenHeThongRap,
        value: htr.maHeThongRap,
      };
    });
  };
  //   useEffect(() => {
  //     // console.log(currentHtr);
  //   }, [currentHtr]);
  const handleChangeHTR = async (value) => {
    // console.log(value);

    await layThongTinCumRap(value);
  };
  const handleChangeCumRap = (value) => {
    formik.setFieldValue("maRap", value);
  };

  const onOk = (value) => {
    const date = moment(value).format("DD/MM/YYYY hh:mm:ss");

    formik.setFieldValue("ngayChieuGioChieu", date);
    console.log(formik.values.ngayChieuGioChieu);
  };

  const handleChangeDate = (value) => {
    const date = moment(value).format("DD/MM/YYYY hh:mm:ss");
    formik.setFieldValue("ngayChieuGioChieu", date);
    console.log(formik.values.ngayChieuGioChieu);
  };
  const reverseThongTinCumRap = () => {
    return thongTinCumRap?.map((cumRap, index) => {
      return {
        value: cumRap.maCumRap,
        label: cumRap.tenCumRap,
      };
    });
  };
  const formik = useFormik({
    initialValues: {
      maPhim: parseInt(maPhim),
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: 0,
    },
    onSubmit: async (value) => {
      console.log(value);

      await dispatch(
        postTaoLichChieuAction(
          value.maPhim,
          value.ngayChieuGioChieu,
          value.maRap,
          value.giaVe
        )
      );
      formik.resetForm();
    },
  });

  //   LAY FILM TU LOCAL STRORE
  let film = {};
  if (localStorage.getItem("FilmParam")) {
    film = JSON.parse(localStorage.getItem("FilmParam"));
  }
  console.log(film);

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-black mb-2">
          Tạo lịch chiếu phim {<b className="text-green-400">{tenPhim}</b>}
        </h1>
        <div className="img text-center flex justify-center mb-2">
          <img style={{ width: 150, height: 150 }} src={film.hinhAnh} alt="" />
        </div>
      </div>
      <Form
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item label="Hệ thống rạp">
          <Select
            placeholder="Chose he thong rap"
            options={reverseThongTinHeThongRap()}
            onChange={handleChangeHTR}
          />
        </Form.Item>
        <Form.Item label="Cum rap">
          <Select
            ref={refSelect}
            placeholder="Chose cum rap"
            options={reverseThongTinCumRap()}
            onChange={handleChangeCumRap}
          />
        </Form.Item>

        <Form.Item label="Ngay gio chieu">
          <DatePicker
            // value={formik.values.ngayChieuGioChieu}
            onChange={handleChangeDate}
            onOk={onOk}
            showTime
            format="YYYY-MM-DD hh:mm:ss"
          />
        </Form.Item>
        <Form.Item label="Gia ve">
          <InputNumber
            name="giaVe"
            value={formik.values.giaVe}
            onChange={(value) => {
              formik.setFieldValue("giaVe", value);
            }}
            min={75000}
            max={150000}
          />
        </Form.Item>
        <Form.Item label="Chuc nang">
          <Button
            type="submit"
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Add show time
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddShowTime;
