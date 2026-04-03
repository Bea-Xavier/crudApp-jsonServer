import { View, Text, TouchableOpacity } from "react-native";
import { styles, NAVY, ACCENT } from "../styles/styles";
import { deletePerson } from "../servers/peopleCrud";
import { UserPen, Trash } from 'lucide-react-native';

export function CardPersonal({ item, navigation, refresh }) {

    // Gera iniciais para o avatar
    const initials = `${(item.firstname || '?')[0]}${(item.lastname || '?')[0]}`.toUpperCase();

    return (
        <View style={styles.card}>

            {/* Avatar + Info */}
            <View style={styles.cardRow}>
                <View style={styles.cardAvatar}>
                    <Text style={styles.cardAvatarText}>{initials}</Text>
                </View>

                <View style={styles.cardInfo}>
                    <Text style={styles.name}>
                        {item.firstname} {item.lastname}
                    </Text>
                    <Text style={styles.email}>{item.email}</Text>
                    <Text style={styles.phone}>{item.phone}</Text>
                </View>
            </View>

            {/* Ações */}
            <View style={styles.cardActions}>
                <TouchableOpacity
                    style={[styles.iconBtn, styles.iconBtnEdit]}
                    onPress={() => navigation.navigate("AddEditScreen", { person: item })}
                    activeOpacity={0.75}
                >
                    <UserPen size={18} color={NAVY.core} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.iconBtn, styles.iconBtnDelete]}
                    onPress={async () => {
                        await deletePerson(item.id);
                        refresh();
                    }}
                    activeOpacity={0.75}
                >
                    <Trash size={18} color={ACCENT.danger} />
                </TouchableOpacity>
            </View>

        </View>
    );
}