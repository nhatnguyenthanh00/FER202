import { Col, Container, Row, Button } from 'react-bootstrap'
import SideBar from './SideBar'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const CreateProduct = () => {
    const navigate = useNavigate();
    const { ProductID } = useParams();
    const [Product, setProduct] = useState();
    const [Category, setCategory] = useState([]);
    const [img, setImg] = useState("");
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
    const [confirmColor, setConfirmColor] = useState([]);
    const [colorImage, setColorImage] = useState([]);
    const colorName = useRef();
    const colorQuantity = useRef();
    const [productId, setProductId] = useState(0);
    useEffect(() => {
        fetch("http://localhost:9999/Product")
            .then((res) => res.json())
            .then((result) => {
                setProductId(result.length + 1);
            });
    }, [])
    useEffect(() => {
        fetch("http://localhost:9999/Product")
            .then((res) => res.json())
            .then((result) => {
                result.map((r) => {
                    if (r.id == ProductID) {
                        setProduct(r);
                    }
                })
            });
    }, [])
    useEffect(() => {
        fetch("http://localhost:9999/Category")
            .then((res) => res.json())
            .then((result) => {
                setCategory(result);
            });
    }, [])

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
    const handleCreate = async () => {
        if (name.current.value == "" || category.current.value == "" || price.current.value == "" || saleprice.current.value == ""
            && image.current.value == "" || screen.current.value == "") {
            alert("Nhập đầy đủ thông tin")
        }
        else {
            try {


                const link = image.current.value;
                const links = link.split("\\");
                const nameproduct = name.current.value.trim().split(" ");
                const linkname = nameproduct.join("_");
                // console.log(links)
                // setImg(`Images/Product/${linkname}/${links.pop()}`)
                const newproduct = {
                    Name: name.current.value,
                    Category_ID: category.current.value,
                    Price: price.current.value,
                    SalePrice: saleprice.current.value,
                    Images: `../../Images/Product/${linkname}/${links.pop()}`,
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

                const response = await fetch("http://localhost:9999/Product", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newproduct),
                });
                if (!response.ok) {
                    throw new Error("Failed to create order detail.");
                }

                for (const color of confirmColor) {
                    const newColor = {
                        ProductId: productId,
                        ColorName: color.ColorName,
                        Images: color.Images,
                        Quantity: color.Quantity
                    };

                    const orderResponse = await fetch("http://localhost:9999/Color", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newColor),
                    });
                    if (!orderResponse.ok) {
                        throw new Error("Failed to create order.");
                    }
                }

            } catch (error) {
                console.error(error);
                // Handle the error, show an error message, or perform any necessary actions
            }
            navigate("/productmanagement");
        }
    }
    const updateImage = (e) => {
        const link = e.target.value;
        const links = link.split("\\");
        const nameproduct = name.current.value.trim().split(" ");
        const linkname = nameproduct.join("_");
        // console.log(links)
        setImg(`../../Images/Product/${linkname}/${links.pop()}`)
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
    const deleteImage = (index) => {
        const newImage = colorImage;
        const result = newImage.filter((i, iindex) => {
            return index != iindex;
        })
        setColorImage([...result])
    }
    const addMoreColor = () => {
        let colorChilds = {
            ColorName: colorName.current.value,
            Images: colorImage,
            Quantity: colorQuantity.current.value
        }
        const newColor = [...confirmColor, colorChilds];
        setConfirmColor([...newColor]);
        setColorImage([]);
        document.getElementById("colorName").value = "";
        document.getElementById("colorQuantity").value = "";

    }
    return (
        <div>
            {/* {
                console.log(color)
            } */}
            <Container fluid>
                <Row>
                    <SideBar />
                    <Col md={10} style={{ padding: "0" }}>
                        <div className="topbar">
                            <h1 className="admin-title">Create Product</h1>
                        </div>
                        <div className='admin-content'>
                            <Row>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="category">Category:</label>
                                        <select className="form-control" id="category" ref={category}>
                                            {
                                                Category.map((c) => {
                                                    return (
                                                        <option value={c.id}>{c.Category_Name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name:</label>
                                        <input type="text" className="form-control" id="name" ref={name} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="price">Price:</label>
                                        <input type="number" className="form-control" id="price" ref={price} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="form-group">
                                        <label htmlFor="saleprice">SalePrice:</label>
                                        <input type="number" className="form-control" id="saleprice" ref={saleprice} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <img src={img} style={{ width: "100%" }} />
                                    <div className="form-group">
                                        <label htmlFor="image">Image:</label>
                                        <input type="hidden" ref={beginImage} />
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
                                                            <input type="text" className="form-control" id="screen" ref={screen} />
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
                                                            <input type="text" className="form-control" id="Rear_camera" ref={rearCamera} />
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
                                                            <input type="text" className="form-control" id="RAM" ref={ram} />
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
                                                            <input type="text" className="form-control" id="Internal_memory" ref={internalMemory} />
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
                                                            <input type="text" className="form-control" id="CPU" ref={cpu} />
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
                                                            <input type="text" className="form-control" id="Battery_capacity" ref={batteryCapacity} />
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
                                                            <input type="text" className="form-control" id="Operating_system" ref={operatingSystem} />
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
                                                            <input type="text" className="form-control" id="Origin" ref={origin} />
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
                                                            <input type="text" className="form-control" id="Release_time" ref={releaseTime} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                            <Row style={{ border: "1px solid black" }}>
                                <Col md={6}>
                                    <h3 style={{ color: "red" }}>Add Color</h3>
                                </Col>
                                <Col md={12} >
                                    {
                                        confirmColor.map((cc) => {
                                            return (
                                                <div>
                                                    <p>{`Color: ${cc.ColorName}`}</p>
                                                    <p>{`Quantity: ${cc.Quantity}`}</p>
                                                    <div style={{ display: "flex" }}>
                                                        {
                                                            cc.Images.map((i) => {
                                                                return (
                                                                    <div style={{ position: "relative", height: "100px", width: "100px", marginRight: "20px" }} className='colorContainer'>
                                                                        <img src={i} className='colorimage' />
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <hr></hr>
                                                </div>
                                            )
                                        })
                                    }
                                </Col>
                                <Col md={12}>
                                    <Row style={{ width: "100%" }}>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="color">Color:</label>
                                                <input type="text" className="form-control" id="colorName" ref={colorName} />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="form-group">
                                                <label htmlFor="quantity">Quantity:</label>
                                                <input type="number" className="form-control" id="colorQuantity" ref={colorQuantity} />
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
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                </Col>
                                <Col md={6} style={{ marginTop: "10px", marginBottom: "10px" }}>
                                    <button className='btn btn-primary' name='add' onClick={() => addMoreColor()}>Save</button>
                                </Col>
                            </Row>
                            <Button style={{ marginTop: "10px" }} onClick={() => handleCreate()}>Create</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default CreateProduct;