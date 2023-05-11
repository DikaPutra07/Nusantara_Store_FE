import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../../features/productsSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Shop = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);

    const [product, setProduct] = useState({});
    const [error] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`https://nusantarastorebe-production.up.railway.app/api/products/shop/${auth.shop}`);
            setProduct(request.data);
            setIsLoading(false);
        }
        fetchData()
    }, []);

    const handleDeleteProduct = (id) => {
        dispatch(deleteProduct(id));
        try {
            toast.error("Product deleted successfully", {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 2000,
                pauseOnHover: false,
            });
        }
        catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const rows = product && product.data?.map(item => {
        return {
            id: item.id,
            name: item.name,
            createdAt: item.createdAt,
            price: item.price.toLocaleString(),
            description: item.description,
        }
    })


    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 50,
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 100,
        },

        {
            field: 'name',
            headerName: 'Nama Product',
            width: 130
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 220,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 105,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 218,
            renderCell: (params) => {
                return (
                    <div className="product-list-actions">
                        <button className="view" onClick={ () => navigate(`../../products/${params.row.id}`)}>
                            View
                        </button>
                        <button className="edit" onClick={() => navigate(`../../products/edit/${params.row.id}`)}>
                            Edit
                        </button>
                        <button className="delete" onClick={() => handleDeleteProduct(params.row.id)}>
                            Delete
                        </button>
                    </div>
                )
            },
        },
    ];

    if (!product || isLoading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return ( 
        <div className="profile">
            <div className="splitter">
                <Sidebar />
                <div className="container-profile">

                    {/* CONTENT HERE */}
                    <div className="header-shop">
                        <h1>Your Product</h1>
                        <button onClick={() => navigate("/profile/create-product")}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                fill="currentColor"
                                className="bi bi-plus"
                                viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                            <span>Create Product</span>
                        </button>
                    </div>

                    <div className="table-product">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            // checkboxSelection
                            isRowSelectable={ ()=> false}
                        />
                    </div>

                </div>
            </div>
        </div>
     );
}
 
export default Shop;