import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <Container
      fluid
      style={{
        textAlign: "center",
        backgroundColor: "#f2f2f2",
        marginTop: "100px",
      }}
      className="d-flex flex-column"
    >
      <p style={{ marginBottom: "10px", fontSize: "14px" }}>
        © 2007 - 2023 Công Ty Cổ Phần Bán Lẻ Kỹ Thuật Số FPT{" "}
      </p>
      <p style={{ marginBottom: "10px", fontSize: "14px" }}>
        Địa chỉ: 261 - 263 Khánh Hội, P5, Q4, TP. Hồ Chí Minh / GPĐKKD số
        0311609355 do Sở KHĐT TP.HCM cấp ngày 08/03/2012.{" "}
      </p>
      <p style={{ marginBottom: "10px", fontSize: "14px" }}>
        GPĐKKD số 0311609355 do Sở KHĐT TP.HCM cấp ngày 08/03/2012.{" "}
      </p>
      <p style={{ margin: "0", fontSize: "14px" }}>
        Chịu trách nhiệm nội dung: Nguyễn Trịnh Nhật Linh.
      </p>
      <p style={{ margin: "4px 0 12px 0", fontSize: "14px" }}>
        Điện thoại: (028) 7302 3456. Email: fptshop@fpt.com.vn. Chịu trách nhiệm
        nội dung: Nguyễn Trịnh Nhật Linh.
      </p>
    </Container>
  );
}
