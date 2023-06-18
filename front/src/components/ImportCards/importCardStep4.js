import { Link } from 'react-router-dom';

import { FiUser, FiLogOut, FiHome } from 'react-icons/fi';

import "./style.css";

const ImportCardStep4 = ({ onNext, onPrev, onFinish }) => {

    return (
        <div className="dialog">
            <div className="dialog-input">
            <h1>ИМПОРТ</h1>
                <div className="dialog-hor-container">
                    <Link to="/profile" className="dialog-button">
                        <FiUser />
                    </Link>
                    <Link to="/auth" className="dialog-button">
                        <FiLogOut />
                    </Link>
                    <Link to="/" className="dialog-button">
                        <FiHome />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ImportCardStep4;