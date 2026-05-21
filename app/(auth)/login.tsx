import { Colors } from '@/constants/theme';
import { useLogin } from '@/hooks/useAuth';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const { mutate: login, isPending, error } = useLogin();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Gagal', 'Email dan password harus diisi')
      return
    }
    login({ email, password })
  }

  return (
    <SafeAreaView style={styles.area}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.posterCard}>
            <View style={{ alignItems: 'center' }}>
              <Image source={require('../../assets/images/book.png')} style={{ width: 80, height: 80 }} />
            </View>
            <View>
              <Text style={[styles.posterCardText, { fontSize: 25, fontWeight: '500' }]}>ResepKu</Text>
              <Text style={[styles.posterCardText, { fontSize: 16, fontWeight: '400' }]}>Temukan & bagikan resep favoritmu</Text>
            </View>
          </View>
          <View style={styles.containInput}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.textInputStyle}>
                <MaterialIcons name='mail' size={20} />
                <TextInput
                  placeholder='Email address'
                  placeholderTextColor={Colors.textTertiary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  style={{ height: 50, flex: 1 }}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.textInputStyle}>
                <MaterialIcons name='lock' size={20} />
                <TextInput
                  placeholder='Password'
                  placeholderTextColor={Colors.textTertiary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPass}
                  style={{ height: 50, flex: 1 }}
                />
                <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                  <MaterialIcons
                    name={showPass ? 'visibility' : 'visibility-off'}
                    size={20}
                    color={Colors.textTertiary}
                  />
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
            {
              error && (
                <Text style={styles.errorText}>
                  {(error as any).response?.data?.msg || 'Login gagal, coba lagi'}
                </Text>
              )
            }
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isPending}
              style={styles.signInButton}>
              {
                isPending ?
                  <ActivityIndicator color={Colors.textWhite} /> :
                  <Text style={styles.signInText}>Masuk</Text>
              }
            </TouchableOpacity>
            <View style={styles.hrStyle}>
              <View style={styles.lineStyle} />
              <View>
                <Text style={{ color: Colors.textSecondary }}>atau</Text>
              </View>
              <View style={styles.lineStyle} />
            </View>
            <TouchableOpacity
              onPress={() => router.push('/(auth)/register')}
              style={styles.signUpButton}>
              <Text style={styles.signUpText}>Daftar akun baru</Text>
            </TouchableOpacity>
            <View style={styles.containForgotPassword}>
              <Text style={styles.forgotPasswordText}>Lupa password? </Text>
              <TouchableOpacity onPress={() => alert('Sedang dalam pengembangan')}>
                <Text style={styles.forgotPasswordBtn}>Reset akun</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    backgroundColor: Colors.background,
    flex: 1
  },
  posterCard: {
    height: 250,
    width: '100%',
    backgroundColor: Colors.primary,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 50, gap: 8,
    paddingHorizontal: 40
  },
  posterCardText: {
    textAlign: 'center',
    color: Colors.textWhite
  },
  containInput: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'column',
    gap: 20
  },
  textInputStyle: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 10
  },
  signInButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 12
  },
  signInText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 18,
    color: Colors.textWhite
  },
  hrStyle: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  lineStyle: {
    height: 1,
    backgroundColor: Colors.textSecondary,
    width: '40%'
  },
  signUpButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 12
  },
  signUpText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 18,
    color: Colors.primary
  },
  containForgotPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  forgotPasswordText: {
    color: Colors.textSecondary,
    fontWeight: '500',
    fontSize: 15
  },
  forgotPasswordBtn: {
    color: Colors.primary,
    fontWeight: '500',
    fontSize: 15
  },
  errorText: {
    color: Colors.danger,
    fontSize: 13,
    textAlign: 'center',
  },
});
