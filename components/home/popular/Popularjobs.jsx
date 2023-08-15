import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import PopularJobCard from "../../common/cards/popular/PopularJobCard";

import useFetch from "../../../hook/useFetch";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";

const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("search", {
    query: "React developer",
    num_pages: 1,
  });

  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Text>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            contentContainerStyle={{ columnGap: SIZES.medium }}
            data={data}
            horizontal
            keyExtractor={(item) => item?.job_id}
            renderItem={({ item }) => (
              <PopularJobCard
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
                item={item}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
