//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import axios from "axios"
// @ts-ignore
import JWT from "expo-jwt"

import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore"
const key = "shh"

////////////////////////////////////////////////////////////////////////

const initialState = {
  PaymentAmount: null as string | null,
  endDate: null as string | null,

  ReferalLink: null as string | null,

  TarifsList: [] as Array<{
    ID: string
    title: string
    price: string
    duration: string
  }>,
}

type initialStateType = typeof initialState

// *REDUCER* //
const ExtraGetReducer = (
  state = initialState,
  action: ActionTypes
): initialStateType => {
  if (action.type === "SET_TARIFS_INFO") {
    return {
      ...state,
      PaymentAmount: action.PaymentAmount,
      endDate: action.endDate,
    }
  }

  if (action.type === "SET_TARIFS_LIST") {
    return {
      ...state,
      TarifsList: action.tarifsList,
    }
  }

  if (action.type === "SET_REFERAL_LINK") {
    return {
      ...state,
      ReferalLink: action.referalLink,
    }
  }

  return state
}

export default ExtraGetReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {
  setTarifsInfoActionCreator: (PaymentAmount: string, endDate: string) =>
    ({
      type: "SET_TARIFS_INFO",
      PaymentAmount,
      endDate,
    } as const),

  setTarifsListActionCreator: (
    tarifsList: Array<{
      ID: string
      title: string
      price: string
      duration: string
    }>
  ) =>
    ({
      type: "SET_TARIFS_LIST",
      tarifsList,
    } as const),

  setReferaLinkActionCreator: (referalLink: string) =>
    ({
      type: "SET_REFERAL_LINK",
      referalLink,
    } as const),
}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

// Get tarifs info
export const getTarifsInfoThunkCreator = (): ThunkType => {
  return async (dispatch, getState: any) => {
    const state = getState()

    await axios
      .post(
        "http://cgc.cgc.capital/api_interface",
        JSON.stringify(
          JWT.encode(
            {
              action: "get_abon_time",
              uid: state.AuthSetState.userID,
            },
            key
          )
        )
      )
      .then(async (res: any) => {
        const data = JWT.decode(res.data.data, key)
        dispatch(
          ActionCreatorsList.setTarifsInfoActionCreator(data.sum, data.time)
        )
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response)
        }
      })
  }
}

// Get tarifs list
export const getTarifsListThunkCreator = (): ThunkType => {
  return async (dispatch, getState: any) => {
    await axios
      .post(
        "http://cgc.cgc.capital/api_interface",
        JSON.stringify(
          JWT.encode(
            {
              action: "get_abon_plans",
            },
            key
          )
        )
      )
      .then(async (res: any) => {
        const data = JWT.decode(res.data.data, key)
        const cleanData = data.plans.map((tarif: any) => {
          return {
            title: tarif.pName,
            price: tarif.pMin,
            duration: tarif.pPer,
            ID: tarif.pID,
          }
        })

        dispatch(ActionCreatorsList.setTarifsListActionCreator(cleanData))
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response)
        }
      })
  }
}

// Get referal link
export const getReferalLinkThunkCreator = (): ThunkType => {
  return async (dispatch, getState: any) => {
    const state = getState()

    await axios
      .post(
        "http://cgc.cgc.capital/api_interface",
        JSON.stringify(
          JWT.encode(
            {
              action: "reflink",
              uid: state.AuthSetState.userID,
            },
            key
          )
        )
      )
      .then(async (res: any) => {
        const link = JWT.decode(res.data.data, key).reflink
        dispatch(ActionCreatorsList.setReferaLinkActionCreator(link))
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response)
        }
      })
  }
}
