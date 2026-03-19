import { FlatList, Text, Button, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../styles/styles';

import { getPeople } from '../servers/peopleCrud';

export default function HomeScreen({ }) {
    const navigation = useNavigation();
    //Lista
    const [people, setPeople] = useState([]);

    //Função para carregar os dados
    async function loadPeople() {
        const data = await getPeople();
        setPeople(data);
    }

    //Executa ao abrir a tela
    useEffect(() => {
        loadPeople();
    }, []);

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Pessoas</Text>

            <Button
                title="Adicionar Pessoa"
                onPress={() => navigation.navite("AddEdit")}
            />

            <FlatList
                data={people}
                keyExtractor={(item) => item.id.toString()}

                renderItem={(item) => (
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
