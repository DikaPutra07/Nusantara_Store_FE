import { useSelector } from "react-redux";
import Sidebar from './Sidebar';

const Profile = () => {

    const auth = useSelector((state) => state.auth);

    return ( 
        <div className="profile">
            <div className="splitter">
                <Sidebar />
                <div className="container-profile">
                    <div className="header-shop">
                        <h1>Welcome, {auth.name}</h1>
                    </div>
                    <div className="personal-info">
                        <h3>Personal Info</h3>
                        <div className="info">
                            <div className="info-left">
                                <div className="info-item">
                                    <span className="info-label">Name : </span>
                                    <span className="info-value">{auth.name}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Email : </span>
                                    <span className="info-value">{auth.email}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Store : </span>
                                    <span className="info-value">{auth.shop}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Profile;