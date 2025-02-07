interface Admin {
  username: string;
  password: string;
}

export const loginAdmin = (username: string, password: string): boolean => {
  // In a real app, this would be in a secure database
  const adminCredentials: Admin = {
    username: 'admin123@gmail.com',
    password: 'admin123'
  };

  return username === adminCredentials.username && password === adminCredentials.password;
};

export const checkIsAdmin = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('isAdmin') === 'true';
};

