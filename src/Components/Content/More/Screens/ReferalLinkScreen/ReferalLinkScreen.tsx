// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import Header from "./Header/Header"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
}

const ReferalLinkScreen: React.FC<PropsType> = (props) => {
  return (
    <View style={styles.container}>
      <Header referaLink={"https://qwe213124ew123"} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 17,
  },
})

export default ReferalLinkScreen
