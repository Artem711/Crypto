//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import axios from "axios"
// @ts-ignore
import JWT from "expo-jwt"
import AsyncStorage from "@react-native-community/async-storage"

import { AppStateType, InferActionsTypes } from "../../ReduxStore"
const key = "shh"

////////////////////////////////////////////////////////////////////////

const initialState = {
  DialogsChatsList: [] as Array<any>,
  GroupsChatsList: [] as Array<any>,

  currentChatMessages: [] as Array<any>,
}

type initialStateType = typeof initialState

// *REDUCER* //
const ChatsGetReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  if (action.type === "SET_DIALOGS_CHATS_LIST") {
    return {
      ...state,
      DialogsChatsList: action.dialogsChatsList,
    }
  }

  if (action.type === "SET_GROUPS_CHATS_LIST") {
    return {
      ...state,
      GroupsChatsList: action.groupsChatsList,
    }
  }

  if (action.type === "SET_CURRENT_CHAT_MESSAGES") {
    return {
      ...state,
      currentChatMessages: action.messages,
    }
  }

  return state
}

export default ChatsGetReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {
  setDialogsChatsListActionCreator: (dialogsChatsList: Array<any>) =>
    ({
      type: "SET_DIALOGS_CHATS_LIST",
      dialogsChatsList,
    } as const),

  setGroupsChatsListActionCreator: (groupsChatsList: Array<any>) =>
    ({
      type: "SET_GROUPS_CHATS_LIST",
      groupsChatsList,
    } as const),

  setCurrentChatMessagesActionCreator: (messages: Array<any>) =>
    ({
      type: "SET_CURRENT_CHAT_MESSAGES",
      messages,
    } as const),
}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

// Get dialogs chats list
export const getDialogsChatsListThunkCreator = (): ThunkType => {
  return async (dispatch, getState: any) => {
    const uid = await AsyncStorage.getItem("uid")

    await axios
      .post(
        "http://cgc.cgc.capital/api_interface",
        JSON.stringify(
          JWT.encode(
            {
              action: "read_user_chats",
              uid: uid,
            },
            key
          )
        )
      )
      .then(async (res: any) => {
        const chats = JWT.decode(res.data.data, key).chats
        dispatch(ActionCreatorsList.setDialogsChatsListActionCreator(chats))
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response)
        }
      })
  }
}

// Get groups chats list
export const getGroupsChatsListThunkCreator = (): ThunkType => {
  return async (dispatch, getState: any) => {
    await axios.get("").then((res: any) => {
      dispatch(ActionCreatorsList.setGroupsChatsListActionCreator(res.data))
    })
  }
}

// Get current chat messages
export const getCurrentChatMessagesThunkCreator = (
  chatID: string
): ThunkType => {
  return async (dispatch, getState: any) => {
    const uid = await AsyncStorage.getItem("uid")

    await axios
      .post(
        "http://cgc.cgc.capital/api_interface",
        JSON.stringify(
          JWT.encode(
            {
              action: "read_chat_messages",
              uid: uid,
              chatid: chatID,
            },
            key
          )
        )
      )
      .then(async (res: any) => {
        const messages = JWT.decode(res.data.data, key).messages
        dispatch(
          ActionCreatorsList.setCurrentChatMessagesActionCreator(messages)
        )
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response)
        }
      })
  }
}
