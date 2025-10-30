import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { ChevronLeft, Home, Plus, Settings, Filter, SquarePen, Trash2 } from 'lucide-react-native';
import { Dish, Course } from './types';

interface ManageScreenProps {
    dishes: Dish[];
    onBack: () => void;
    onEdit: (dish: Dish) => void;
    onDelete: (dishId: string) => void;
    onAddNew: () => void;
    onNavigateToHome: () => void;
    onNavigateToFilter: () => void;
}

const ManageScreen: React.FC<ManageScreenProps> = ({
    dishes,
    onBack,
    onEdit,
    onDelete,
    onAddNew,
    onNavigateToHome,
    onNavigateToFilter,
}) => {
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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Manage Menu</Text>
            </View>

            <ScrollView style={styles.content}>
                {dishes.map((dish) => (
                    <View key={dish.id} style={styles.dishCard}>
                        <View style={styles.dishHeader}>
                            <Text style={styles.dishName}>{dish.name}</Text>
                            <Text style={styles.dishPrice}>R{dish.price.toFixed(2)}</Text>
                        </View>

                        <Text style={styles.dishDescription}>{dish.description}</Text>

                        <View style={styles.dishFooter}>
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

                            <View style={styles.actionButtons}>
                                <TouchableOpacity
                                    style={styles.iconButton}
                                    onPress={() => onEdit(dish)}>
                                    <SquarePen color="#6B7280" size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.iconButton}
                                    onPress={() => onDelete(dish.id)}>
                                    <Trash2 color="#6B7280" size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.addButton} onPress={onAddNew}>
                <Plus color="#fff" size={20} />
                <Text style={styles.addButtonText}>Add New Dish</Text>
            </TouchableOpacity>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateToHome}>
                    <Home color="#6B7280" size={20} />
                    <Text style={styles.navLabel}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={onAddNew}>
                    <Plus color="#6B7280" size={20} />
                    <Text style={styles.navLabel}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItemActive}>
                    <Settings color="#fff" size={20} />
                    <Text style={styles.navLabelActive}>Manage</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateToFilter}>
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
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        gap: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    dishCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    dishHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    dishName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        flex: 1,
    },
    dishPrice: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    dishDescription: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 16,
        lineHeight: 20,
    },
    dishFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    courseBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    courseText: {
        fontSize: 12,
        fontWeight: '600',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#000',
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 16,
        borderRadius: 8,
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

export default ManageScreen;