import { Button } from "react-native";

function CardPersonal({ item, navigation, refresh }) {

    return (
        <View style={styles.card}>

            <View>
                <Text style={styles.name}>
                    {item.name} {item.lastName}
                </Text>

                <Text style={styles.email}>
                    {item.email}
                </Text>
            </View>

            <View>
                <Button
                    title="Editar"
                    onPress={() => navigation.navigate("AddEdit", { person: item })}
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
