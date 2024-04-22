import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi';

import './header.css';
import { AuthContext } from '../../contexts/auth';
import avatarImg from '../../assets/avatar.png';

export default function Header(){
    const { user } = useContext(AuthContext);

    return (
        <div className='sidebar' >
            <div>
                <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt='Foto do usuario' />
            </div>

            <Link to={"/dashboard"} >
                <FiHome color='#FFF' size={24} />
                Chamados
            </Link>
            <Link to={"/customers"} >
                <FiUser color='#FFF' size={24} />
                Clientes
            </Link>
            <Link to={"/profile"} >
                <FiSettings color='#FFF' size={24} />
                Perfil
            </Link>
        </div>
    );
}