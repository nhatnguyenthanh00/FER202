import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/js/dist/modal";
import ListProduct from "./components/Client/ListProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Home from "./components/Client/Home/Home";
import Login from "./components/common/Login/Login";
import Signup from "./components/common/Register/Register";
import ProductDetail from "./components/Client/ProductDetail";
import ShoppingCard from "./components/Client/ShoppingCard";
import Logout from "./components/common/Logout/Logout";
import Purchase from "./components/Client/Purchase";
import Search from "./components/Client/Search";
import DashBoard from "./components/admin/DashBoard";
import AdminListProduct from "./components/admin/AdminListProduct";
import EditProduct from "./components/admin/EditProduct";
import OrderManagement from "./components/admin/OrderManagement";
import OrderDetail from "./components/admin/OrderDetails";
import CreateProduct from "./components/admin/CreateProduct";
import AdminUsers from "./components/admin/AdminUsers";
import Profile from "./components/common/Profile/Profile";
import Order from "./components/Client/Order";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dien-thoai" element={<ListProduct />}></Route>
        <Route path="/dien-thoai/:catId" element={<ListProduct />}></Route>
        <Route
          path="/dien-thoai/product-detail/:ID"
          element={<ProductDetail />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shoppingcard" element={<ShoppingCard />} />
        <Route path="/tim-kiem/:searchname" element={<Search />} />
        <Route path="/tim-kiem" element={<Search />} />
        <Route
          path="dien-thoai/purchase/:ID/:COLORID/:TYPE"
          element={<Purchase />}
        />
        <Route path="/dien-thoai/purchase/:TYPE" element={<Purchase />} />
        <Route path="/chi-tiet-san-pham/:ProductID" element={<EditProduct />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/myorder/:id" element={<Order />} />
        <Route path="/productmanagement" element={<AdminListProduct />} />
        <Route path="/adminusers" element={<AdminUsers />} />
        <Route path="/adminorders" element={<OrderManagement />} />
        <Route path="/chi-tiet-don-hang/:id" element={<OrderDetail />} />
        <Route path="/createproduct" element={<CreateProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
