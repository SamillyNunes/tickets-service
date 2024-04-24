import { useState, useEffect, useContext } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { collection, getDocs, getDoc, document, doc, addDoc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';
import { db } from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';

import './newcall.css';
import { toast } from 'react-toastify';

export default function NewCall(){
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [loadingCustomers, setLoadingCustomers] = useState(true);
    const [customerSelected, setCustomerSelected] = useState(0);

    const [complement, setComplement] = useState('');
    const [topic, setTopic] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [isEditting, setIsEditting] = useState(false);

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

                if(id){
                    loadId(lista);
                }
            })
            .catch(error => {
                toast.error('Erro ao buscar os clientes!');
                setLoadingCustomers(false);
                setCustomers([]);
            });
        }

        loadCustomers();
    },[id]);

    async function loadId(customersList){
        const docRef = doc(db, "calls", id);
        await getDoc(docRef)
        .then((snapshot)=>{
            setTopic(snapshot.data().topic);
            setStatus(snapshot.data().status);
            setComplement(snapshot.data().complement);

            let index = customersList.findIndex(item => item.id===snapshot.data().id);
            
            setCustomerSelected(index);
            setIsEditting(true);
        })
        .catch(error => {
            console.log(error);
            setIsEditting(false);
        });
    }

    function handleStatusOptionChanged(e){
        setStatus(e.target.value);
    }

    function handleSelectChanged(e){
        setTopic(e.target.value);
    }

    function handleChangedCustomer(e){
        setCustomerSelected(e.target.value);
    }

    async function handleEdit(){
        const docRef = doc(db, "calls", id);
        await updateDoc(docRef, {
            customer: customers[customerSelected].companyName,
            id: customers[customerSelected].id,
            topic: topic,
            complement: complement,
            status: status,
            userId: user.uid,
        })
        .then(()=>{
            toast.success('Chamado atualizado com sucesso!');
            setCustomerSelected('');
            setComplement('');
            setTopic('');
            navigate('/dashboard');
        })
        .catch(error => {
            toast.error('Ops, erro ao atualizar esse chamado');
        });
    }

    async function handleRegister(e){
        e.preventDefault();

        if(isEditting){
            await handleEdit();
            return;
        }

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
                <Title name={ id ? 'Editando chamado' : "Novo chamado" } >
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