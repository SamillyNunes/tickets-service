import { FiSettings, FiUpload } from 'react-icons/fi';
import { useContext, useState } from 'react';

import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import Title from '../../components/Title';
import './profile.css';
import avatarImg from '../../assets/avatar.png'

export default function Profile(){

    const { user } = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

    return (
        <div>
            <Header/>

            <div className='content'>
                <Title name="Minha conta" >
                    <FiSettings size={25} />
                </Title>

                <div className='container' >

                    <form className='form-profile' >

                        <label className='label-avatar' >
                            <span>
                                <FiUpload size={25} color='#FFF' />
                            </span>

                            <input type='file' accept='image/*' /> <br/>
                            
                            <img src={avatarUrl===null ? avatarImg : avatarUrl} alt='Foto de perfil' width={200} height={200} />


                        </label>

                        <label>Nome</label>
                        <input type='text' placeholder='Seu nome' />

                        <label>Email</label>
                        <input type='email' placeholder='test@test.com' disabled={true} />
                        
                        <button type='submit' >Salvar</button>
                    </form>

                </div>

                <div className='container'>
                    <button className='logout-btn' >Sair</button>
                </div>

            </div>
        </div>
    );
}