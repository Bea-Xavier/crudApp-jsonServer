import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";
import { deletePerson } from "../servers/peopleCrud";
import {UserPen, Trash} from 'lucide-react-native';


export function CardPersonal({ item, navigation, refresh }) {

    return (
        <View style={styles.card}>

            <View>
                <Text style={styles.name}>
                    {item.firstname} {item.lastname}
                </Text>

                <Text style={styles.email}>
                    {item.email}
                </Text>

                <Text style={styles.email}>
                    {item.phone}
                </Text>
            </View>

            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("AddEditScreen", { person: item })}
                >
                    <UserPen size={20} color="#122072" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={async () => {
                        await deletePerson(item.id);
                        refresh();
                    }}
                >
                    <Trash size={20} color="#d11a2a" />
                </TouchableOpacity>

            </View>

        </View>
    )
}
