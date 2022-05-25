import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ImageBackground
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import DropDownPicker from "react-native-dropdown-picker";
import { makeBooking } from "../routes_app";
import { getAvailableSlots } from "../routes_app";
import { ScrollView } from "react-native-gesture-handler";

const MakeBookingScreen = ({ navigation, route }) => {
  const item = route.params;
  const [openDate, setOpenDate] = useState(false);
  const [valueDate, setValueDate] = useState(null);
  const [itemsDate, setItemsDate] = useState([]);
  const [openTable, setOpenTable] = useState(false);
  const [valueTable, setValueTable] = useState(null);
  const [itemsTable, setItemsTable] = useState([]);
  const [openTime, setOpenTime] = useState(false);
  const [valueTime, setValueTime] = useState(null);
  const [itemsTime, setItemsTime] = useState([]);
  var [slots, setSlots] = useState([]);
  var [filtered_slots, setFiltered_slots] = useState([]);
  var [filtered_tables, setFiltered_tables] = useState([]);
  var [price, setPrice] = useState([]);
  var dates = [];
  var seenDates = [];
  var tables = [];
  var seenTables = [];
  var times = [];

  useEffect(() => {
    async function getSlots() {
      const availableSlots = await getAvailableSlots(item.ClubID);
      setSlots(availableSlots);
    }
    getSlots();
  }, []);

  useEffect(() => {
    setValueTable(null);
    setValueTime(null);
    setPrice(null);
    const filtered_slots = slots.filter(item => {
      return item.slot.StartDate == valueDate;
    });
    setFiltered_slots(filtered_slots);
  }, [valueDate]);

  useEffect(() => {
    setValueTime(null);
    setPrice(null);
    const tables = filtered_slots.filter(item => {
      return item.table.TableID == valueTable;
    });
    setFiltered_tables(tables);
  }, [valueTable]);

  useEffect(() => {
    if (valueTime != null) {
      const table = filtered_tables.filter(item => {
        return item.slot.SlotID == valueTime;
      })[0];
      setPrice(table.slot.Price);
    }
  }, [valueTime]);

  slots.forEach(element => {
    const entry = new Object({
      value: element.slot.StartDate,
      label: element.slot.StartDate
    });
    if (!seenDates.includes(element.slot.StartDate)) {
      dates.push(entry);
      seenDates.push(element.slot.StartDate);
    }
  });

  filtered_slots.forEach(element => {
    const entry = new Object({
      value: element.table.TableID,
      label: element.table.Alias
    });
    if (!seenTables.includes(element.table.TableID)) {
      tables.push(entry);
      seenTables.push(element.table.TableID);
    }
  });

  filtered_tables.forEach(element => {
    times.push({
      value: element.slot.SlotID,
      label: element.slot.StartTime + " - " + element.slot.EndTime
    });
  });

  return (
    <SafeAreaView backgroundColor="black">
      <ScrollView backgroundColor="white" height={"90%"}>
        <StatusBar style="light" />
        <ImageBackground
          style={styles.headerImage}
          source={{ uri: "data:image/png;base64," + item.Image1 }}
        >
          <View style={styles.header}>
            <Icon
              name="arrow-back-ios"
              size={28}
              color={COLORS.white}
              onPress={navigation.goBack}
            />
          </View>
        </ImageBackground>
        <View style={{ zIndex: 2 }}>
          <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
            <Text
              style={{ fontSize: 34, fontWeight: "bold", color: COLORS.black }}
            >
              {item.Name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: COLORS.darkgrey,
                marginTop: 5
              }}
            >
              {item.Address1}, {item.Address2}, {item.PostCode}
            </Text>
          </View>
          <View style={{ marginTop: 15, paddingHorizontal: 20 }}>
            <DropDownPicker
              open={openDate}
              value={valueDate}
              items={dates}
              setOpen={setOpenDate}
              setValue={setValueDate}
              setItems={setItemsDate}
              zIndex={4}
              zIndexInverse={1000}
              containerStyle={{ marginBottom: 20 }}
              onChangeItem={item => setValue(item.value)}
              placeholder={"Pick a Date"}
            />
            <DropDownPicker
              open={openTable}
              value={valueTable}
              items={tables}
              setOpen={setOpenTable}
              setValue={setValueTable}
              setItems={setItemsTable}
              zIndex={3}
              zIndexInverse={2000}
              containerStyle={{ marginBottom: 20 }}
              onChangeItem={item1 => setValue(item1.value)}
              placeholder={"Choose a Table"}
            />
            <DropDownPicker
              open={openTime}
              value={valueTime}
              items={times}
              setOpen={setOpenTime}
              setValue={setValueTime}
              setItems={setItemsTime}
              zIndex={2}
              zIndexInverse={1000}
              containerStyle={{ marginBottom: 40 }}
              onChangeItem={item1 => setValue(item1.value)}
              placeholder={"Choose a Time"}
            />
            <View style={styles.price}>
              <Text style={styles.priceText}>
                Total: £{price != null ? price : " -"}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{ zIndex: 1 }}
          activeOpacity={0}
          onPress={() => {
            makeBooking(valueTime).then(response => {
              if (response) {
                navigation.navigate("ConfirmedScreen", item);
              } else {
                // display error
              }
            });
          }}
        >
          <View style={styles.button}>
            <Text
              style={{
                color: COLORS.white,
                fontSize: 18,
                fontWeight: "bold"
              }}
            >
              Book Now
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MakeBookingScreen;

const styles = StyleSheet.create({
  headerImage: {
    height: 200,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: "hidden"
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between"
  },
  button: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
    zIndex: 1
  },
  price: {
    alignItems: "center",
    padding: 30
  },
  priceText: {
    fontSize: 25,
    fontWeight: "bold"
  }
});
