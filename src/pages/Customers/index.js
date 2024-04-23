import { FiUser } from 'react-icons/fi';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';

import Header from '../../components/Header';
import Title from '../../components/Title';
import './customers.css'
import { useState } from 'react';
import { db } from '../../services/firebaseConnection';

export default function Customers(){

    const [companyName, setCompanyName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [address, setAddress] = useState('');

    async function handleRegister(e){
        e.preventDefault();

        if(companyName!=='' && cnpj!=='' && address!==''){
            const docRef = collection(db, "customers");
            await addDoc(docRef, {
                companyName: companyName,
                cnpj: cnpj,
                address: address
            }).then(()=>{
                setCompanyName('');
                setCnpj('');
                setAddress('');
                toast.success('Cadastrado com sucesso!');
            }).catch(error => {
                toast.error('Erro ao fazer cadastro.');
            });
        } else {
            toast.warning('Preencha todos os campos!');
        }
    }

    return (
        <div>
            <Header />

            <div className='content'>
                <Title name="Clientes" >
                    <FiUser size={25} />
                </Title>

                <div className='container' >

                    <form className='form-profile' onSubmit={handleRegister} >
                        <label>Nome fantasia</label>
                        <input 
                            type='text' 
                            placeholder='Nome da empresa' 
                            value={companyName}
                            onChange={(e)=> setCompanyName(e.target.value)} 
                        />

                        <label>CNPJ</label>
                        <input 
                            type='text' 
                            placeholder='Digite o CNPJ' 
                            value={cnpj}
                            onChange={(e)=> setCnpj(e.target.value)} 
                        />
                        
                        <label>Endereço</label>
                        <input 
                            type='text' 
                            placeholder='Endereço da Empresa' 
                            value={address}
                            onChange={(e)=> setAddress(e.target.value)} 
                        />

                        <button type='submit' >
                            Cadastrar
                        </button>

                    </form>

                </div>

            </div>
        </div>
    );
}