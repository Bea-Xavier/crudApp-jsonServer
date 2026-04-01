import { FlatList, Text, Button, View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CardPersonal } from '../components/CardPersonal';

import { styles } from '../styles/styles';

import { getPeople } from '../servers/peopleCrud';

export default function HomeScreen({ }) {
    const navigation = useNavigation();
    //Lista
    const [people, setPeople] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearchText] = useState("");

    //Função para carregar os dados
    async function loadPeople() {
        setIsLoading(true);
        const data = await getPeople();
        setPeople(data);
    }

    //Função para filtrar a lista
    async function filterPeople(searchText) {
        try {
            setIsLoading(true);
            const data = await getPeople();
            const filtered = data.filter(person =>
                (person.firstname.toLowerCase() || person.lastname.toLowerCase()).includes(searchText.toLowerCase())
            );
            setPeople(filtered);
        }
        catch (error) {
            console.error("Erro na filtragem de pessoas:", error);
            setPeople([]); // Limpa a lista em caso de erro
        }
        finally {
            setIsLoading(false);
        }
    }

    //Executa ao abrir a tela
    useEffect(() => {
        loadPeople();
        filterPeople();
    }, []);

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Pessoas</Text>

            <Button
                title="Adicionar Pessoa"
                onPress={() => navigation.navigate("AddEditScreen")}
            />

            <FlatList
                data={people}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CardPersonal
                        item={item}
                        navigation={navigation}
                        refresh={loadPeople}
                    />
                )}
            />

        </View>
    )
}
