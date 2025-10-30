import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { Home, Plus, Settings, Filter } from 'lucide-react-native';
import { Dish, Course } from './types';

interface FilterScreenProps {
    dishes: Dish[];
    onNavigateToHome: () => void;
    onNavigateToAdd: () => void;
    onNavigateToManage: () => void;
}

const FilterScreen: React.FC<FilterScreenProps> = ({
    dishes,
    onNavigateToHome,
    onNavigateToAdd,
    onNavigateToManage,
}) => {
    const [selectedFilter, setSelectedFilter] = useState<Course | 'All'>('All');

    const getCourseColor = (course: Course): string => {
        switch (course) {
            case 'Starter':
                return '#D4F4DD';
            case 'Main':
                return '#E3EFFF';
            case 'Dessert':
                return '#FFE4F4';
            default:
                return '#F5F5F5';
        }
    };

    const getCourseTextColor = (course: Course): string => {
        switch (course) {
            case 'Starter':
                return '#00A651';
            case 'Main':
                return '#2563EB';
            case 'Dessert':
                return '#EC4899';
            default:
                return '#666';
        }
    };

    const getFilteredDishes = (): Dish[] => {
        if (selectedFilter === 'All') {
            return dishes;
        }
        return dishes.filter(dish => dish.course === selectedFilter);
    };

    const getCountByCategory = (category: Course | 'All'): number => {
        if (category === 'All') {
            return dishes.length;
        }
        return dishes.filter(dish => dish.course === category).length;
    };

    const filteredDishes = getFilteredDishes();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Filter Menu</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
                <TouchableOpacity
                    style={[
                        styles.filterChip,
                        selectedFilter === 'All' && styles.filterChipActive,
                    ]}
                    onPress={() => setSelectedFilter('All')}>
                    <Text
                        style={[
                            styles.filterText,
                            selectedFilter === 'All' && styles.filterTextActive,
                        ]}>
                        All ({getCountByCategory('All')})
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.filterChip,
                        selectedFilter === 'Starter' && styles.filterChipActive,
                    ]}
                    onPress={() => setSelectedFilter('Starter')}>
                    <Text
                        style={[
                            styles.filterText,
                            selectedFilter === 'Starter' && styles.filterTextActive,
                        ]}>
                        Apps ({getCountByCategory('Starter')})
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.filterChip,
                        selectedFilter === 'Main' && styles.filterChipActive,
                    ]}
                    onPress={() => setSelectedFilter('Main')}>
                    <Text
                        style={[
                            styles.filterText,
                            selectedFilter === 'Main' && styles.filterTextActive,
                        ]}>
                        Mains ({getCountByCategory('Main')})
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.filterChip,
                        selectedFilter === 'Dessert' && styles.filterChipActive,
                    ]}
                    onPress={() => setSelectedFilter('Dessert')}>
                    <Text
                        style={[
                            styles.filterText,
                            selectedFilter === 'Dessert' && styles.filterTextActive,
                        ]}>
                        Desserts ({getCountByCategory('Dessert')})
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            <ScrollView style={styles.dishList}>
                {filteredDishes.map((dish) => (
                    <View key={dish.id} style={styles.dishCard}>
                        <View style={styles.dishHeader}>
                            <Text style={styles.dishName}>{dish.name}</Text>
                            <Text style={styles.dishPrice}>R{dish.price.toFixed(2)}</Text>
                        </View>
                        <Text style={styles.dishDescription}>{dish.description}</Text>
                        <View
                            style={[
                                styles.courseBadge,
                                { backgroundColor: getCourseColor(dish.course) },
                            ]}>
                            <Text
                                style={[
                                    styles.courseText,
                                    { color: getCourseTextColor(dish.course) },
                                ]}>
                                {dish.course === 'Starter' ? 'Appetizer' : dish.course === 'Main' ? 'Main Course' : dish.course}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateToHome}>
                    <Home color="#6B7280" size={20} />
                    <Text style={styles.navLabel}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateToAdd}>
                    <Plus color="#6B7280" size={20} />
                    <Text style={styles.navLabel}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateToManage}>
                    <Settings color="#6B7280" size={20} />
                    <Text style={styles.navLabel}>Manage</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItemActive}>
                    <Filter color="#fff" size={20} />
                    <Text style={styles.navLabelActive}>Filter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        fontSize: 24,
        fontWeight: '600',
        padding: 20,
        backgroundColor: '#fff',
    },
    filterContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        maxHeight: 56,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        marginRight: 8,
        height: 32,
        justifyContent: 'center',
    },
    filterChipActive: {
        backgroundColor: '#000',
    },
    filterText: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '500',
    },
    filterTextActive: {
        color: '#fff',
    },
    dishList: {
        flex: 1,
        padding: 16,
    },
    dishCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    dishHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    dishName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    dishPrice: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    dishDescription: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 12,
    },
    courseBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    courseText: {
        fontSize: 13,
        fontWeight: '500',
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingBottom: 8,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        gap: 4,
    },
    navItemActive: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: '#000',
        gap: 4,
    },
    navLabel: {
        fontSize: 12,
        color: '#6B7280',
    },
    navLabelActive: {
        fontSize: 12,
        color: '#fff',
    },
});

export default FilterScreen;