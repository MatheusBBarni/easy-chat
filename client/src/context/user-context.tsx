import React, { useContext, useState } from 'react'

export type UserContextProps = { 
  users: string[];
  setUsers: React.Dispatch<React.SetStateAction<string[]>>;
  loggedUser: string;
  setLoggedUser: React.Dispatch<React.SetStateAction<string>>;
}

export const UsersContext = React.createContext<UserContextProps>({
  users: [],
  setUsers: () => {},
  loggedUser: '',
  setLoggedUser: () => {}
})

export const UsersProvider = ({ children }: { children: JSX.Element }) => {
  const [users, setUsers] = useState<string[]>([])
  const [loggedUser, setLoggedUser] = useState<string>('')

  return (
    <UsersContext.Provider value={{ users, setUsers, loggedUser, setLoggedUser }}>
      {children}
    </UsersContext.Provider>
  )
}

export const useUsersContext = () => useContext(UsersContext);
