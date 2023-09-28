import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  DesktopOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useState } from "react";
import Profile from "../HomeTemplate/Layout/Profile/Profile";

const { Header, Sider, Content } = Layout;

const { SubMenu } = Menu;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const userLogin = JSON.parse(localStorage.getItem("USER_LOGIN"));
  // console.log(userLogin.maLoaiNguoiDung === "KhachHang");

  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  // SCROLL khi navigate
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  // LOGIC XU LY DANG NHAP VAO ADMIN
  useEffect(() => {
    if (!localStorage.getItem("USER_LOGIN")) {
      toast.info("BAN CAN DANG NHAP");
      navigate("/");
      // NGUOI DUNG CHUA DANG NHAP
    } else {
      if (userLogin && userLogin?.maLoaiNguoiDung === "KhachHang") {
        console.log(1);
        toast.error("Bạn không có quyền truy cập");
        navigate("/");
      } else {
        // Da xac thuc la admin
        setAuth(true);
      }
    }
  }, [userLogin, navigate]);

  // Neu chua xac thuc khong hien thi
  if (!auth) {
    return null;
  }

  // SUBMENU

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem(
      <div
        onClick={() => {
          navigate("/admin/dashboard");
        }}
      >
        Dash Board
      </div>,
      "1",
      <PieChartOutlined />
    ),

    getItem("User", "sub1", <UserOutlined />, [
      getItem(
        <div
          onClick={() => {
            navigate("/admin/filmAdmin");
          }}
        >
          Film
        </div>,
        "3"
      ),
      getItem(
        <div
          onClick={() => {
            navigate("/admin/addnew");
          }}
        >
          Add New
        </div>,
        "4"
      ),
    ]),
    getItem("Team", "sub2", <TeamOutlined />, [
      getItem("Team 1", "6"),
      getItem("Team 2", "8"),
    ]),
    getItem("Files", "9", <FileOutlined />),
  ];

  return (
    <>
      <div
        style={{ backgroundColor: "#001529" }}
        className="flex justify-between items-center w-full p-3"
      >
        <div
          className="text-white text-2xl ml-2"
          onClick={() => {
            navigate("/admin");
          }}
        >
          LOGO MOVIE
        </div>
        <div className="text-white">
          <Profile />
        </div>
      </div>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              // background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default App;
