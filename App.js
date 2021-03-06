/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import './src/libraries/ignoreWarning'
import React, { useState, useEffect } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/components/Home';
import Splash from './src/components/Splash';
import ViewBook from './src/tabs/ViewBook';
import ViewCategory from './src/tabs/ViewCategory';
import Login from './src/components/Login';
import Register from './src/components/Register';
import Profile from './src/components/Profile';

import { Provider } from 'react-redux';
import store from './src/redux/store/store';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios'
import ViewBookOffline from './src/tabs/ViewBookOffline';
import Help from './src/components/Help';
import TermsConditions from './src/components/TermsConditions';

const MainStack = createNativeStackNavigator();

LogBox.ignoreLogs([
  'Remote debugger is in a background tab which may cause apps to perform slowly',
  'Require cycle: node_modules/rn-fetch-blob/index.js',
  'Require cycle: node_modules/react-native/Libraries/Network/fetch.js'
]);

LogBox.ignoreAllLogs()

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [splashloader, setsplashloader] = useState(true);

  // const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      setsplashloader(false)
    }, 4000)
  }, [])

  return (
      <Provider store={store}>
        <NavigationContainer>
          <MainStack.Navigator>
            <MainStack.Screen name='Home' component={splashloader? Splash : Home} options={{headerShown: false}} />
            <MainStack.Screen name='ViewBook' component={ViewBook} options={{headerShown: false}} />
            <MainStack.Screen name='ViewCategory' component={ViewCategory} options={{headerShown: false}} />
            <MainStack.Screen name='Login' component={Login} options={{headerShown: false}} />
            <MainStack.Screen name='Register' component={Register} options={{headerShown: false}} />
            <MainStack.Screen name='Profile' component={Profile} options={{headerShown: false}} />
            <MainStack.Screen name='ViewBookOffline' component={ViewBookOffline} options={{headerShown: false}} />
            <MainStack.Screen name='Help' component={Help} options={{headerShown: false}} />
            <MainStack.Screen name='TermsConditions' component={TermsConditions} options={{headerShown: false}} />
          </MainStack.Navigator>
        </NavigationContainer>
      </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  mainView:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  }
});

export default App;
