import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { Home, Plus, Settings, Filter } from 'lucide-react-native';
import { Dish, Course } from './types';

interface HomeScreenProps {
    dishes: Dish[];
    onNavigateToAdd: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ dishes, onNavigateToAdd }) => {
    const getCourseColor = (course: Course): string => {
        switch (course) {
            case 'Appetizer':
                return '#D4F4DD';
            case 'Main Course':
                return '#E3EFFF';
            case 'Dessert':
                return '#FFE4F4';
            default:
                return '#F5F5F5';
        }
    };

    const getCourseTextColor = (course: Course): string => {
        switch (course) {
            case 'Appetizer':
                return '#00A651';
            case 'Main Course':
                return '#2563EB';
            case 'Dessert':
                return '#EC4899';
            default:
                return '#666';
        }
    };

    const calculateAvgPrice = (): number => {
        if (dishes.length === 0) return 0;
        const total = dishes.reduce((sum, dish) => sum + dish.price, 0);
        return total / dishes.length;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Menu</Text>

            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>Total Items</Text>
                    <Text style={styles.statValue}>{dishes.length}</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>Avg Price</Text>
                    <Text style={styles.statValue}>
                        R{calculateAvgPrice().toFixed(2)}
                    </Text>
                </View>
            </View>

            <ScrollView style={styles.dishList}>
                {dishes.map((dish) => (
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
                                {dish.course}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.addButton} onPress={onNavigateToAdd}>
                <Plus color="#fff" size={20} />
                <Text style={styles.addButtonText}>Add New Dish</Text>
            </TouchableOpacity>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItemActive}>
                    <Home color="#fff" size={20} />
                    <Text style={styles.navLabelActive}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateToAdd}>
                    <Plus color="#6B7280" size={20} />
                    <Text style={styles.navLabel}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Settings color="#6B7280" size={20} />
                    <Text style={styles.navLabel}>Manage</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Filter color="#6B7280" size={20} />
                    <Text style={styles.navLabel}>Filter</Text>
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
    statsContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    statLabel: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 8,
    },
    statValue: {
        fontSize: 28,
        fontWeight: '600',
        color: '#111827',
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
    addButton: {
        backgroundColor: '#000',
        margin: 16,
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
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

export default HomeScreen;