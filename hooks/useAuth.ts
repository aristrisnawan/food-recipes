import { authService } from '@/services/authService';
import { removeToken, saveToken } from '@/utils/storage';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';

export const useLogin = () => {
    return useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) =>
            authService.login(email, password),

        onSuccess: async (res) => {
            const { token } = res.data;
            await saveToken(token)
            router.replace('/(tabs)')
        },

        onError: (err: any) => {
            console.log('Login gagal:', err.response?.data?.msg)
        }
    })
}

export const useLogout = () => {
    const logout = async () => {
        await removeToken();
        router.replace('/(auth)/login')
    };
    return { logout }
}

export const useRegister = () => {
    return useMutation({
        mutationFn: ({ name, email, password }: { name: string, email: string, password: string }) =>
            authService.register(name, email, password),
        onSuccess: async (res) => {
            const { token } = res.data;
            await saveToken(token)
            router.replace('/(tabs)')
        },
        onError: (err: any) => {
            console.log('Register gagal:', err.response?.data?.msg)
        }
    })
}