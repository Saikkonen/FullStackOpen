import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    notificationChange(state, action) {
      return action.payload
    },
  },
})

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch(notificationChange(message))
    setTimeout(() => {
      dispatch(notificationChange(null))
    }, timeout * 1000)
  }
}

export const { notificationChange } = notificationSlice.actions
export default notificationSlice.reducer
