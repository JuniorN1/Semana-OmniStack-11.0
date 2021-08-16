import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';
import  './styles.css';
import heroesImg from '../../assents/heroes.png';
import logoImg from '../../assents/logo.svg';

export default function Logon(){
    const [id,setId] = useState('');
    const history = useHistory();
    async function handleLogin(e){
        e.preventDefault();
      try{
        const response = await api.post('sessions',{id});
       localStorage.setItem('ongId',id);
       localStorage.setItem('ongName',response.data.name);
        history.push('/profile');
      }catch(err){
          alert(`Não foi encontrado ONG com id Correspondente!`);
      }
        
    }
    return (
       <div className="logon-container">
           <section className="form">
           <img src={logoImg} alt="By The Hero"/>
           <form onSubmit={handleLogin}>
               <h1>Faça seu logon</h1>
               <input 
                    placeholder="Sua ID"
                    value={id}
                    onChange={e=>setId(e.target.value)}           
               />
               <button className="button" type="submit">Entrar</button>
               <Link className="back-link" to="/register"><FiLogIn size={16} color="#Es02041"/>Não tenho Cadastro!</Link>
           </form>
           </section>
           <img src={heroesImg} alt="Heroes"/>
       </div>
    );
}