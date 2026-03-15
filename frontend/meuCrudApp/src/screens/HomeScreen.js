import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/styles';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({ }) {
    const navigation = useNavigation();
    const [people, setPeople] = useState([]);

    async function getPeople() {
        fetch('http://localhost:3000/people')
            .then(response => response.json())
            .then(data => setPeople(data))
            .catch(error => console.error('Error getting people:', error));
    }

    useEffect(() => {
        getPeople();
    }, []);

    return ( 
            <FlatList
            data={people}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.firstname} {item.lastname}</Text>
                    <Text>{item.email}</Text>
                </View>
            )}
        />
    )
}
