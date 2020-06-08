// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  title: string

  firstValue: string
  secondValue: string
}

const ListItem: React.FC<PropsType> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
      <View style={styles.wrapper}>
        <Text style={styles.title}>{props.firstValue}</Text>
        <Text style={styles.title}>({props.secondValue})</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 7,
  },

  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 90,
  },

  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16.5,
  },

  text: {
    color: "white",
    fontSize: 16.5,
  },
})

export default ListItem
