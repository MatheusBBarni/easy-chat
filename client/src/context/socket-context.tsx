import React, { useContext } from 'react'
import io, { Socket } from 'socket.io-client'

export const SocketContext = React.createContext<Socket>(io())

export const SocketProvider = ({ children }: { children: JSX.Element }) => {
  const ENDPOINT = 'localhost:5000/';
  const socket = io(ENDPOINT, { transports: ['websocket', 'polling'] })
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocketContext = () => useContext(SocketContext);
