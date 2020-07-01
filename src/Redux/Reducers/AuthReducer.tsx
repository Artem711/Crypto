//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import axios from "axios"
import Base64 from "~/Redux/Code/Base64"

import { AppStateType, InferActionsTypes } from "../ReduxStore"

////////////////////////////////////////////////////////////////////////

const initialState = {
  UserLogin: null as string | null,
  UserPassword: null as string | null,
  UserInvitedID: null as string | null,
  //
  UserName: null as string | null,
  Email: null as string | null,
  Country: null as string | null,
  City: null as string | null,
}

type initialStateType = typeof initialState

// *REDUCER* //
const AuthReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  if (action.type === "SET_FIRST_SCREEN_VALUES") {
    return {
      ...state,
      UserLogin: action.UserLogin,
      UserPassword: action.UserPassword,
      UserInvitedID: action.UserInvitedID,
    }
  }

  if (action.type === "SET_SECOND_SCREEN_VALUES") {
    return {
      ...state,
      UserName: action.UserName,
      Email: action.Email,
      Country: action.Country,
      City: action.City,
    }
  }

  return state
}

export default AuthReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {
  setFirstScreenValuesActionCreator: (
    UserLogin: string,
    UserPassword: string,
    UserInvitedID: string | null
  ) =>
    ({
      type: "SET_FIRST_SCREEN_VALUES",
      UserLogin,
      UserPassword,
      UserInvitedID,
    } as const),

  setSecondScreenValuesActionCreator: (
    UserName: string,
    Email: string,
    Country: string,
    City: string
  ) =>
    ({
      type: "SET_SECOND_SCREEN_VALUES",
      UserName,
      Email,
      Country,
      City,
    } as const),
}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

// Register user
export const RegisterUserThunkCreator = (secretCode: string): ThunkType => {
  return async (dispatch, getState: any) => {
    const state = getState()

    function b64EncodeUnicode(str: string) {
      return Base64.btoa(
        encodeURIComponent(str).replace(
          /%([0-9A-F]{2})/g,
          function toSolidBytes(match, p1) {
            return String.fromCharCode(("0x" + p1) as any)
          }
        )
      )
    }

    const data = {
      login: b64EncodeUnicode(String(state.AuthState.UserLogin)),
      password: b64EncodeUnicode(String(state.AuthState.UserPassword)),
      invitedID: b64EncodeUnicode(String(state.AuthState.UserInvitedID)),
      name: b64EncodeUnicode(String(state.AuthState.UserName)),
      email: b64EncodeUnicode(String(state.AuthState.Email)),
      country: b64EncodeUnicode(String(state.AuthState.Country)),
      city: b64EncodeUnicode(String(state.AuthState.City)),
      secretCode: b64EncodeUnicode(String(secretCode)),
    }

    console.log(data)

    // await axios
    //   .post("http://cgc.cgc.capital/api_interface", JSON.stringify(data))
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }
}
