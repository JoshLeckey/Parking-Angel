import React, { useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import data from './FAQData';
import Faq from './Faq';
import Icon from 'react-native-vector-icons/Ionicons';

const HelpSettingsComponent = ({ toggleScreen }) => {
const [subpage, setSubpage] = useState("help");


const onNavigateToHelp = (buttonName) => {
    setSubpage(buttonName);
}

if(subpage === "Terms"){
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onNavigateToHelp("help")}>
                    <Icon name="arrow-back" size={25} color="#000" />
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.headerText}>Terms & Conditions</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyText}>Professional Terms and conditions</Text>
            </View>
            <TouchableOpacity style={styles.helpButton} onPress={()=>onNavigateToHelp('help')}>
                <Text style={styles.helpButtonText}>Back</Text>
            </TouchableOpacity>
        </View>
    )
}


if(subpage === "Privacy"){
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onNavigateToHelp("help")}>
                    <Icon name="arrow-back" size={25} color="#000" />
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.headerText}>Privacy Policy</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyText}>Professional Privacy Policy</Text>
            </View>
        </View>
    )
}

if(subpage === "FAQ"){
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onNavigateToHelp("help")}>
                    <Icon name="arrow-back" size={25} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerText}>FAQ</Text>
            <Faq data={data} />
        </View>
    )
}

if(subpage === "help" || subpage === "" || subpage === null){


return(
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => toggleScreen('main')}>
                        <Icon name="arrow-back" size={25} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Help</Text>
        </View>
        <View style={styles.body}>
            <Text style={styles.bodyText}>If you need help, please contact us at parkingangelteam@gmail.com'</Text>
            <TouchableOpacity style={styles.helpButton} onPress={()=> Linking.openURL('mailto:parkingangelteam@gmail.com?subject=Help')}>
                <Text style={styles.helpButtonText}>Get Help Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.helpButton} onPress={()=>onNavigateToHelp('FAQ')}>
                <Text style={styles.helpButtonText}>FAQ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.helpButton} onPress={() => onNavigateToHelp('Terms')}>
                <Text style={styles.helpButtonText}>Terms & Conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.helpButton} onPress={() => onNavigateToHelp('Privacy')}>
                <Text style={styles.helpButtonText}>Privacy Policy</Text>
            </TouchableOpacity>
        </View>
    </View>

)
}
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        backgroundColor: "#f8f8f8",
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyText: {
        fontSize: 24,
        backgroundColor: "#f0f0f0",
    },
    helpButton: {
        height: 80,
        borderColor: '#1E2028',
        borderWidth: 1,
        width: 200,
        marginTop: 15,
        marginBottom: 20,
        borderRadius: 20,
        backgroundColor: '#1E2028',
    },
    helpButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
    },
});

export default HelpSettingsComponent;