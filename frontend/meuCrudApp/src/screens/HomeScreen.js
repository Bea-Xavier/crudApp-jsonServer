import { FlatList, Text, Button, View, ActivityIndicator, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CardPersonal } from '../components/CardPersonal';

import { styles } from '../styles/styles';

import { getPeople } from '../servers/peopleCrud';

export default function HomeScreen({ }) {
    const navigation = useNavigation();
    //Lista
    const [people, setPeople] = useState([]);
    //Tela de carregamento
    const [isLoading, setIsLoading] = useState(false);
    //Pesquisa por nome
    const [searchText, setSearchText] = useState("");

    //Função para carregar os dados
    async function loadPeople() {
        try {
            setIsLoading(true);
            const data = await getPeople();
            setPeople(data);
        } catch (error) {
            alert("Erro ao carregar pessoas. Verifique a conexão com a API.");
            console.error("Erro ao carregar pessoas:", error);
            setPeople([]);
        } finally {
            setIsLoading(false);
        }
    }

    //Função para filtrar a lista
    async function filterPeople(searchText) {
        try {
            setIsLoading(true);
            const data = await getPeople();
            const filtered = data.filter(person =>
                `${person.firstname} ${person.lastname}`.toLowerCase().includes(searchText.toLowerCase())
            );
            setPeople(filtered);
        }
        catch (error) {
            alert("Erro ao filtrar pessoas. Verifique a conexão com a API.");
            console.error("Erro na filtragem de pessoas:", error);
            setPeople([]); // Define lista vazia em caso de erro
        }
        finally {
            setIsLoading(false);
        }
    }

    //Executa ao abrir a tela, carrega tudo na primeira renderização
    useEffect(() => {
        loadPeople();
    }, []);

    // Busca quando o texto muda (com debounce simples, ou seja com um tempo de inatividade)
    useEffect(() => {
        // Aguarda 500ms após o usuário parar de digitar para executar a função de busca
        const delaySearch = setTimeout(() => {
            filterPeople(searchText);
        }, 500);

        // Limpa o timeout anterior se o usuário continuar digitando
        return () => clearTimeout(delaySearch);
    }, [searchText]);

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Pessoas</Text>

            <Button
                title="Adicionar Pessoa"
                onPress={() => navigation.navigate("AddEditScreen")}
            />

            <TextInput
                placeholder='Buscar pessoa...'
                value={searchText}
                onChangeText={setSearchText}
                autoCapitalize='none'
                autoCorrect={false}
            />

            {isLoading ? (
                <ActivityIndicator
                    marginTop={80}
                    size="large"
                    color="#232c83"
                    style={{ marginTop: 12, transform: [{ scale: 1.2 }] }}
                />
            ) : (
                <FlatList
                    data={people}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={
                        <Text style={styles.emptyList}>
                            Nenhuma pessoa encontrada
                        </Text>
                    }
                    renderItem={({ item }) => (
                        <CardPersonal
                            item={item}
                            navigation={navigation}
                            refresh={loadPeople}
                        />
                    )}
                />
            )}
        </View>
    )
}
