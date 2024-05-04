'use client'

import React, { createContext, useContext, useState } from 'react'

export type unreadCountState = {
  unreadCount: number
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>
}

const MessageContext = createContext<unreadCountState>(null!)

interface Props {
  children: React.ReactNode
}

export function MessageProvider({ children }: Props) {
  const [unreadCount, setUnreadCount] = useState(0)

  return (
    <MessageContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </MessageContext.Provider>
  )
}

export function useMessageContext() {
  return useContext(MessageContext)
}
