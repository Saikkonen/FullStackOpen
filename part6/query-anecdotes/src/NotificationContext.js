import { createContext, useReducer, useContext } from 'react'

const NotificationReducer = (state, action) => {
  return action
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const NotificaionAndDispatch = useContext(NotificationContext)
  return NotificaionAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const NotificaionAndDispatch = useContext(NotificationContext)
  return NotificaionAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(NotificationReducer, 0)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
