import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

import useFetch from "../../../hook/useFetch";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("search", {
    query: "Python developer",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
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
          data?.map((job) => (
            <NearbyJobCard
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
              job={job}
              key={`nearby-job-${job?.job_id}`}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
