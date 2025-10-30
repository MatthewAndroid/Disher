import React, { JSX, useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import HomeScreen from './HomeScreen';
import AddDishScreen from './AddDishScreen';
import ManageScreen from './ManageScreen';
import FilterScreen from './FilterScreen';
import { Dish } from './types';

type Screen = 'Home' | 'AddDish' | 'Manage' | 'EditDish' | 'Filter';

const App = (): JSX.Element => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Home');
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);

  const handleSaveDish = (dish: Dish) => {
    if (editingDish) {
      // Update existing dish
      setDishes(dishes.map(d => d.id === dish.id ? dish : d));
      setEditingDish(null);
    } else {
      // Add new dish
      setDishes([...dishes, dish]);
    }
    setCurrentScreen('Manage');
  };

  const handleCancelAddEdit = () => {
    setEditingDish(null);
    if (editingDish) {
      setCurrentScreen('Manage');
    } else {
      setCurrentScreen('Home');
    }
  };

  const handleNavigateToAdd = () => {
    setEditingDish(null);
    setCurrentScreen('AddDish');
  };

  const handleNavigateToManage = () => {
    setCurrentScreen('Manage');
  };

  const handleNavigateToFilter = () => {
    setCurrentScreen('Filter');
  };

  const handleNavigateToHome = () => {
    setCurrentScreen('Home');
  };

  const handleEdit = (dish: Dish) => {
    setEditingDish(dish);
    setCurrentScreen('EditDish');
  };

  const handleDelete = (dishId: string) => {
    setDishes(dishes.filter(d => d.id !== dishId));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {currentScreen === 'Home' ? (
        <HomeScreen 
          dishes={dishes} 
          onNavigateToAdd={handleNavigateToAdd}
          onNavigateToManage={handleNavigateToManage}
          onNavigateToFilter={handleNavigateToFilter}
        />
      ) : currentScreen === 'Manage' ? (
        <ManageScreen
          dishes={dishes}
          onBack={handleNavigateToHome}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddNew={handleNavigateToAdd}
          onNavigateToHome={handleNavigateToHome}
          onNavigateToFilter={handleNavigateToFilter}
        />
      ) : currentScreen === 'Filter' ? (
        <FilterScreen
          dishes={dishes}
          onNavigateToHome={handleNavigateToHome}
          onNavigateToAdd={handleNavigateToAdd}
          onNavigateToManage={handleNavigateToManage}
        />
      ) : (
        <AddDishScreen 
          onSave={handleSaveDish} 
          onCancel={handleCancelAddEdit}
          editingDish={editingDish}
          onNavigateToHome={handleNavigateToHome}
          onNavigateToManage={handleNavigateToManage}
          onNavigateToFilter={handleNavigateToFilter}
        />
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