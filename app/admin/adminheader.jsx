import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, firestore,db } from "../../firebase/Config";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
export default function AdminHeader() {
  const [name, setName] = useState("");
    
  const  fetchUserData =async()=>{
    const docRef = doc(db,"users",auth.currentUser.uid);
    const docSnap= await getDoc(docRef);
     if (auth.currentUser && auth.currentUser.uid){
    if(docSnap.exists())
      {
        console.log("Document Data: ",docSnap.data());
        const data=docSnap.data();
        setName(data.userName);
       
      }
      else
      {
        console.log("No Such Document!");
      }
    }
  }
  useEffect(() => {
    fetchUserData();
  }, []);
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('@user_id');
              await auth.signOut();
              router.replace("/account/login");
              console.log("User logged out");
            } catch (error) {
              console.error("Error logging out:", error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.topcontainer}>
      <View>
        <Image source={require('../../assets/download.png')} style={styles.profileImage} />
      </View>

      <View style={{ marginLeft: '18%' }}>
      <Text style={styles.username}>{name}</Text>
        <Text style={styles.welcomeText}>Welcome,</Text>
      </View>

      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={() => router.replace("/account/addpro")} style={styles.navButton}>
          <Image source={require('../../assets/add.png')} style={styles.icon} />
          <Text style={{ fontSize: 17, color: 'black' }}>Add Product</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace("/account/adminprofile")} style={styles.navButton}>
          <Image source={require('../../assets/user.png')} style={styles.icon} />
          <Text style={{ fontSize: 17, color: 'black' }}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.navButton}>
          <Text style={{ fontSize: 17, fontWeight: '700', color: 'maroon' }}>Logout</Text>
          <Image source={require('../../assets/logout_icon.png')} style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topcontainer: {
    width: '100%',
    height: '8%',
    backgroundColor: '#404040', // Metallic color with opacity
    borderRadius: 12,
    paddingVertical: 8,
    marginBottom: '2%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  profileImage: {
    marginTop: 10,
    marginBottom: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    marginLeft: 15,
    marginRight: 430,
    borderColor: '#102C57', // Dark blue border color
  },
  username: {
    fontWeight: 'bold',
    fontSize: 30,
    marginRight: 190,
    marginTop: -70,
    color: 'white', // Dark blue text color
  },
  welcomeText: {
    fontSize: 18,
    marginRight: 200,
    marginTop: -55,
    color: 'white', // Dark gray text color
  },
  navigationBar: {
    marginLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: '2%',
    width: "90%",
    backgroundColor: 'lightgrey',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 40,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'lightgrey',
    margin: 1,
    borderRadius: 24,
  },
  logoutIcon: {
    width: 20,
    height: 20,
    marginLeft: 7,
    marginTop: 2,
    tintColor: "maroon",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 4,
    marginTop: 1,
    tintColor: "black",
  },
});
