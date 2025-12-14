import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { StatusBar, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'

export default function AuthRoutesLayout() {
  const { isSignedIn,isLoaded } = useAuth()
     if (!isLoaded) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <AntDesign name="loading-3-quarters" size={24} color="black" />
           </View>
     )
  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

    return (
     
        <Stack screenOptions={{ headerShown: false }} />
    )
}