import { router } from "expo-router";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, FlatList, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import backButtonImage from '../assets/back.png';
import category from '../assets/electronic-device.png';
import { ScrollView } from "react-native";

export default function CategoryFour() {
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.replace("/account/Home")}>
                  <View style={styles.imagecontainer}>
                    <Image source={backButtonImage} style={styles.backButtonImage} />
                    </View>
                </TouchableOpacity>
                <Image source={category} style={styles.profileImage} />
            </View>

            <View style={styles.bottomContainer}>
                <ScrollView>
                        <View style={styles.productContainer}>
                        </View>
                </ScrollView>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 2,
        borderWidth: 1,
        backgroundColor: "#F7F7F7",
        width: '100%',
        borderColor: "#CCCCCC",
        borderRadius: 10,
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        height: '8%',
        backgroundColor: '#F7F7F7',
        borderRadius: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 7,
    },
    bottomContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
        marginTop: '1%',
        padding: 10,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 0,
    },
    button: {
        backgroundColor: "#FF6347",
        padding: 10,
        alignItems: "center",
        marginTop: 10,
        borderRadius: 22,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    productsContainer: {
        flexDirection: "row",
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
    productContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 5,
        marginBottom: 20,
        width: "48%", // Adjust the width to leave space for margins
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    productName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 16,
        marginBottom: 5,
    },
    productImage: {
        width: "100%",
        height: 200,
        borderRadius: 8,
    },
    buttonImage: {
        width: 20,
        height: 20,
        marginLeft: 4,
        tintColor: "white",
    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    backButton: {
        padding: 10,
        borderRadius: 12,
        backgroundColor: "#F7F7F7",
    },
    backButtonImage: {
        width: 30,
        height: 30,
        tintColor: "black", // Change the color of the image if necessary
    },
    imagecontainer:{
        justifyContent:'center',
        alignSelf:'center', 
    },
    profileImage: {

        width: 50,
        height: 50,
        marginLeft: '38%',
        justifyContent:'center'
      },
});
