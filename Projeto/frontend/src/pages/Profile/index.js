import React,{useState,useEffect} from 'react';
import logoImg from '../../assents/logo.svg';
import {Link,useHistory} from 'react-router-dom';
import { FiPower,FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import './style.css';
export default function Profile(){
    const history = useHistory();
    const [incidents,setIncidents] = useState([]);
    const ongId =localStorage.getItem('ongId');
    const ongName =localStorage.getItem('ongName');
    useEffect(()=>{
        api.get('profile',{
            headers:{
                authorization:ongId,
            }
        }).then(response=>{
            setIncidents(response.data);
        });
  
    },[ongId]);
    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers:{
                    authorization:ongId,
                }
            });
            setIncidents(incidents.filter(incident=>incident.id!== id));
        }catch(err){
            alert('nao foi possivel deletar');
        }
    }
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="By The Hero"/>
                <span>Bem-Vindo(a),{ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
             {incidents.map(incident =>(
                 <li key={incident.id}>
                     <strong>CASO:</strong>
                     <p >{incident.titulo}</p>
                     <strong>DESCRIÇÃO:</strong>
                     <p >{incident.description}</p>
                     <strong>VALOR:</strong>
                     <p >{Intl.NumberFormat('pt-br',{style:'currency',currency:'BRL'}).format(incident.value)}</p>
                    <button type='button' onClick={()=>handleDeleteIncident(incident.id)}>
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                 </li>
                   
             ))}
                
            </ul>

        </div>
        );
    
        


}