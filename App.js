/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SearchScreen from "./src/screens/Search.screen";

const App = () => {

  return (
    <View style={{
      margin: 5,
      flex: 1,
    }}>
      <SearchScreen />
    </View>
  );
};

export default App;
