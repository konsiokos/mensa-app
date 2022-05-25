import { SafeAreaView, StyleSheet, Text, TouchableOpacity,View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";

const ConfirmedScreen = ({ navigation, route }) => {
    item = route
    return (
        <SafeAreaView style={styles.screen}>
            <Text style={styles.alert}>
                Confirmed
            </Text>
            <Icon.Button name="check-circle-outline" backgroundColor="black" style={{width: 60}}>

            </Icon.Button>
            <TouchableOpacity
                style={{ zIndex: 1 }}
                activeOpacity={0}
                onPress={() => {
                    navigation.navigate("HomeScreen", item)
                }}
            >
                <View style={styles.button}>
                    <Text
                        style={{
                            color: "white",
                            fontSize: 18,
                            fontWeight: "bold"
                        }}
                    >
                        Explore more
                    </Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ConfirmedScreen;

const styles = StyleSheet.create({
    alert: {
        fontSize: 50,
        color: "white"
    },
    screen: {
        backgroundColor: "black",
        alignItems: "center",
        height: "100%",
        justifyContent: "center",
        flex: 1
    },
    button: {
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        marginHorizontal: 20,
        borderRadius: 10,
        zIndex: 1,
        paddingHorizontal: "20%",
        marginVertical: "10%"
    },
})