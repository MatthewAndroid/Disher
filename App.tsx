import React, {JSX, useState} from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import HomeScreen from './HomeScreen';
import AddDishScreen from './AddDishScreen';
import { Dish } from './types';

type Screen = 'Home' | 'AddDish';

const App = (): JSX.Element => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Home');
  const [dishes, setDishes] = useState<Dish[]>([]);

  const handleSaveDish = (dish: Dish) => {
    setDishes([...dishes, dish]);
    setCurrentScreen('Home');
  };

  const handleCancel = () => {
    setCurrentScreen('Home');
  };

  const handleNavigateToAdd = () => {
    setCurrentScreen('AddDish');
  };

  return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        {currentScreen === 'Home' ? (
            <HomeScreen dishes={dishes} onNavigateToAdd={handleNavigateToAdd} />
        ) : (
            <AddDishScreen/>
        )}
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;