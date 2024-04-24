import { FiX } from 'react-icons/fi';
import './modal.css';

export default function Modal({ content, close }){
    return (
        <div className='modal' >
            <div className='container' >
                <button className='close' onClick={close} >
                    <FiX size={25} color='#FFF' />
                    Fechar
                </button>

                <main>
                    <h2>Detalhes do chamado</h2>

                    <div className='row' >
                        <span>Cliente: <i>{content.customer}</i> </span>
                    </div>

                    <div className='row' >
                        <span>Assunto: <i> {content.topic} </i> </span>
                        <span>Cadastrado em: <i> {content.createdFormatted} </i> </span>
                    </div>

                    <div className='row' >
                        <span>
                            Status: 
                            <i className='status-badge' style={{ color: '#FFF', backgroundColor: content.status==='Aberto' ? '#5cb85c' : '#999' }} >
                                {content.status}
                            </i> 
                        </span>
                    </div>

                    {content.complemet !=='' && (
                        <>
                            <h3>Complemento</h3>
                            <p>
                                {content.complemet}
                            </p>
                        </>
                    )}

                    
                </main>

            </div>
        </div>
    );
}