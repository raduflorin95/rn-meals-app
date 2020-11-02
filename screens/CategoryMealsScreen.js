import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { CATEGORIES } from "../data/dummy-data";

import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";

const CategoryMealScreen = (props) => {
  const catId = props.navigation.getParam("categoryId");

  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) > -1
  );

  if (displayedMeals.length === 0 || !displayedMeals) {
    return (
      <View style={styles.warningContainer}>
        <DefaultText>
          No meals found, maybe check your filters?
        </DefaultText>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam("categoryId");

  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  warningContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryMealScreen;
