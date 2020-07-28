//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import axios from "axios"
// @ts-ignore
import JWT from "expo-jwt"
import AsyncStorage from "@react-native-community/async-storage"

import { AppStateType, InferActionsTypes } from "../../ReduxStore"
import { getDialogsChatsListThunkCreator } from "~/Redux/Reducers/ChatsReducers/ChatsGetReducer"
const key = "shh"

////////////////////////////////////////////////////////////////////////

const initialState = {
  DialogsChatsList: [] as Array<any>,
  GroupsChatsList: [] as Array<any>,
}

type initialStateType = typeof initialState

// *REDUCER* //
const ChatsSetReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  return state
}

export default ChatsSetReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

// Create new dialog
export const createNewDialogThunkCreator = (
  selectedUsersIDs: Array<any>,
  chatTitle: string,
  message: string
): ThunkType => {
  return async (dispatch, getState: any) => {
    const uid = await AsyncStorage.getItem("uid")

    await axios
      .post(
        "http://cgc.cgc.capital/api_interface",
        JSON.stringify(
          JWT.encode(
            {
              action: "new_user_chat_message",
              uid: uid,
              topic: chatTitle,
              users: selectedUsersIDs,
              message: message,
            },
            key
          )
        )
      )
      .then(async (res: any) => {
        dispatch(getDialogsChatsListThunkCreator())
        console.log(JWT.decode(res.data.data, key))
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response)
        }
      })
  }
}
