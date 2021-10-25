import React, { useContext, useState } from 'react'

export const UsersContext = React.createContext<{ users: string[]; setUsers: React.Dispatch<React.SetStateAction<string[]>> }>({
  users: [],
  setUsers: () => {}
})

export const UsersProvider = ({ children }: { children: JSX.Element }) => {
  const [users, setUsers] = useState<string[]>([])

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  )
}

export const useUsersContext = () => useContext(UsersContext);
