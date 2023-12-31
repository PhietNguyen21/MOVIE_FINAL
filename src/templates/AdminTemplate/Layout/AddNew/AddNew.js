import { PlusOutlined } from "@ant-design/icons";

import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Spin,
  Switch,
} from "antd";
import { useState } from "react";
import { Formik, useFormik } from "formik";
import moment from "moment/moment";

import { useDispatch } from "react-redux";
import { GP00 } from "../../../../types/configType";
import { set } from "nprogress";
import { postThemFilm } from "../../../../services/MangerFilmServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postThemFilmAction } from "../../../../redux/actions/FilmAction";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const AddNew = () => {
  const [img, setIMG] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoadingAdd] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
      maNhom: GP00,
    },

    onSubmit: async (value, { resetForm }) => {
      setLoadingAdd(true);
      console.log(value);
      await dispatch(
        postThemFilmAction(
          value.tenPhim,
          value.trailer,
          value.moTa,
          moment(value.ngayKhoiChieu).format("DD/MM/YYYY"),
          value.sapChieu,
          value.dangChieu,
          value.hot,
          value.danhGia,
          value.hinhAnh,
          value.maNhom
        )
      );

      setLoadingAdd(false);
      formik.setFieldValue("ngayKhoiChieu", "");
      setIMG(null);
      resetForm();
    },
  });

  // const handelChaneDatePick = (value) => {
  //   const ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
  //   formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  // };

  const handleChangeIMG = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    //  khong co hinh tra ve preview IMG
    if (file === undefined) {
      setIMG(null);
    } else if (
      file?.type === "image/jpeg" ||
      file?.type === "image/jpg" ||
      file?.type === "image/gif" ||
      file?.type === "image/png"
    ) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setIMG(e.target.result);
        formik.setFieldValue("hinhAnh", file);
      };
    }
  };

  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <Form.Item label="Ten Phim">
          <Input
            name="tenPhim"
            value={formik.values.tenPhim}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            value={formik.values.trailer}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Mo ta">
          <TextArea
            name="moTa"
            value={formik.values.moTa}
            rows={4}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Ngay chieu"
          style={{
            cursor: "pointer",
          }}
        >
          <DatePicker
            value={formik.values.ngayKhoiChieu}
            style={{
              cursor: "pointer",
            }}
            name="ngayKhoiChieu"
            format={"DD/MM/YYYY"}
            onChange={(date) => formik.setFieldValue("ngayKhoiChieu", date)}
          />
        </Form.Item>

        <Form.Item label="Dang chieu">
          <Switch
            name="dangChieu"
            checked={formik.values.dangChieu}
            style={{ backgroundColor: "green" }}
            onChange={(value, e) => {
              formik.setFieldValue(e.target.name, value);
            }}
          />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch
            name="hot"
            checked={formik.values.hot}
            style={{ backgroundColor: "green" }}
            onChange={(value, e) => {
              formik.setFieldValue(e.target.name, value);
            }}
          />
        </Form.Item>
        <Form.Item label="Sap chieu" valuePropName="checked">
          <Switch
            checked={formik.values.sapChieu}
            name="sapChieu"
            style={{ backgroundColor: "green" }}
            onChange={(value, e) => {
              formik.setFieldValue(e.target.name, value);
            }}
          />
        </Form.Item>

        <Form.Item label="So sao">
          <InputNumber
            value={formik.values.danhGia}
            name="danhGia"
            onChange={(value) => {
              formik.setFieldValue("danhGia", value);
            }}
            min={0}
            max={10}
          />
        </Form.Item>
        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <input
            name="hinhAnh"
            type="file"
            id="uploadIMG"
            onChange={handleChangeIMG}
            hidden
          />

          <label
            className="bg-blue-400 p-2 border-blue-400 rounded cursor-pointer"
            htmlFor="uploadIMG"
          >
            Upload IMG
          </label>
          {img !== null ? (
            <div
              className="border-dotted border-2 p-4 text-center flex justify-center items-center mt-2 border-gray-400 rounded "
              style={{ height: 150 }}
            >
              <img src={img} alt="s" style={{ width: "100px", height: 100 }} />
            </div>
          ) : (
            <div
              className=" border-dotted border-2 text-center flex justify-center items-center mt-2 border-gray-400 rounded "
              style={{ height: 100 }}
            >
              Preview IMG ...
            </div>
          )}
        </Form.Item>
        <Form.Item label="Button">
          {!loading ? (
            <Button onClick={formik.handleSubmit} type="submit">
              Add Film
            </Button>
          ) : (
            <Button
              disabled={loading}
              type="submit"
              className="flex items-center"
            >
              <Spin size="small" className="mr-2" /> <span>Add Film</span>
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};
export default AddNew;
