import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ChevronLeft, Home, Plus, Settings, Filter } from 'lucide-react-native';
import { Course, Dish } from './types';

interface AddDishScreenProps {
    onSave: (dish: Dish) => void;
    onCancel: () => void;
    editingDish?: Dish | null;
    onNavigateToHome: () => void;
    onNavigateToManage: () => void;
    onNavigateToFilter: () => void;
}

const AddDishScreen: React.FC<AddDishScreenProps> = ({ 
    onSave, 
    onCancel, 
    editingDish,
    onNavigateToHome,
    onNavigateToManage,
    onNavigateToFilter,
}) => {
    const [dishName, setDishName] = useState('');
    const [description, setDescription] = useState('');
    const [course, setCourse] = useState<Course | ''>('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (editingDish) {
            setDishName(editingDish.name);
            setDescription(editingDish.description);
            setCourse(editingDish.course);
            setPrice(editingDish.price.toString());
        } else {
            setDishName('');
            setDescription('');
            setCourse('');
            setPrice('');
        }
    }, [editingDish]);

    const handleSaveDish = () => {
        if (!dishName || !description || !course || !price) return;

        const dish: Dish = {
            id: editingDish ? editingDish.id : Date.now().toString(),
            name: dishName,
            description,
            course: course as Course,
            price: parseFloat(price),
        };

        onSave(dish);
    };

    return (
        <View style={styles.container}>
            <View style={styles.addHeader}>
                <TouchableOpacity onPress={onCancel}>
                    <ChevronLeft color="#000" size={24} />
                </TouchableOpacity>
                <Text style={styles.addHeaderTitle}>
                    {editingDish ? 'Edit Dish' : 'Add New Dish'}
                </Text>
            </View>

            <ScrollView style={styles.formContainer}>
                <Text style={styles.label}>Dish Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter dish name"
                    value={dishName}
                    onChangeText={setDishName}
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Describe the dish"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />

                <Text style={styles.label}>Course</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={course}
                        onValueChange={(itemValue) => setCourse(itemValue)}
                        style={styles.picker}>
                        <Picker.Item label="Select course type" value="" />
                        <Picker.Item label="Starter" value="Starter" />
                        <Picker.Item label="Main" value="Main" />
                        <Picker.Item label="Dessert" value="Dessert" />
                    </Picker>
                </View>

                <Text style={styles.label}>Price (R)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="0.00"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="decimal-pad"
                />

                <TouchableOpacity style={styles.saveButton} onPress={handleSaveDish}>
                    <Text style={styles.saveButtonText}>
                        {editingDish ? 'Update Dish' : 'Save Dish'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateToHome}>
                    <Home color="#6B7280" size={20} />
                    <Text style={styles.navLabel}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItemActive}>
                    <Plus color="#fff" size={20} />
                    <Text style={styles.navLabelActive}>
                        {editingDish ? 'Edit' : 'Add'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={onNavigateToManage}>
                    <Settings color="#6B7280" size={20} />
                    <Text style={styles.navLabel}>Manage</Text>
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
    addHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        gap: 16,
    },
    addHeaderTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    formContainer: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        backgroundColor: '#F3F4F6',
        padding: 16,
        borderRadius: 8,
        fontSize: 16,
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    pickerContainer: {
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        overflow: 'hidden',
    },
    picker: {
        backgroundColor: '#F3F4F6',
    },
    saveButton: {
        backgroundColor: '#000',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 32,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    cancelButton: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    cancelButtonText: {
        color: '#374151',
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

export default AddDishScreen;