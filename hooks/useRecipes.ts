import { recipeService } from "@/services/recipeService"
import { IRecipe } from "@/types/recipe.types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { router } from "expo-router"

export const useUpload = () => {
    return useMutation({
        mutationFn: ({ title, description, duration, photo, category }: { title: string, description: string, duration: string, photo: string, category: string }) =>
            recipeService.create(title, description, category, duration, photo),

        onSuccess: async () => {
            router.replace('/')
        },

        onError: (err: any) => {
            console.log('Upload gagal:', err.response?.data)
            console.log('Status:', err.response?.status)
            console.log('Message:', err.message)
        }
    })
}

export const useGetRecipes = () => {
    return useQuery<IRecipe[]>({
        queryKey: ['listRecipes'],
        queryFn: async () => {
                const res = await recipeService.getRecipes()
                return res.data
        }
    })
}