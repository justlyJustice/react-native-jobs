import React from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";

import styles from "./tabs.style";
import { SIZES } from "../../../constants";

const TabButton = ({ activeTab, name, onHandleSearchType }) => (
  <TouchableOpacity
    style={styles.btn(name, activeTab)}
    onPress={onHandleSearchType}
  >
    <Text style={styles.btnText(name, activeTab)}>{name}</Text>
  </TouchableOpacity>
);

const Tabs = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
        data={tabs}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TabButton
            activeTab={activeTab}
            name={item}
            onHandleSearchType={() => setActiveTab(item)}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Tabs;
