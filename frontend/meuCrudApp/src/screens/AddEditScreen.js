import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Save, X, User, Mail, Phone, ChevronLeft } from 'lucide-react-native';
import { styles, NAVY, NEUTRAL, ACCENT } from "../styles/styles";
import { createPerson, updatePerson } from "../servers/peopleCrud";

//array de configuração que define cada campo do formulário
const FIELDS = [
    { key: 'firstName', label: 'Primeiro Nome', placeholder: 'ex: João', icon: User, keyboard: 'default' },
    { key: 'lastName', label: 'Sobrenome', placeholder: 'ex: Silva', icon: User, keyboard: 'default' },
    { key: 'email', label: 'E-mail', placeholder: 'ex: joao@email.com', icon: Mail, keyboard: 'email-address' },
    { key: 'phone', label: 'Telefone', placeholder: 'ex: (11) 99999-9999', icon: Phone, keyboard: 'phone-pad' },
];

export default function AddEditScreen({ route, navigation }) {
    const person = route.params?.person;
    //converte o valor de person para um booleano (true ou false)
    const isEditing = !!person;

    //Estado do formulário, inicializado com os dados da pessoa (se estiver editando) ou vazio (se for nova pessoa)
    const [form, setForm] = useState({
        firstName: person?.firstname || '',
        lastName: person?.lastname || '',
        email: person?.email || '',
        phone: person?.phone || '',
    });

    //Estado para controlar qual campo está focado, para aplicar estilos de foco
    const [focused, setFocused] = useState(null);

    //Função para atualizar o estado dos campos do formulário
    //prev = previous (anterior), ou seja, o estado atual do formulário antes da atualização

    function handleChange(key, value) {
        setForm(prev => ({ ...prev, [key]: value }));
    }

    async function save() {
        const data = {
            firstname: form.firstName,
            lastname: form.lastName,
            email: form.email,
            phone: form.phone,
        };

        if (isEditing) {
            await updatePerson(person.id, data);
        } else {
            await createPerson(data);
        }
        navigation.goBack();
    }

    const initials = isEditing
        ? `${(person.firstname || '?')[0]}${(person.lastname || '?')[0]}`.toUpperCase()
        : '?';

    return (
        <ScrollView
            style={styles.formContainer}
            contentContainerStyle={{ paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
        >
            {/* Header */}
            <View style={styles.headerBar}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ marginRight: 12, padding: 4 }}
                    activeOpacity={0.7}
                >
                    <ChevronLeft size={22} color="#fff" />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>
                        {isEditing ? 'Editar Pessoa' : 'Nova Pessoa'}
                    </Text>
                    <Text style={styles.subtitle}>
                        {isEditing ? 'Altere os dados abaixo' : 'Preencha os campos abaixo'}
                    </Text>
                </View>
                {/* Avatar decorativo quando editando */}
                {isEditing && (
                    <View style={[styles.cardAvatar, { backgroundColor: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)' }]}>
                        <Text style={[styles.cardAvatarText, { color: '#fff' }]}>{initials}</Text>
                    </View>
                )}
            </View>

            {/* Form card */}
            <View style={styles.formCard}>

                {FIELDS.map(({ key, label, placeholder, icon: Icon, keyboard }) => (
                    <View key={key}>
                        <Text style={styles.fieldLabel}>{label}</Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: focused === key ? NEUTRAL.white : NEUTRAL.snow,
                            borderRadius: 12,
                            borderWidth: 1.5,
                            borderColor: focused === key ? NAVY.accent : NEUTRAL.fog,
                            paddingHorizontal: 12,
                            paddingVertical: 2,
                        }}>
                            <Icon
                                size={16}
                                color={focused === key ? NAVY.accent : NEUTRAL.silver}
                                style={{ marginRight: 8 }}
                            />
                            <TextInput
                                style={[styles.input, {
                                    flex: 1,
                                    borderWidth: 0,
                                    paddingHorizontal: 10,
                                    marginRight: -6
                                }]}
                                placeholder={placeholder}
                                placeholderTextColor={NEUTRAL.silver}
                                value={form[key]}
                                onChangeText={val => handleChange(key, val)}
                                onFocus={() => setFocused(key)}
                                onBlur={() => setFocused(null)}
                                keyboardType={keyboard}
                                autoCapitalize={keyboard === 'default' ? 'words' : 'none'}
                                autoCorrect={false}
                            />
                        </View>
                    </View>
                ))}

                {/* Divisor */}
                <View style={styles.divider} />

                {/* Botões */}
                <View style={styles.formActions}>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.8}
                    >
                        <X size={18} color={ACCENT.danger} />
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={save}
                        activeOpacity={0.82}
                    >
                        <Save size={18} color="#fff" />
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}