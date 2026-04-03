import { FlatList, Text, View, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CardPersonal } from '../components/CardPersonal';
import { styles, NAVY, NEUTRAL } from '../styles/styles';
import { getPeople } from '../servers/peopleCrud';
import { UserPlus, Search } from 'lucide-react-native';

export default function HomeScreen() {
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

    async function filterPeople(text) {
        try {
            setIsLoading(true);
            const data = await getPeople();
            const filtered = data.filter(person =>
                `${person.firstname} ${person.lastname}`.toLowerCase().includes(text.toLowerCase())
            );
            setPeople(filtered);
        } catch (error) {
            alert("Erro ao filtrar pessoas.");
            setPeople([]);
        } finally {
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

            {/* Header */}
            <View style={styles.headerBar}>
                <View>
                    <Text style={styles.title}>Pessoas</Text>
                    <Text style={styles.subtitle}>Gerenciamento de contatos</Text>
                </View>
                {/* Badge com contagem */}
                <View style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 }}>
                    <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>{people.length}</Text>
                </View>
            </View>

            {/* Botão adicionar */}
            <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate("AddEditScreen")}
                activeOpacity={0.82}
            >
                <UserPlus size={18} color="#fff" />
                <Text style={styles.primaryButtonText}>Adicionar Pessoa</Text>
            </TouchableOpacity>

            {/* Busca */}
            <View style={styles.searchWrapper}>
                <Search size={16} color={NEUTRAL.slate} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar por nome..."
                    placeholderTextColor={NEUTRAL.silver}
                    value={searchText}
                    onChangeText={setSearchText}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>

            {/* Label de seção */}
            <Text style={styles.sectionLabel}>Contatos</Text>

            {/* Lista */}
            {isLoading ? (
                <ActivityIndicator
                    size="large"
                    color={NAVY.core}
                    style={{ marginTop: 60 }}
                />
            ) : (
                <FlatList
                    data={people}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 24 }}
                    ListEmptyComponent={
                        <View>
                            <Text style={styles.emptyList}>Nenhuma pessoa encontrada</Text>
                            <Text style={styles.emptyListSub}>Tente buscar por outro nome</Text>
                        </View>
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
    );
}