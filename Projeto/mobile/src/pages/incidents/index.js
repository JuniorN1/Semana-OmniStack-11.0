import React,{useEffect,useState} from 'react';
import { View,FlatList,Image,Text,TouchableOpacity } from 'react-native';
import { Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';
import styles from './style';
export default function(){
    const navigation = useNavigation();
    const [incidents,setIncidents] = useState([]);
    const [total,setTotal] = useState(0);
    const [page,setPage] = useState(1);
    const [loading,setLoading] =useState(false);


    function navigateToDetail(incident){
        navigation.navigate('Detais',{incident});

    }
    async function loadIncidents(){
  
        if(loading){
            return;
        }
        if(total > 0  && incidents.length == total){
            return;
        }
        setLoading(true);
        const response = await api.get('incidents',{params:{
            page
        }});
        
        setIncidents([...incidents, ...response.data]);  
        setTotal(response.headers['x-total-count']);
        setPage(page+1);
        setLoading(false);
        
    }
    useEffect(()=>{
        loadIncidents();

    },[]);
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total}</Text> Casos.
                </Text>

            </View>
            <Text style={styles.title}>
                    Bem-Vindo(a)!
                </Text>
                <Text style={styles.description}>
                    Escolha um dos Casos Abaixo e Salve o Dia!
                </Text>
            <FlatList 
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.3}
                showsVerticalScrollIndicator={false}
                renderItem={({item:incident})=>(
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>
                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.titulo} </Text>
                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>R${incident.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                       <TouchableOpacity style={styles.detailButton} onPress={()=>navigateToDetail(incident)}>
                            <Text style={styles.detailsButtonText}>Ver Mais Detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"></Feather>
                        </TouchableOpacity>
                    </View>
                )}
            />
            
         

            </View>


    );
}