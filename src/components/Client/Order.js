import { useEffect, useState } from "react";
import Header from "./Header";
import { Container, Row, Col, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";
const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/OrderDetail")
      .then((res) => res.json())
      .then((result) => {
        setOrder(
          result.find((o) => {
            return o.id == id;
          })
        );
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:9999/Order")
      .then((res) => res.json())
      .then((Order) => {
        fetch("http://localhost:9999/Product")
          .then((res) => res.json())
          .then((Product) => {
            let listPrCol = [];
            const orderdetails = Order.filter((o) => {
              return o.OrderDetailId == id;
            });
            const filtedProduct = Product.filter((p) => {
              for (const o of orderdetails) {
                if (p.id == o.product_id) return p;
              }
            });
            for (const o of orderdetails) {
              for (const p of filtedProduct) {
                if (o.product_id == p.id) {
                  const newProduct = {
                    ...p,
                    quantity: o.Quantity,
                    Color: o.Color,
                    PurchasedPrice: o.Price,
                  };
                  listPrCol.push(newProduct);
                  break;
                }
              }
            }
            setOrderDetail(listPrCol);
          });
      });
  }, []);
  return (
    <div>
      {console.log(orderDetail)}
      <Header />
      <Container style={{ marginTop: "100px" }}>
        <Row>
          <Col md={12}>
            <h1>Đơn hàng của bạn</h1>
            <Table>
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Hình ảnh</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Màu sắc</th>
                </tr>
              </thead>
              <tbody>
                {orderDetail.map((d) => {
                  return (
                    <tr>
                      <td>{d.Name}</td>
                      <td>
                        <img src={d.Images} style={{ height: "60px" }} />
                      </td>
                      <td>{d.PurchasedPrice}</td>
                      <td>{d.quantity}</td>
                      <td>{d.Color}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <p>{`Tên: ${order.lastName} ${order.firstName}`}</p>
            <p>{`SĐT: ${order.phone}`}</p>
            <p>{`Địa chỉ: ${order.address}`}</p>
            <p>{`Email: ${order.email}`}</p>
            <p>{`Ngày đặt hàng: ${order.email}`}</p>
            <p>{`Phương thức thanh toán: ${order.purchaseMethod}`}</p>
            <h3 style={{ color: "red" }}>{`Tổng tiền: ${new Intl.NumberFormat(
              "vi-VN",
              {
                style: "currency",
                currency: "VND",
              }
            ).format(order.totalPrice)}`}</h3>
          </Col>
        </Row>
        <Link to={`/`}>
          <button className="btn btn-warning">Back to home</button>
        </Link>
      </Container>
      <Footer />
    </div>
  );
};
export default Order;
