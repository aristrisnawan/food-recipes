import api from "./api"

export const recipeService = {
    create: async (
        title: string,
        description: string,
        category: string,
        duration: string,
        photo: string
    ) => {

        const formData = new FormData()

        formData.append('title', title)
        formData.append('description', description)
        formData.append('category', category)
        formData.append('duration', duration)

        const filename = photo.split('/').pop() || 'recipe.jpg';
        const extension = filename.split('.').pop() || 'jpg';

        formData.append('photo', {
            uri: photo,
            name: filename,
            type: `image/${extension}`,
        } as any)

        const response = await api.post(
            '/recipes',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )

        return response.data
    }

}