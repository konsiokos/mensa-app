import { TouchableOpacity, Text, View, StyleSheet } from "react-native"
import COLORS from "../consts/colors";

const BookingCard = ({ booking }) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
        >
            <View style={{ ...styles.card }}>
                <View style={styles.cardDetails}>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 28,
                            fontFamily: "Optima-Bold"
                        }}
                    >
                        {booking.club.Name}{" "}
                    </Text>
                    <Text style={{ color: COLORS.darkgrey }}>#{booking.info.BookingID}</Text>
                    <Text style={{ color: COLORS.darkgrey }}>{booking.booking.isConfirmed ? "Confirmed" : "Pending"}</Text>

                    <Text style={{ color: COLORS.darkgrey }}>{booking.info.StartDate}</Text>
                    <Text style={{ color: COLORS.darkgrey }}>
                        {booking.club.Address1} {booking.club.Address2}
                    </Text>
                    <View style={styles.priceTag}>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                            {" "}
                            £{booking.info.Price}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default BookingCard

const styles = StyleSheet.create({
    card: {
        height: 120,
        width: "100%",
        marginBottom: 20,
        borderRadius: 15,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        backgroundColor: COLORS.white
    },
    cardDetails: {
        height: 120,
        borderRadius: 45,
        backgroundColor: COLORS.white,
        position: "absolute",
        bottom: 0,
        padding: 10,
        width: "100%"
    },
    priceTag: {
        height: 95,
        width: 80,
        position: "absolute",
        zIndex: 0,
        right: 10,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        justifyContent: "center",
        alignItems: "center"
    }
})