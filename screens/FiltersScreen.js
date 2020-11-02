import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import FiltersSwitch from "../components/FiltersSwitch";

import { setFilters } from "../store/actions/meals";

const FiltersScreen = (props) => {
  const { navigation } = props;

  const [isGlutenFree, setGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };

    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters, dispatch]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FiltersSwitch
        label="Gluten-free"
        checked={isGlutenFree}
        onValueChange={(newValue) => setGlutenFree(newValue)}
      />
      <FiltersSwitch
        label="Lacatose-free"
        checked={isLactoseFree}
        onValueChange={(newValue) => setIsLactoseFree(newValue)}
      />
      <FiltersSwitch
        label="Vegan"
        checked={isVegan}
        onValueChange={(newValue) => setIsVegan(newValue)}
      />
      <FiltersSwitch
        label="Vegetarian"
        checked={isVegetarian}
        onValueChange={(newValue) => setIsVegetarian(newValue)}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Filter Meals",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        ></Item>
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={navigationData.navigation.getParam("save")}
        ></Item>
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
});

export default FiltersScreen;
