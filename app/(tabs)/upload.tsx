import { Colors } from '@/constants/theme';
import { useUpload } from '@/hooks/useRecipes';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Alert, Image, KeyboardAvoidingView, Platform, Pressable,
    ScrollView,
    StyleSheet, Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';



const categories = [
    { label: 'Sarapan', value: 'Sarapan' },
    { label: 'Makan Siang', value: 'Makan Siang' },
    { label: 'Makan Malam', value: 'Makan Malam' },
    { label: 'Dessert', value: 'Dessert' },
    { label: 'Minuman', value: 'Minuman' },
    { label: 'Snack', value: 'Snack' },
]

export default function UploadScreen() {
    const { mutate: upload, isPending, error } = useUpload()
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState('')


    useFocusEffect(
        useCallback(() => {
            return () => {
                setPhotoUri(null)
                setSelectedCategory(null)
                setTitle('')
                setDescription('')
                setDuration('')
            }
        }, [])
    )

    const pickImage = async () => {
        Alert.alert('Upload Foto', 'Pilih sumber foto', [
            {
                text: 'Kamera',
                onPress: async () => {
                    const { status } = await ImagePicker.requestCameraPermissionsAsync();
                    if (status !== 'granted') return alert('Izin kamera diperlukan');

                    const result = await ImagePicker.launchCameraAsync({
                        mediaTypes: ['images'],
                        allowsEditing: true,
                        aspect: [4, 3],
                        quality: 0.8,
                    });

                    if (!result.canceled) setPhotoUri(result.assets[0].uri);
                },
            },
            {
                text: 'Galeri',
                onPress: async () => {
                    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (status !== 'granted') return alert('Izin galeri diperlukan');

                    const result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ['images'],
                        allowsEditing: true,
                        aspect: [4, 3],
                        quality: 0.8,
                    });

                    if (!result.canceled) setPhotoUri(result.assets[0].uri);
                },
            },
            { text: 'Batal', style: 'cancel' },
        ]);
    };

    const handleUpload = () => {
        if (!photoUri || !title || !description || !duration || !selectedCategory) {
            Alert.alert('Upload Gagal', 'Semua field harus diisi')
            return
        }

        upload({ title, description, duration, photo: photoUri, category: selectedCategory })
    }



    return (
        <SafeAreaView style={styles.area} edges={['top']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView style={styles.scroll}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 150,
                    }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={styles.header}>Upload Resep</Text>

                    <Text style={styles.label}>Foto resep<Text style={styles.required}>*</Text></Text>
                    <Pressable onPress={pickImage} style={styles.photoContainer}>
                        {photoUri ? (
                            <View style={{ flex: 1 }}>
                                <Image source={{ uri: photoUri }} style={styles.photoPreview} resizeMode="cover" />
                                <View style={styles.changeBtn}>
                                    <MaterialIcons name="edit" size={16} color={Colors.textWhite} />
                                    <Text style={styles.changeBtnText}>Ganti Foto</Text>
                                </View>
                            </View>
                        ) : (
                            <View style={styles.photoPlaceholder}>
                                <MaterialIcons name="add-a-photo" size={32} color={Colors.primary} />
                                <Text style={styles.photoPlaceholderText}>Tap untuk upload foto</Text>
                                <Text style={styles.photoPlaceholderSub}>JPG, PNG maksimal 5MB</Text>
                            </View>
                        )}
                    </Pressable>
                    <Text style={styles.label}>Nama Resep <Text style={styles.required}>*</Text></Text>
                    <View>
                        <TextInput
                            placeholderTextColor={Colors.textTertiary}
                            placeholder='Contoh: Nasi Goreng Spesial'
                            style={styles.textInput}
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>
                    <Text style={styles.label}>Deskripsi <Text style={styles.required}>*</Text></Text>
                    <View>
                        <TextInput
                            multiline={true}
                            numberOfLines={5}
                            placeholderTextColor={Colors.textTertiary}
                            placeholder='Tulis bahan-bahan dan cara memasak...'
                            style={styles.textArea}
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>
                    <Text style={styles.label}>Waktu Memasak <Text style={styles.required}> *</Text></Text>
                    <View>
                        <TextInput
                            multiline={true}
                            numberOfLines={5}
                            placeholderTextColor={Colors.textTertiary}
                            placeholder='Contoh: 30 Menit'
                            style={styles.textInput}
                            value={duration}
                            onChangeText={setDuration}
                        />
                    </View>
                    <Text style={styles.label}>Category <Text style={styles.required}> *</Text></Text>
                    <View>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            data={categories}
                            labelField="label"
                            valueField="value"
                            placeholder="Pilih kategori"
                            value={selectedCategory}
                            onChange={(item) => {
                                setSelectedCategory(item.value)
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 20, marginBottom: 20 }}>
                        <TouchableOpacity disabled={isPending} style={styles.btnUpload} onPress={handleUpload}>
                            {
                                isPending ?
                                    <ActivityIndicator color={Colors.textWhite} /> :
                                    <Text style={styles.textUpload}>Upload Resep</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scroll: {
        padding: 16,
        gap: 8
    },
    header: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.textSecondary
    },
    label: {
        marginTop: 10,
        color: Colors.textSecondary
    },
    required: {
        color: Colors.danger
    },
    photoContainer: {
        borderWidth: 1.5,
        borderColor: Colors.primary,
        borderStyle: 'dashed',
        borderRadius: 12,
        overflow: 'hidden',
        height: 200,
        marginTop: 5
    },
    photoPreview: {
        width: '100%',
        height: '100%',
    },
    photoPlaceholder: {
        flex: 1,
        backgroundColor: Colors.primarySoft,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    photoPlaceholderText: {
        color: Colors.primary,
        fontWeight: '500',
        fontSize: 14,
    },
    photoPlaceholderSub: {
        color: Colors.textTertiary,
        fontSize: 12,
    },
    changeBtn: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },
    changeBtnText: {
        color: Colors.textWhite,
        fontSize: 12,
    },
    textInput: {
        backgroundColor: Colors.surface,
        borderRadius: 10,
        marginTop: 5
    },
    textArea: {
        backgroundColor: Colors.surface,
        borderRadius: 10,
        marginTop: 5,
        textAlignVertical: 'top',
        minHeight: 120
    },
    btnUpload: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
        paddingVertical: 12
    },
    textUpload: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 18,
        color: Colors.textWhite
    },
    dropdown: {
        marginTop: 10,
        height: 50,
        backgroundColor: Colors.surface,
        borderRadius: 10,
        paddingHorizontal: 12,
    },

    placeholderStyle: {
        fontSize: 16,
        color: Colors.textTertiary,
    },

    selectedTextStyle: {
        fontSize: 16,
    },
});