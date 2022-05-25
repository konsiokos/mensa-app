import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import COLORS from "../consts/colors";

const ClubCard = ({ navigation, club }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate("DetailsScreen", club)}
    >
      <View style={{ ...styles.card }}>
        <Image
          source={{ uri: "data:image/png;base64," + club.Image1 }}
          style={styles.cardImage}
        />
        <View style={styles.cardDetails}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 28,
              fontFamily: "Optima-Bold"
            }}
          >
            {club["Name"]}{" "}
          </Text>
          <Text style={{ color: COLORS.darkgrey }}>
            {club.Address1}, {club.Address2}
          </Text>
          <View style={styles.priceTag}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {" "}
              £{club.MinPrice}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ClubCard;
const styles = StyleSheet.create({
  card: {
    height: 270,
    width: "100%",
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    backgroundColor: COLORS.white
  },
  cardImage: {
    height: 200,
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  cardDetails: {
    height: 75,
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: 0,
    padding: 10,
    width: "100%"
  },
  priceTag: {
    height: 70,
    width: 80,
    position: "absolute",
    zIndex: 0,
    right: 10,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: "center",
    alignItems: "center"
  }
});
