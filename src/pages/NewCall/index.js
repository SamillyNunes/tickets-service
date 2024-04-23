import { FiPlusCircle } from 'react-icons/fi';

import Header from '../../components/Header';
import Title from '../../components/Title';

import './newcall.css';
import { useState } from 'react';

export default function NewCall(){

    const [customers, setCustomers] = useState([]);

    const [complement, setComplement] = useState('');
    const [topic, setTopic] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');

    function handleStatusOptionChanged(e){
        setStatus(e.target.value);
    }

    function handleSelectChanged(e){
        setTopic(e.target.value);
    }

    return (
        <div>
            <Header/>

            <div className='content' >
                <Title name="Novo chamado" >
                    <FiPlusCircle size={25} />
                </Title>

                <div className='container' >
                    
                    <form className='form-profile' >

                        <label>Clientes</label>
                        <select>
                            <option key={1} value={1} >Mercado teste</option>
                            <option key={2} value={2} >Loja canarinhos</option>
                        </select>

                        <label>Assunto</label>
                        <select value={topic} onChange={handleSelectChanged} >
                            <option value="Suporte" >Suporte</option>
                            <option value="Visita" >Visita Técnica</option>
                            <option value="Financeiro" >Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className='status'>
                            <input
                                type='radio'
                                name='radio'
                                value='Aberto'
                                onChange={handleStatusOptionChanged}
                                checked={status==='Aberto'}
                            />
                            <span>Em aberto</span>

                            <input
                                type='radio'
                                name='radio'
                                value='Progresso'
                                onChange={handleStatusOptionChanged}
                                checked={status==='Progresso'}
                            />
                            <span>Progresso</span>

                            <input
                                type='radio'
                                name='radio'
                                value='Finalizado'
                                onChange={handleStatusOptionChanged}
                                checked={status==='Finalizado'}
                            />
                            <span>Finalizado</span>
                        </div>

                        <label>Complemento</label>
                        <textarea 
                            type='text'
                            placeholder='Descreva seu problema (opcional).'
                            value={complement}
                            onChange={(e)=>setComplement(e.target.value)}
                        />

                        <button type='submit' >Registrar</button>

                    </form>

                </div>  

            </div>
        </div>
    );
}