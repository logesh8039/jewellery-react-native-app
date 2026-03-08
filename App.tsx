import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import AppStack from './src/StackScreens/AppStack';
import GuestStack from './src/StackScreens/GuestStack';

LogBox.ignoreLogs(['Warning: ...']);

const AppContent = () => {
  const { loggedInUser, authLoading } = useAuth();
  const isDarkMode = useColorScheme() === 'dark';

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission enabled');
    }
  };

  const getToken = async () => {
    try {
      const fcmToken = await messaging().getToken();

      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
      }
    } catch (error) {
      console.log('Token Error', error);
    }
  };

  const requestAndroidPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  };

  useEffect(() => {
    Promise.all([
      requestUserPermission(),
      requestAndroidPermission(),
      getToken(),
    ]);
  }, []);

  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#000' : '#f0f0f0'}
      />

      {loggedInUser ? <AppStack /> : <GuestStack />}
    </NavigationContainer>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Provider>
  );
}

export default App;
