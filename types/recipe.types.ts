export interface IUser {
  _id: string
  name: string
  email: string
  photo: string
  bio: string
}

export interface IRating {
  user: string
  value: number
}

export interface IRecipe {
  _id: string
  id: string
  title: string
  description: string
  photo: string
  author: IUser
  duration: string
  category: string
  likes: string[]
  saves: string[]
  ratings: IRating[]
  averageRating: number
  createdAt: string
  updatedAt: string
  __v: number
}