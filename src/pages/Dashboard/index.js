import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";

import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import './dashboard.css';
import Title from "../../components/Title";

export default function Dashboard(){

    const { logout } = useContext(AuthContext);
    
    const [calls, setCalls] = useState([]);
    const [loading, setLoading] = useState(true);

    async function handleLogout(){
        await logout();
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
                                    <tr>
                                        <td data-label="Cliente" >Mercado Esquina</td>
                                        <td data-label="Assunto" >Suporte</td>
                                        <td data-label="Status" >
                                            <span className="badge" style={{backgroundColor: '#999'}} >Em Aberto</span>
                                        </td>
                                        <td data-label="Cadastrado" >12/05/2023</td>
                                        <td data-label="#" >
                                            <button className="action"  style={{ backgroundColor: '#3583f6' }} >
                                                <FiSearch color="#FFF" size={17} />
                                            </button>
                                            <button className="action" style={{ backgroundColor: '#f6a935' }}>
                                                <FiEdit2 color="#FFF" size={17} />
                                            </button>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </>
                    )}

                    
                </>
            </div>
        </div>
    );
}