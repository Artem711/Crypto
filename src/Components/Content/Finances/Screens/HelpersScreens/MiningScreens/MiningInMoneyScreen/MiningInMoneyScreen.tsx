// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Keyboard, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import InputSection from "~/Components/Shared/Sections/FooterInputSection/FooterInputSection"
import Popup from "~/Components/Shared/Components/Popups/PopUp/PopUp"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

  addMiningThunkCreator: (moneyAmount: string) => any
}

const MiningInMoneyScreen: React.FC<PropsType> = (props) => {
  const [popupVisible, setPopupVisible] = useState(false as boolean)

  return (
    <>
      <View style={styles.container}>
        <InputSection
          buttonText="Пополнить"
          valueName="Укажите сумму"
          errorText="Сумма указана неверно"
          isNumberPad
          action={(values: any) => {
            Keyboard.dismiss()
            props
              .addMiningThunkCreator(values.value)
              .then(() => setPopupVisible(true))
          }}
        />
      </View>
      <Popup
        buttonsArray={[
          {
            text: "OK",
            action: () => props.navigation.navigate("FinancesMain"),
          },
        ]}
        title="Спасибо!"
        description="Ваша заявка поступила в обработку"
        containerStyle={{
          width: "90%",
        }}
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
})

export default MiningInMoneyScreen
