interface User {
  username: string
  password: string
}

const USERS_KEY = "users"

const getUsers = (): User[] => {
  if (typeof window === "undefined") return []
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]")
}

const saveUsers = (users: User[]) => {
  if (typeof window === "undefined") return
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export const registerUser = (username: string, password: string): boolean => {
  const users = getUsers()
  if (users.some((user: User) => user.username === username)) {
    return false // User already exists
  }
  users.push({ username, password })
  saveUsers(users)
  return true
}

export const loginUser = (username: string, password: string): boolean => {
  const users = getUsers()
  return users.some((user: User) => user.username === username && user.password === password)
}

