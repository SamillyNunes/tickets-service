import { FiSettings, FiUpload } from 'react-icons/fi';
import { useContext, useState } from 'react';

import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import Title from '../../components/Title';
import './profile.css';
import avatarImg from '../../assets/avatar.png'
import { toast } from 'react-toastify';

export default function Profile(){

    const { user, storeUser, setUser, logout } = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);

    const [fileAvatar, setFileAvatar] = useState(null);

    function handleFile(e){
        const image = e.target.files[0];
        if(image){
            if(image.type==='image/jpeg' || image.type==='image/png'){
                setFileAvatar(image);
                setAvatarUrl(URL.createObjectURL(image));
            } else {
                toast.warning('Envie uma imagem PNG ou JPEG');
                setFileAvatar(null);
                return;
            }
        }
    }

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

                            <input type='file' accept='image/*' onChange={handleFile} /> <br/>
                            
                            <img src={avatarUrl===null ? avatarImg : avatarUrl} alt='Foto de perfil' width={200} height={200} />


                        </label>

                        <label>Nome</label>
                        <input type='text' value={name} onChange={(e)=>setName(e.target.value)} />

                        <label>Email</label>
                        <input type='email' value={email} disabled={true} />
                        
                        <button type='submit' >Salvar</button>
                    </form>

                </div>

                <div className='container'>
                    <button className='logout-btn' onClick={()=> logout()} >Sair</button>
                </div>

            </div>
        </div>
    );
}