export type Course = 'Appetizer' | 'Main Course' | 'Dessert';

export interface Dish {
    id: string;
    name: string;
    description: string;
    course: Course;
    price: number;
}

export type RootStackParamList = {
    Home: undefined;
    AddDish: undefined;
};