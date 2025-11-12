import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, FlatList, Text, Keyboard } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const DetailsComponent = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    const options = [
        { key: '1', label: 'Some street' },
        { key: '2', label: 'New street' },
        // Add more options here
    ];

    useEffect(() => {
        if (searchQuery === '') {
            ([]);
        } else {
            const filtered = options.filter(option => option.label.toLowerCase().includes(searchQuery.toLowerCase()));
            setFilteredOptions(filtered);
        }
    }, [searchQuery]);

    const handleSelectOption = (key) => {
        const selectedOption = options.find(option => option.key === key);
        setSearchQuery(selectedOption.label);
        setIsFocused(false);
        Keyboard.dismiss();
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => handleSelectOption(item.key)}
        >
            <Text style={styles.itemText}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <Ionicons name="search" size={20} color="grey" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search here...2"
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        padding: 10,
        margin: 10,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
    },
    searchResults: {
        maxHeight: 200,
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
    mapPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
        marginTop: 10,
    },
});

export default DetailsComponent;
