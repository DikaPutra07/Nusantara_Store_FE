import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateProduct } from "../../features/productsSlice";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CreateProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const [product, setProduct] = useState({
        id: null,
        name: "",
        category_id: null,
        shop: auth.shop,
        price: null,
        description: "",
    });
    const [productImg, setProductImg] = useState("");

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();
    const API_URL = `https://nusantarastorebe-production.up.railway.app/api/products/${location.pathname.split("/")[3]}`;

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(API_URL);
            setProduct({
                ...product,
                id: request.data.data.id,
                name: request.data.data.name,
                price: request.data.data.price,
                description: request.data.data.description,
            });
            setProductImg(request.data.data.image);
            return request;
        }
        fetchData()
            .then(() => setIsLoading(false))
            .catch((err) => console.log(err));
    }, []);

    const handleProductImageUpload = (e) => {
        const file = e.target.files[0];

        TransformFile(file);
    }

    const TransformFile = (file) => {
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setProductImg(reader.result);
            }
        }
        else {
            setProductImg("");
        }

    };

    console.log(product.id);
    console.log(productImg);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            id: product.id,
            name : product.name,
            category_id : product.category_id,
            shop: product.shop,
            price: product.price,
            description: product.description,
            image: productImg,
        }));
        // navigate("../");
    }

    return ( 
            <div className="create-product">
                <div className="info">
                    <h2>Edit Product</h2>
                    <div className="new-product-container">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group-create-product">
                                <label htmlFor="name">Product Name</label>
                                <input type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder={product.name}
                                    maxLength="25"
                                    onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                            </div>
                            <div className="form-group-create-product">
                                <label htmlFor="category">Product Category</label>
                                <select className="form-control"
                                    id="category"
                                    onChange={(e) => setProduct({ ...product, category_id: e.target.value })}>
                                    <option selected disabled>Select Category</option>
                                    <option value="1">Shirt</option>
                                    <option value="2">Pants</option>
                                    <option value="3">Shoes</option>
                                    <option value="4">Bags</option>
                                    <option value="5">Decoration</option>
                                    <option value="6">Tools</option>
                                </select>
                            </div>
                            <div className="form-group-create-product">
                                <label htmlFor="price">Product Price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="price"
                                    placeholder={product.price}
                                    onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                            </div>
                            <div className="form-group-create-product">
                                <label htmlFor="description">Product Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    rows="3"
                                    placeholder={product.description}
                                    onChange={(e) => setProduct({ ...product, description: e.target.value })}>
                                </textarea>
                            </div>
                            <div className="form-group-create-product-image">
                                <label htmlFor="image">Product Image</label>
                                <input type="file"
                                    className="form-control"
                                    id="image"
                                    accept="image/"
                                    onChange={handleProductImageUpload} />
                            </div>
                        <img src={productImg} alt="product" />
                            <button type="submit" className="btn btn-primary" onClick={() =>
                                toast.success("Product Created Successfully",
                                    {
                                        position: toast.POSITION.TOP_CENTER,
                                        autoClose: 1000,
                                    })
                                }>
                                Update Product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
     );
}

export default CreateProduct;