import React,{useState} from 'react';
import logoImg from '../../assents/logo.svg';
import {Link,useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import './style.css';
export default function NewIncident(){
    const history = useHistory();
    const[titulo,setTitulo] =useState('');
    const[description,setDescription] =useState('');
    const[value,setValue] =useState('');
    const ongId =localStorage.getItem('ongId');
    async function heandleNewIncident(e){
        e.preventDefault();
        const data ={
            titulo,
            description,
            value,
        };
        try{
            await api.post('incidents',data,{
                headers:{
                    authorization:ongId,
                }
            })
            history.push('/profile');
        }catch(err){
            alert('erro');
        }

    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="By The Hero"/>
                    <h1>Cadastrar Novo Caso</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar um herói para resolver isso.
                    </p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#Es02041"/>
                        Voltar Para Home                  
                    </Link>        
                </section>   
                <form onSubmit={heandleNewIncident}>
                    <input 
                        placeholder="Título do caso"
                        value={titulo}
                        onChange={e=>setTitulo(e.target.value)}
                        />
                   <textarea 
                            placeholder="Descrição"
                            value={description}
                            onChange={e=>setDescription(e.target.value)}
                            />
                    <input 
                        placeholder="Valor em Reais"
                        value={value}
                        onChange={e=>setValue(e.target.value)}
                        />
                    
                    <button className="button" type="submit">Cadastrar</button>
                    </form>              
            </div>
        </div>

    );
}