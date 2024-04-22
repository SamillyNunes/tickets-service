import { FiUser } from 'react-icons/fi';

import Header from '../../components/Header';
import Title from '../../components/Title';
import './customers.css'
import { useState } from 'react';

export default function Customers(){

    const [companyName, setCompanyName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [address, setAddress] = useState('');

    function handleRegister(e){
        e.preventDefault();

        alert('Teste');
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
                            onChange={(e)=> setCompanyName(e.target.value)} 
                        />

                        <label>CNPJ</label>
                        <input 
                            type='text' 
                            placeholder='Digite o CNPJ' 
                            onChange={(e)=> setCnpj(e.target.value)} 
                        />
                        
                        <label>Endereço</label>
                        <input 
                            type='text' 
                            placeholder='Endereço da Empresa' 
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