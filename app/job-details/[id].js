import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";

import { COLORS, icons, SIZES } from "../../constants";

import useFetch from "../../hook/useFetch";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [refreshing, onRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { data, isLoading, error, refetch } = useFetch("job-details", {
    job_id: params.id,
  });

  const onRefresh = () => {};

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.lightWhite, flex: 1 }}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              dimension="60%"
              iconUrl={icons.left}
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              dimension="60%"
              iconUrl={icons.share}
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                companyName={data[0].employer_name}
                location={data[0].job_country}
                jobTitle={data[0].job_title}
              />

              <JobTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={tabs}
              />
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
