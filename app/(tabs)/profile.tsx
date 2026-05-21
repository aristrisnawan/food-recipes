import { Colors } from "@/constants/theme";
import { useLogout } from "@/hooks/useAuth";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
    const { logout } = useLogout()
    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <SafeAreaView style={styles.area}>
                <View style={{ marginHorizontal: 10, }}>
                    <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: 'red' }} onPress={logout}>
                        <Text style={{ textAlign: 'center' }}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    area: {
        backgroundColor: Colors.background,
        flex: 1
    },
})