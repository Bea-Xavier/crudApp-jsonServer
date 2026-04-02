import { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Save, X } from 'lucide-react-native';

import { styles } from "../styles/styles";

import { createPerson, updatePerson } from "../servers/peopleCrud";

export default function AddEditScreen({ route, navigation }) {

    const person = route.params?.person;

    const [firstName, setFirstName] = useState(person?.firstname || '');
    const [lastName, setLastName] = useState(person?.lastname || '');
    const [email, setEmail] = useState(person?.email || '');
    const [phone, setPhone] = useState(person?.phone || '');

    async function save() {

        const data = {
            firstname: firstName,
            lastname: lastName,
            email,
            phone
        };

        if (person) {
            await updatePerson(person.id, data);
        } else {
            await createPerson(data);
        }
        navigation.goBack();

    }

    return (

        <View style={styles.container}>

            <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
            />
            <TouchableOpacity
                onPress={save}
            >
                <Save size={20} color="#122072" />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <X size={20} color="#d11a2a" />
            </TouchableOpacity>
        </View>

    );
}