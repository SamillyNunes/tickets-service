import { FiSettings, FiUpload } from 'react-icons/fi';
import { useContext, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { AuthContext } from '../../contexts/auth';
import { db, storageDb } from '../../services/firebaseConnection';
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

    async function handleUpload(){
        const currentUid = user.uid;
        
        // fileAvatar.name eh o nome que tem na foto nos arquivos
        const uploadref = ref(storageDb, `images/${currentUid}`);

        uploadBytes(uploadref, fileAvatar).then((snapshot)=>{

            getDownloadURL(snapshot.ref).then(async (downloadURL)=>{

                const docRef = doc(db, "users", currentUid);
                await updateDoc(docRef, {
                    avatarUrl: downloadURL,
                    name: name,
                }).then(()=>{
                    let data = {
                        ...user,
                        name: name,
                        avatarUrl: downloadURL,    
                    }
                    setUser(data);
                    storeUser(data);
                    toast.success('Informações atualizadas com sucesso!');
                });
            })
        });
    }

    async function handleSaving(e){
        e.preventDefault();
        
        // Quer dizer que n enviou nenhuma foto
        if(fileAvatar===null && name!==''){
            //Atualizar apenas o nome do user
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef,{
                name: name
            }).then(()=>{
                let data = {
                    ...user,
                    name: name,
                }
                setUser(data);
                storeUser(data);
                toast.success('Informações atualizadas com sucesso!');
            });
        } else if(name!=='' && fileAvatar!==null){
            // Atualizar nome e foto
            handleUpload();
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

                    <form className='form-profile' onSubmit={handleSaving} >

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