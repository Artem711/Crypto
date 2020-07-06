//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk"
import axios from "axios"

import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore"

////////////////////////////////////////////////////////////////////////

const initialState = {
  TarifsList: [] as Array<{
    color: string
    sale: string
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
  if (action.type === "SET_TARIFS_LIST") {
    return {
      ...state,
      TarifsList: action.tarifsList,
    }
  }

  return state
}

export default ExtraGetReducer

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {
  setTarifsListActionCreator: (
    tarifsList: Array<{
      color: string
      sale: string
      price: string
      duration: string
    }>
  ) =>
    ({
      type: "SET_TARIFS_LIST",
      tarifsList,
    } as const),
}

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

// Get tarifs list
export const getTarifsListThunkCreator = (): ThunkType => {
  return async (dispatch, getState: any) => {
    await axios.get("").then((res: any) => {
      dispatch(ActionCreatorsList.setTarifsListActionCreator(res.data))
    })
  }
}
