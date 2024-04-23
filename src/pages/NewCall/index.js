import { useState, useEffect, useContext } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { collection, getDocs, getDoc, document, addDoc } from 'firebase/firestore';

import { AuthContext } from '../../contexts/auth';
import { db } from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';

import './newcall.css';
import { toast } from 'react-toastify';

export default function NewCall(){
    const { user } = useContext(AuthContext);

    const [customers, setCustomers] = useState([]);
    const [loadingCustomers, setLoadingCustomers] = useState(true);
    const [customerSelected, setCustomerSelected] = useState(0);

    const [complement, setComplement] = useState('');
    const [topic, setTopic] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');

    useEffect(()=>{
        async function loadCustomers(){
            const listRef = collection(db, "customers");
            const querySnapshot = await getDocs(listRef)
            .then((snapshot)=>{
                let lista = [];

                snapshot.forEach((d)=> {
                    lista.push({
                        id: d.id,
                        companyName: d.data().companyName,
                    });
                });

                if(snapshot.docs.size===0){
                    toast.warning('Nenhuma empresa encontrada');
                    
                    setLoadingCustomers(false);
                    setCustomers([]);
                    return;
                }

                setCustomers(lista);
                setLoadingCustomers(false);
            })
            .catch(error => {
                toast.error('Erro ao buscar os clientes!');
                setLoadingCustomers(false);
                setCustomers([]);
            });
        }

        loadCustomers();
    },[]);

    function handleStatusOptionChanged(e){
        setStatus(e.target.value);
    }

    function handleSelectChanged(e){
        setTopic(e.target.value);
    }

    function handleChangedCustomer(e){
        setCustomerSelected(e.target.value);
    }

    async function handleRegister(e){
        e.preventDefault();

        //Registrar chamado
        const docRef = collection(db, "calls");
        await addDoc(docRef, {
            created: new Date(),
            customer: customers[customerSelected].companyName,
            id: customers[customerSelected].id,
            topic: topic,
            complement: complement,
            status: status,
            userId: user.uid,
        })
        .then(()=>{
            toast.success('Chamado registrado com sucesso!');
            setComplement('');
            setCustomerSelected(0);
        })
        .catch(error => {
            toast.error('Ops! Erro ao registrar. Tente mais tarde.');
        });
    }

    return (
        <div>
            <Header/>

            <div className='content' >
                <Title name="Novo chamado" >
                    <FiPlusCircle size={25} />
                </Title>

                <div className='container' >
                    
                    <form className='form-profile' onSubmit={handleRegister} >

                        <label>Clientes</label>
                        {
                            loadingCustomers ? (
                                <input type='text' disabled={true} value='Carregando...' /> 
                            ) : (
                                <select value={customerSelected} onChange={handleChangedCustomer}>
                                    {customers.map((item, index)=>{
                                        return (
                                            <option key={index} value={index} > {item.companyName} </option>
                                        );
                                    })}
                                </select>
                            )
                        }

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