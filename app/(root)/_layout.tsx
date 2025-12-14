import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { Redirect, Stack } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
const HomeLayout = () => {
    const { isSignedIn,isLoaded } = useAuth()
     if (!isLoaded) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <AntDesign name="loading-3-quarters" size={24} color="black" />
           </View>
     )

    if (!isSignedIn) {
      return  <Redirect href={"/sign-in"}/>
    }
  return (
  <Stack screenOptions={{headerShown:false}}/>
  )
}

export default HomeLayout

const styles = StyleSheet.create({})