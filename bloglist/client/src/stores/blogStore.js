import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { setNotification } from './notificationStore'

import blogService from '../services/blogs'

const useBlogStore = create(
  devtools((set, get) => ({
    blogs: [],
    actions: {
      create: async (blog, user) => {
        try {
          const newBlog = await blogService.create(blog)
          set((state) => ({ blogs: state.blogs.concat({ ...newBlog, user }) }))
          setNotification(`a new blog ${newBlog.title} by ${newBlog.author} was added`, 'success')
          return true
        } catch {
          setNotification('error in adding new blog', 'error')
          return false
        }
      },
      remove: async (blog) => {
        await blogService.remove(blog)
        set((state) => ({ blogs: state.blogs.filter((a) => a.id !== blog.id) }))
        setNotification(`blog ${blog.title} by ${blog.author} was removed`, 'success')
      },
      like: async (id) => {
        const blog = get().blogs.find((blog) => blog.id === id)
        const likedBlog = { ...blog, likes: blog.likes + 1 }
        await blogService.update(likedBlog)

        set((state) => ({ blogs: state.blogs.map((a) => (a.id === id ? likedBlog : a)) }))
      },
      initialize: async () => {
        const blogs = await blogService.getAll()
        set(() => ({ blogs }))
      }
    }
  }))
)

export const useBlogActions = () => useBlogStore((state) => state.actions)
export const useBlogs = () => {
  const blogs = useBlogStore((state) => state.blogs)
  return blogs.toSorted((a, b) => b.likes - a.likes)
}

export default useBlogStore
