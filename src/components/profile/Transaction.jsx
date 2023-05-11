import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const Transaction = () => {
    
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);

    const [order, setOrder] = useState({});
    const [status, setStatus] = useState({});
    const [error] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`https://nusantarastorebe-production.up.railway.app/api/orders/user/${auth.id}`);
            const status = await axios.get(`https://nusantarastorebe-production.up.railway.app/api/order-statuses`);
            setOrder(response.data);
            setStatus(status.data);
            setIsLoading(false);
        }
        fetchData();
    }, [auth.id]);

    const rows = order && order.data?.map(transaction => {
      return {
        id: transaction.id,
        createdAt: transaction.createdAt,
        total_item: transaction.total_item,
        total_price: transaction.total_price,
        status: status.data?.find(status => status.id === transaction.status_id)?.name,
        address: transaction.Address,
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
            headerName: 'Date',
            width: 150,
        },

        {
            field: 'total_item',
            headerName: 'Total Item',
            width: 110
        },
        {
            field: 'total_price',
            headerName: 'Total Price',
            width: 130,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 105,
        },
        {
            field: 'address',
            headerName: 'Address',
            sortable: false,
            width: 240,
        },
    ];

    if (!order || isLoading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return ( 
        <div className="profile">
            <div className="splitter">
                <Sidebar />
                <div className="container-profile">

                    {/* CONTENT HERE */}
                    <div className="header-shop">
                        <h1>Transaction History</h1>
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
 
export default Transaction;