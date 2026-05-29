import { Colors } from "@/constants/theme";
import { Recipe } from "@/types/recipe.types";
import { Image, StyleSheet, Text, View } from "react-native";


interface Props {
    item: Recipe
}
export default function RecipeCard({ item }: Props) {
    return (
        <View key={item.id} style={styles.containCard}>
            <View style={styles.containImg}>
                <Image source={{ uri: item.photo }} resizeMode='cover' style={styles.img} />
                <View style={styles.labelText}>
                    <Text style={styles.colotTextLabel}>Populer</Text>
                </View>
            </View>
            <View style={styles.containDescribe}>
                <View style={styles.describeProfile}>
                    <View style={styles.containPhotoProfile}></View>
                    <Text style={styles.author}>Budi Santoso</Text>
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.containSpesifikasi}>
                    <Text style={styles.textSpesifikasi}>30 menit</Text>
                    <Text style={styles.textSpesifikasi}>4.8</Text>
                    <Text style={styles.textSpesifikasi}>234</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containCard: {
        marginTop: 40,
        backgroundColor: Colors.surface,
        borderRadius: 20,
    },
    containImg: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden'
    },
    img: {
        width: '100%',
        height: 200
    },
    labelText: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: 90,
        borderRadius: 20,
        position: 'absolute',
        margin: 6
    },
    colotTextLabel: {
        color: Colors.textWhite
    },
    containDescribe: {
        padding: 20
    },
    describeProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    containPhotoProfile: {
        height: 30,
        width: 30,
        backgroundColor: Colors.primaryLight,
        borderRadius: 50
    },
    author: {
        fontSize: 16,
        color: Colors.textSecondary
    },
    title: {
        fontSize: 20,
        marginTop: 10
    },
    containSpesifikasi: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 10
    },
    textSpesifikasi: {
        color: Colors.textTertiary
    }

})