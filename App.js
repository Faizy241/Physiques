import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import CarModel from './CarModel';
import Route from './Test1';
import Destination from './Destination';
import HomeMine from './HomeMine';
import Slider from './SliderScreen';
import Excel from './Excel';





export default function App() {
  return (
    <GestureHandlerRootView>
      <Excel/>
    </GestureHandlerRootView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
