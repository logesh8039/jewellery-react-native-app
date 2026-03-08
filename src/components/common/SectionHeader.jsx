import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SectionHeader = ({ title, onPressSeeAll }) => {
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>

            {onPressSeeAll && (
                <TouchableOpacity onPress={onPressSeeAll}>
                    <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default SectionHeader;

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingRight: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    seeAll: {
        fontSize: 15,
        color: '#ff7842',
        fontWeight: 'bold',
    },
});