import { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import { icons, SIZES } from "../../../constants";
import styles from "./welcome.style";

const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = () => {
  const [activeJobType, setActiveJobType] = useState("Full-time");
  const router = useRouter();

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Justice</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            onChange={() => {}}
            placeholder="What are you looking for?"
            value=""
            style={styles.searchInput}
          />
        </View>

        <TouchableOpacity onPress={() => {}} style={styles.searchBtn}>
          <Image
            resizeMode="contain"
            source={icons.search}
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          contentContainerStyle={{ columnGap: SIZES.small }}
          data={jobTypes}
          horizontal
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Welcome;
