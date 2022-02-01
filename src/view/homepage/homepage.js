import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../../App.css';
import axiosFetch from '../../base_url';

function Homepage() {
    let params = useParams();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [sku, setSku] = useState('')
    const [stock, setStock] = useState('')
    const [category, setCategory] = useState(0)
    const [price, setPrice] = useState('')
    const [imageLink, setImageLink] = useState('')
    const [imageData, setImageData] = useState('')
    const categories = ['Wash and Fold', 'Dry Clean', 'Home', 'Others']

    const [product, setProduct] = useState([{}])

    const fetchData = async () => {
        try {
            const response = await axiosFetch.get("/product")
            const json = response.data
            console.log(json)
            if (json.success) {
                setProduct(json.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const [catHover, setCatHover] = useState(-1)
    const handleFileRead = async (event) => {
        const file = event.target.files[0]
        const url = URL.createObjectURL(file)
        var base64 = await convertBase64(file)
        base64 = base64.replace(/^data:image\/[a-z]+;base64,/, "")
        setImageData(base64)
        setImageLink(url)
        console.log(base64)
    }
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
    const addProduct = async () => {
        try {
            const response = await axiosFetch.post("/product/insert", {
                name: name,
                description: description,
                sku: sku,
                stock: stock,
                category: categories[category],
                price: price,
                base64_image: imageData
            })
            const json = response.data
            console.log(json)
            if (json.success) {
          
            }
        } catch (error) {
            console.log(error)

        }
    }
    return (
        <div className="main">
            {/*
            <nav>
                <Link to="/hello"><input type={"button"} value={"asdsad"}></input></Link>
            </nav>
            */}
            <div className="navbars">
                <div style={{ paddingRight: 20 }}>
                    John Doe
                </div>
            </div>
            <div className="sidebars">
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ width: 29, height: 29, backgroundColor: "#0099EE", borderRadius: 100, borderStyle: "solid", borderWidth: 3, borderColor: "white" }}>
                        </div>
                        <div style={{ width: 10, height: 10, backgroundColor: "#F36868", borderRadius: 100, marginLeft: 5, borderStyle: "solid", borderWidth: 3, borderColor: "white" }}>
                        </div>
                    </div>
                    <p style={{ color: "white", fontSize: 18, marginLeft: 12, fontFamily: "Roboto-Bold" }}>BeLaundry</p>
                </div>
                <div style={{ marginTop: 40 }}>
                    <p style={{ color: "white", fontFamily: "Roboto-Bold" }}>Menu</p>
                </div>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <button className="button sidebar-button-none">
                        <img src={require('../../assets/images/home.png')} style={{ width: 25, height: 25, objectFit: "contain" }}></img>
                        <div style={{ marginLeft: 10 }}>Home</div>
                    </button>
                </Link>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <button className="button sidebar-button" style={{ marginTop: 15 }}>
                        <img src={require('../../assets/images/file.png')} style={{ width: 25, height: 30, objectFit: "contain" }}></img>
                        <div style={{ marginLeft: 10 }}>Products</div>
                    </button>
                </Link>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <button className="button sidebar-button-none" style={{ marginTop: 15 }}>
                        <img src={require('../../assets/images/chart.png')} style={{ width: 25, height: 25, objectFit: "contain" }}></img>
                        <div style={{ marginLeft: 10 }}>Sales</div>
                    </button>
                </Link>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <button className="button sidebar-button-none" style={{ marginTop: 15 }}>
                        <img src={require('../../assets/images/setting.png')} style={{ width: 25, height: 25, objectFit: "contain" }}></img>
                        <div style={{ marginLeft: 10 }}>Settings</div>
                    </button>
                </Link>
            </div>
            <div className="content">
                <div className="content-main">
                    <div className="subtitle">Add New Product</div>
                    <div className="inputtitle" style={{ marginTop: 15 }}>Product Name</div>
                    <input className="inputtext" onChange={(e) => { setName(e.target.value) }} value={name} style={{ marginTop: 5 }} ></input>
                    <div className="inputtitle" style={{ marginTop: 15 }}>Description</div>
                    <input className="inputtext" onChange={(e) => { setDescription(e.target.value) }} value={description} style={{ marginTop: 5 }} ></input>
                    <div className="inputtitle" style={{ marginTop: 15 }}>SKU</div>
                    <input className="inputtext" onChange={(e) => { setSku(e.target.value) }} value={sku} style={{ marginTop: 5 }} ></input>
                    <div className="inputtitle" style={{ marginTop: 15 }}>Stock</div>
                    <input type={"number"} className="inputtext" onChange={(e) => { setStock(e.target.value) }} value={stock} style={{ marginTop: 5 }} ></input>
                    <div className="inputtitle" style={{ marginTop: 15 }}>Category</div>
                    <div className="categories">{categories.map((item, i) => (
                        <div key={i} style={{ padding: 5 }}>
                            <button onClick={() => { setCategory(i) }}
                                onMouseEnter={() => { setCatHover(i) }}
                                onMouseLeave={() => { setCatHover(-1) }}
                                style={{ backgroundColor: i == category || i == catHover ? "#3B97CB" : "#CAECFF", padding: 8, borderRadius: 5, border: "none" }}>
                                <div style={{ fontSize: 14, color: i == category || i == catHover ? "white" : "#0099EE" }}>{item}</div>
                            </button>
                        </div>
                    ))} </div>
                    <div className="inputtitle" style={{ marginTop: 15 }}>Price</div>
                    <input type={"number"} className="inputtext" onChange={(e) => { setPrice(e.target.value) }} value={price} style={{ marginTop: 5 }} ></input>
                        <button className="button publish-button" onClick={addProduct} style={{marginTop:15}}>Publish</button>
                </div>
                <div className="content-image">
                    <img src={imageLink} width={100} height={100}></img>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => { handleFileRead(e) }}
                        size="small"
                        variant="standard"
                    />
                </div>
            </div>
        </div>
    );
}

export default Homepage