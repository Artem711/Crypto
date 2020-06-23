// PLUGINS IMPORTS //
import React from "react"
import { ImageBackground, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import InputSection from "./InputSection/InputSection"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  setFirstScreenValuesActionCreator: (
    UserLogin: string,
    UserPassword: string,
    UserInvitedID: string | null
  ) => void
}

const Step1Screen: React.FC<PropsType> = (props) => {
  return (
    <ImageBackground
      style={styles.container}
      source={require("~/Images/bg-1.png")}
    >
      <InputSection
        navigation={props.navigation}
        setFirstScreenValuesActionCreator={
          props.setFirstScreenValuesActionCreator
        }
      />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default Step1Screen
