import { View, Text, Button } from "react-native";
import { styles } from "../styles/styles";
import { deletePerson } from "../servers/peopleCrud";

export function CardPersonal({ item, navigation, refresh }) {

    return (
        <View style={styles.card}>

            <View>
                <Text style={styles.name}>
                    {item.firstname || item.firstName} {item.lastname || item.lastName}
                </Text>

                <Text style={styles.email}>
                    {item.email}
                </Text>
            </View>

            <View>
                <Button
                    title="Editar"
                    onPress={() => navigation.navigate("AddEditScreen", { person: item })}
                />

                <Button
                    title="Excluir"
                    onPress={async () => {
                        await deletePerson(item.id);
                        refresh();
                    }}
                />
                
            </View>

        </View>
    )
}
