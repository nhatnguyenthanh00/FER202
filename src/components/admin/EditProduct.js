import { Col, Container, Row, Button } from 'react-bootstrap'
import SideBar from './SideBar'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const EditProduct = () => {
    const defaultProduct = {
        ID: 0,
        Name: "",
        Category_ID: 1,
        Images: "",
        Specifications: {
            Screen: "",
            Rear_camera: "",
            Camera_Selfie: "",
            RAM: "",
            Internal_memory: "",
            CPU: "",
            Battery_capacity: "",
            Operating_system: "",
            Origin: "",
            Release_time: ""
        }
    }
    const { ProductID } = useParams();
    const [Product, setProduct] = useState(defaultProduct);
    const [Category, setCategory] = useState([]);
    const [Color, setColor] = useState([]);
    const name = useRef();
    const category = useRef();
    const price = useRef();
    const saleprice = useRef();
    const beginImage = useRef();
    const image = useRef();
    const screen = useRef();
    const rearCamera = useRef();
    const ram = useRef();
    const internalMemory = useRef();
    const cpu = useRef();
    const batteryCapacity = useRef();
    const operatingSystem = useRef();
    const origin = useRef();
    const releaseTime = useRef();
    const [img, setImg] = useState("");
    const [colorImage, setColorImage] = useState([]);
    const colorName = useRef();
    const quantity = useRef();
    const [isChange, setIsChange] = useState(true);
    useEffect(() => {
        fetch("http://localhost:9999/Product")
            .then((res) => res.json())
            .then((result) => {
                const currentProduct = result.find((r) => {
                    return r.id == ProductID;
                })
                setProduct(currentProduct);
                setImg(currentProduct.Images)
            });
    }, [])
    useEffect(() => {
        fetch("http://localhost:9999/Color")
            .then((res) => res.json())
            .then((result) => {
                const filterColor = result.filter((r) => {
                    return r.ProductId == ProductID;
                })
                setColor(filterColor);
            });
    }, [isChange])
    useEffect(() => {
        fetch("http://localhost:9999/Category")
            .then((res) => res.json())
            .then((result) => {
                setCategory(result);
            });
    }, [])

    const updateImage = (e) => {
        const link = e.target.value;
        const links = link.split("\\");
        const nameproduct = name.current.value.trim().split(" ");
        const linkname = nameproduct.join("_");
        setImg(`../../Images/Product/${linkname}/${links.pop()}`)
    }
    const defaultColor = {
        id: 0,
        ProductId: 0,
        ColorName: "",
        Images: [
        ],
        Quantity: ""
    }
    const [currentColor, setCurrentColor] = useState(defaultColor);
    const changeColor = (id) => {
        const clickedColor = Color.find((c) => {
            return c.id == id;
        })
        setCurrentColor(clickedColor)
        setColorImage(clickedColor.Images)
    }
    const handleImages = (e) => {
        if (name.current.value == "") {
            e.target.value = "";
            alert("Enter the name of the product please!")
        }
        else {
            // const newColor = color;
            const newImage = colorImage;
            const nameproduct = name.current.value.trim().split(" ");
            const linkname = nameproduct.join("_");
            const link = e.target.value;
            const links = link.split("\\");
            newImage.push(`../../Images/Product/${linkname}/${links.pop()}`);
            // console.log(newImage);
            setColorImage([...newImage]);
        }
    }
    const deleteImage = (index) => {
        const newImage = colorImage;
        const result = newImage.filter((i, iindex) => {
            return index != iindex;
        })
        setColorImage([...result])
    }
    const displayClose = (a) => {
        const id = document.getElementById(a);
        // console.log(id);
        id.style.display = "block";
    }
    const unDisplayClose = (a) => {
        const id = document.getElementById(a);
        // console.log(id);
        id.style.display = "none";
    }
    const updateColor = (id) => {
        const newColor = {
            id: id,
            ProductId: Product.id,
            ColorName: colorName.current.value,
            Quantity: quantity.current.value,
            Images: colorImage
        }
        fetch(`http://localhost:9999/color/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newColor),
        });
        alert("Change Successfully")
        setIsChange(!isChange)
    }
    const handleProduct = () => {
        if (name.current.value == "" || category.current.value == "" || price.current.value == "" || saleprice.current.value == ""
            && image.current.value == "" || screen.current.value == "") {
            alert("Nhập đầy đủ thông tin")
        }
        else {
            const newproduct = {
                id: Product.id,
                Name: name.current.value,
                Category_ID: category.current.value,
                Price: price.current.value,
                SalePrice: saleprice.current.value,
                Images: img,
                Specifications: {
                    Screen: screen.current.value,
                    Rear_camera: rearCamera.current.value,
                    RAM: ram.current.value,
                    Internal_memory: internalMemory.current.value,
                    CPU: cpu.current.value,
                    Battery_capacity: batteryCapacity.current.value,
                    Operating_system: operatingSystem.current.value,
                    Origin: origin.current.value,
                    Release_time: releaseTime.current.value
                }
            }
            fetch(`http://localhost:9999/Product/${Product.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newproduct),
            });
            alert("Change Successfully")
            setIsChange(!isChange)
        }
    }
    return (
        <div>
            <Container fluid>
                <Row>
                    <SideBar />
                    <Col md={10} style={{ padding: "0" }}>
                        <div className="topbar">
                            <h1 className="admin-title">Edit Product</h1>
                        </div>
                        <div className='admin-content'>
                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="ID">ID:</label>
                                        <input type="text" className="form-control" id="ID" defaultValue={Product.id} readOnly />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="category">Category:</label>
                                        <select className="form-control" id="category" ref={category}>
                                            {
                                                Category.map((c) => {
                                                    return (
                                                        <option selected={c.id == Product.Category_ID} value={c.id}>{c.Category_Name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" className="form-control" id="name" defaultValue={Product.Name} ref={name} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="price">Price:</label>
                                        <input type="number" className="form-control" id="price" defaultValue={Product.Price} ref={price} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="saleprice">SalePrice:</label>
                                        <input type="number" className="form-control" id="saleprice" defaultValue={Product.SalePrice} ref={saleprice} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <img src={img} style={{ width: "100%" }} />
                                    <div className="form-group">
                                        <label htmlFor="image">Image:</label>
                                        <input type="hidden" defaultValue={Product.Images} ref={beginImage} />
                                        <input type="file" className="form-control" id="image" ref={image} onChange={(e) => updateImage(e)} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <Container fluid>
                                        <Row>
                                            <Col style={{ padding: "0" }} md={12}>
                                                <div className="form-group">
                                                    <Row>
                                                        <Col md={3} style={{ lineHeight: "30px" }}>
                                                            <label htmlFor="screen">Screen:</label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <input type="text" className="form-control" id="screen" defaultValue={Product.Specifications.Screen} ref={screen} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col style={{ padding: "0" }} md={12}>
                                                <div className="form-group">
                                                    <Row>
                                                        <Col md={3} style={{ lineHeight: "30px" }}>
                                                            <label htmlFor="Rear_camera">Rear camera:</label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <input type="text" className="form-control" id="Rear_camera" defaultValue={Product.Specifications.Rear_camera} ref={rearCamera} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col style={{ padding: "0" }} md={12}>
                                                <div className="form-group">
                                                    <Row>
                                                        <Col md={3} style={{ lineHeight: "30px" }}>
                                                            <label htmlFor="RAM">RAM:</label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <input type="text" className="form-control" id="RAM" defaultValue={Product.Specifications.RAM} ref={ram} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col style={{ padding: "0" }} md={12}>
                                                <div className="form-group">
                                                    <Row>
                                                        <Col md={3} style={{ lineHeight: "30px" }}>
                                                            <label htmlFor="Internal_memory">Internal memory:</label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <input type="text" className="form-control" id="Internal_memory" defaultValue={Product.Specifications.Internal_memory} ref={internalMemory} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col style={{ padding: "0" }} md={12}>
                                                <div className="form-group">
                                                    <Row>
                                                        <Col md={3} style={{ lineHeight: "30px" }}>
                                                            <label htmlFor="CPU">CPU:</label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <input type="text" className="form-control" id="CPU" defaultValue={Product.Specifications.CPU} ref={cpu} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col style={{ padding: "0" }} md={12}>
                                                <div className="form-group">
                                                    <Row>
                                                        <Col md={3} style={{ lineHeight: "30px" }}>
                                                            <label htmlFor="Battery_capacity">Battery capacity:</label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <input type="text" className="form-control" id="Battery_capacity" defaultValue={Product.Specifications.Battery_capacity} ref={batteryCapacity} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col style={{ padding: "0" }} md={12}>
                                                <div className="form-group">
                                                    <Row>
                                                        <Col md={3} style={{ lineHeight: "30px" }}>
                                                            <label htmlFor="Operating_system">Operating system:</label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <input type="text" className="form-control" id="Operating_system" defaultValue={Product.Specifications.Operating_system} ref={operatingSystem} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col style={{ padding: "0" }} md={12}>
                                                <div className="form-group">
                                                    <Row>
                                                        <Col md={3} style={{ lineHeight: "30px" }}>
                                                            <label htmlFor="Origin">Origin:</label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <input type="text" className="form-control" id="Origin" defaultValue={Product.Specifications.Origin} ref={origin} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                            <Col style={{ padding: "0" }} md={12}>
                                                <div className="form-group">
                                                    <Row>
                                                        <Col md={3} style={{ lineHeight: "30px" }}>
                                                            <label htmlFor="Release_time">Release time:</label>
                                                        </Col>
                                                        <Col md={9}>
                                                            <input type="text" className="form-control" id="Release_time" defaultValue={Product.Specifications.Release_time} ref={releaseTime} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <h6>Colors:&nbsp; &nbsp;
                                        {
                                            Color.map((c) => {
                                                return (
                                                    <button className='btn btn-dark' style={{ marginRight: "10px" }} onClick={() => changeColor(c.id)}>{c.ColorName}</button>
                                                )
                                            })
                                        }
                                    </h6>
                                </Col>
                                <Col md={12}>
                                    <Row style={{ width: "100%" }}>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="color">Color Name:</label>
                                                <input type="text" className="form-control" id="colorName" defaultValue={currentColor.ColorName} ref={colorName} />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="quantity">Quantity:</label>
                                                <input type="number" className="form-control" id="colorQuantity" defaultValue={currentColor.Quantity} ref={quantity} />
                                            </div>
                                        </Col>
                                        <Col md={12} style={{ display: "flex" }}>
                                            {
                                                colorImage.map((i, index) => {
                                                    return (
                                                        <div style={{ position: "relative", height: "100px", width: "100px", marginRight: "20px" }} onMouseOver={() => displayClose(`close${index}`)} onMouseOut={() => unDisplayClose(`close${index}`)} className='colorContainer'>
                                                            <img src={i} className='colorimage' />
                                                            <button id={`close${index}`} style={{ position: "absolute", top: "-5px", right: "-5px", display: "none" }} onClick={() => deleteImage(index)}>
                                                                <FontAwesomeIcon icon={faXmark} /></button>
                                                        </div>
                                                    )

                                                })
                                            }
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="image">Image:</label>
                                                <input type="file" className="form-control" id="image" onChange={(e) => handleImages(e)} />
                                            </div>
                                            <button className='btn btn-success' onClick={() => updateColor(currentColor.id)}>Save Color</button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Button style={{ marginTop: "50px", height: "70px", width: "150px", fontSize: "30px", fontWeight: "600" }} onClick={() => handleProduct()}>Save</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default EditProduct;