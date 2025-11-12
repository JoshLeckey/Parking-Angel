import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, FlatList, Text, Keyboard, Animated } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DraggableBar from "./misc_components/DraggableBarComponent"; // Make sure this path is correct

const SearchComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);


    //TODO: Hookup to Mapbox api for dataset
    const options = [
        { key: '1', label: 'Some street' },
        { key: '2', label: 'New street' },
        // Add more options here
    ];

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredOptions([]);
        } else {
            const filtered = options.filter(option => option.label.toLowerCase().includes(searchQuery.toLowerCase()));
            setFilteredOptions(filtered);
        }
    }, [searchQuery]);

    const handleSelectOption = (key) => {
        const selectedOption = options.find(option => option.key === key);
        setSearchQuery(selectedOption.label);
        setIsFocused(false);
        Keyboard.dismiss(); // Close the keyboard after selection
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => handleSelectOption(item.key)}
        >
            <Text style={styles.itemText}>{item.label}</Text>
        </TouchableOpacity>
    );

    const initialHeight = 200;
    const lastHeight = useRef(initialHeight);
    const containerHeight = useRef(new Animated.Value(initialHeight)).current;
    const scalingFactor = 0.1; // Adjust this value to control the scaling sensitivity for dragging
    const handleDrag = (dy) => {
        // Use the scaling factor to adjust the rate of height change
        let change = dy * scalingFactor;
        
        // Calculate the new height considering the adjusted change
        let newHeight = Math.max(100, Math.min(400, lastHeight.current + change));
        containerHeight.setValue(newHeight);
        
        // Update the lastHeight for the next drag operation
        lastHeight.current = newHeight;
    };

    return (
        <Animated.View style={[styles.container, { height: containerHeight }]}>
            <View style={styles.searchBar}>
                <Ionicons name="search" size={20} color="grey" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search here..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {searchQuery.length > 0 && (
                    <Ionicons
                        name="close-circle"
                        size={20}
                        color="grey"
                        onPress={() => setSearchQuery('')}
                    />
                )}
            </View>
            {isFocused && filteredOptions.length > 0 && (
                <FlatList
                    style={styles.searchResults}
                    data={filteredOptions}
                    renderItem={renderItem}
                    keyExtractor={item => item.key}
                />
            )}
            <View style={styles.draggableContainer}>
                <DraggableBar onDrag={handleDrag} />
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 10,
        marginTop: 10,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
    },
    searchResults: {
        // Adjustments can be made based on new layout needs
    },
    item: {
        backgroundColor: '#fff',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemText: {
        color: '#333',
    },
    draggableContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default SearchComponent;
