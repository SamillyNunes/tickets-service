import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { collection, getDocs, orderBy, limit, startAfter, query } from "firebase/firestore";
import { format } from "date-fns";

import { db } from "../../services/firebaseConnection";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import './dashboard.css';
import Title from "../../components/Title";

export default function Dashboard(){
    
    const [calls, setCalls] = useState([]);
    const [isCallsListEmpty, setIsCallsListEmpty] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        async function loadCalls(){
            const listRef = collection(db, "calls");    
            const q = query(listRef, orderBy('created', 'desc'), limit(10));

            const querySnapshot = await getDocs(q);
            await updateState(querySnapshot);

            setLoading(false);
        }

        loadCalls();

        // a linha abaixo serve para referenciar quando desmontar o componente
        return () => { };
    }, []);

    async function updateState(querySnapshot){
        const isCollectionEmpty = querySnapshot.size === 0 ;

        if(!isCollectionEmpty){
            let lista = [];

            querySnapshot.forEach((doc)=> {
                lista.push({
                    id: doc.id,
                    topic: doc.data().topic,
                    customer: doc.data().customer,
                    customerId: doc.data().id,
                    created: doc.data().created,
                    createdFormatted: format(doc.data().created.toDate(), 'dd/MM/yyyy',),
                    status: doc.data().status,
                    complemet: doc.data().complement,
                    userId: doc.data().userId,
                });
            });

            setCalls(calls=> [...calls, ...lista]);
        } else {
            setIsCallsListEmpty(true);
        }
    }

    if(loading){
        return (
            <div>
                <Header />
                <div className="content" >
                    
                    <Title name="Chamados" >
                        <FiMessageSquare/>
                    </Title>

                    <div className="container dashboard">
                        <span>Buscando chamados...</span>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div>
            <Header />
            
            <div className="content" >
                <Title name="Chamados" >
                    <FiMessageSquare/>
                </Title>
                
                {/* Tag assim chama fragment */}
                <>

                    {calls.length===0 ? (
                        <div className="container dashboard" >
                            <span>Nenhum chamado encontrado...</span>
                            <Link to="/new-call" className="newCall" >
                                <FiPlus color="#FFF" size={25} />
                                Novo chamado
                            </Link>
                        </div>
                    ) : (
                        <>
                            
                            <Link to="/new-call" className="newCall" >
                                <FiPlus color="#FFF" size={25} />
                                Novo chamado
                            </Link>

                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col" >Cliente</th>
                                        <th scope="col" >Assunto</th>
                                        <th scope="col" >Status</th>
                                        <th scope="col" >Cadastrado em</th>
                                        <th scope="col" >#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {calls.map((item, index)=>{
                                        return (
                                            <tr key={index}>
                                                <td data-label="Cliente" >{item.customer}</td>
                                                <td data-label="Assunto" >{item.topic}</td>
                                                <td data-label="Status" >
                                                    <span className="badge" style={{backgroundColor: '#999'}} >{item.status}</span>
                                                </td>
                                                <td data-label="Cadastrado" > {item.createdFormatted} </td>
                                                <td data-label="#" >
                                                    <button className="action"  style={{ backgroundColor: '#3583f6' }} >
                                                        <FiSearch color="#FFF" size={17} />
                                                    </button>
                                                    <button className="action" style={{ backgroundColor: '#f6a935' }}>
                                                        <FiEdit2 color="#FFF" size={17} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}

                                </tbody>
                            </table>
                        </>
                    )}

                    
                </>
            </div>
        </div>
    );
}