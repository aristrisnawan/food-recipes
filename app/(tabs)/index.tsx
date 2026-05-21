import { Colors } from '@/constants/theme';
import { useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const tags = [
    {
      "id": 1,
      "tag": 'Semua',
    },
    {
      "id": 2,
      "tag": 'Sarapan',
    },
    {
      "id": 3,
      "tag": 'Makan siang',
    },
    {
      "id": 4,
      "tag": 'Makan siang',
    },
    {
      "id": 5,
      "tag": 'Makan malam',
    },
  ]

  const recipesList = [
    {
      "id": 1,
      "title": "Nasi Goreng",
      "description": "Nasi goreng dibuat dengan cara menggoreng nasi bersama bumbu dan bahan pelengkap hingga tercampur sempurna dan menghasilkan rasa yang gurih serta aroma yang khas. Proses pembuatannya dimulai dengan menumis bawang putih dan bawang merah hingga harum, kemudian ditambahkan cabai sesuai selera. Setelah itu, masukkan telur, ayam, sosis, atau bahan lain yang diinginkan lalu aduk hingga matang. Nasi putih yang sudah dingin kemudian dimasukkan ke dalam wajan dan dicampur bersama kecap manis, garam, merica, serta penyedap agar bumbunya merata. Semua bahan digoreng dengan api sedang hingga nasi sedikit kering dan beraroma harum. Nasi goreng biasanya disajikan dengan pelengkap seperti kerupuk, acar, irisan mentimun, dan telur mata sapi agar rasanya semakin nikmat.",
      "photo": 'https://images.unsplash.com/photo-1680674774705-90b4904b3a7f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      "id": 2,
      "title": "Nasi Goreng",
      "description": "Nasi goreng dibuat dengan cara menggoreng nasi bersama bumbu dan bahan pelengkap hingga tercampur sempurna dan menghasilkan rasa yang gurih serta aroma yang khas. Proses pembuatannya dimulai dengan menumis bawang putih dan bawang merah hingga harum, kemudian ditambahkan cabai sesuai selera. Setelah itu, masukkan telur, ayam, sosis, atau bahan lain yang diinginkan lalu aduk hingga matang. Nasi putih yang sudah dingin kemudian dimasukkan ke dalam wajan dan dicampur bersama kecap manis, garam, merica, serta penyedap agar bumbunya merata. Semua bahan digoreng dengan api sedang hingga nasi sedikit kering dan beraroma harum. Nasi goreng biasanya disajikan dengan pelengkap seperti kerupuk, acar, irisan mentimun, dan telur mata sapi agar rasanya semakin nikmat.",
      "photo": 'https://images.unsplash.com/photo-1680674774705-90b4904b3a7f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ]

  const [active, setActive] = useState(1)
  return (
    <SafeAreaView style={styles.area} edges={['top']}>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 20 }}>Halo, <Text style={{ color: Colors.primary }}>User</Text> 👋</Text>
          </View>
          <View style={{ width: 40, height: 40, backgroundColor: Colors.primaryLight, borderRadius: 50 }}></View>
        </View>
        <View style={{
          marginTop: 20,
          borderRadius: 10,
          backgroundColor: Colors.surface,

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.08,
          shadowRadius: 5,
          elevation: 4,
        }}>

          <TextInput
            placeholder='Cari resep'
            placeholderTextColor={Colors.textTertiary}
            style={{
              borderRadius: 10,
              backgroundColor: Colors.surface,
            }}
          />

        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', marginTop: 20, gap: 10 }}>
            {
              tags.map((data) => {
                const isActive = data.id === active
                return (
                  <Pressable
                    key={data.id}
                    onPress={() => setActive(data.id)}
                    style={{
                      backgroundColor: isActive ? Colors.primary : Colors.primarySoft,
                      paddingVertical: 4,
                      paddingHorizontal: 5,
                      borderRadius: 20
                    }}>
                    <Text style={{ color: isActive ? Colors.textWhite : Colors.primary }}> {data.tag} </Text>
                  </Pressable>
                )
              })
            }
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={recipesList}
          renderItem={({ item }) => {
            return (
              <View key={item.id} style={{ 
                marginTop: 40, 
                backgroundColor: Colors.surface, 
                borderRadius: 20,
                 }}>
                <View style={{
                  width: '100%',
                  height: 200,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  overflow: 'hidden'
                }}>
                  <Image source={{ uri: item.photo }} resizeMode='cover' style={{ width: '100%', height: 200 }} />
                  <View style={{ backgroundColor: Colors.primary, paddingHorizontal: 20, paddingVertical: 10, width: 90, borderRadius: 20, position: 'absolute', margin: 6 }}>
                    <Text style={{ color: Colors.textWhite }}>Populer</Text>
                  </View>
                </View>
                <View style={{ padding: 20 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <View style={{ height: 30, width: 30, backgroundColor: Colors.primaryLight, borderRadius: 50 }}></View>
                    <Text style={{ fontSize: 16, color: Colors.textSecondary }}>Budi Santoso</Text>
                  </View>
                  <Text style={{ fontSize: 20, marginTop: 10 }}>{item.title}</Text>
                  <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
                    <Text style={{ color: Colors.textTertiary }}>30 menit</Text>
                    <Text style={{ color: Colors.textTertiary }}>4.8</Text>
                    <Text style={{ color: Colors.textTertiary }}>234</Text>
                  </View>
                </View>
              </View>
            )
          }}
          keyExtractor={item => item.id.toString()}
          style={{ marginVertical: 10 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    backgroundColor: Colors.background,
    flex: 1,
    paddingHorizontal: 16
  }
});
