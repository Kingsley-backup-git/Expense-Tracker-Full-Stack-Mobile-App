import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import SiginInImage from "../../assets/images/revenue-i4.png";
import { styles } from "../../styles/auth.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/color";

// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
const [error, setError] = useState("")

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
             setError("")
        router.replace("/");
      } else {
      
throw new Error("An error occured")
      }
    } catch (err:any) {
 
      if (err?.errors[0]?.code === "form_password_incorrect") {
        setError("Incorrect Password")
      } else if (err?.errors[0]?.code === "form_identifier_not_found") {
         setError("Account not found")
      } else {
        setError("An error occured")
      }
    
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor : "#FFF8F3" }}
      >
          
          <SafeAreaView style={{ flex: 1 }}>
              
           
      <ScrollView
        contentContainerStyle={{ flexGrow: 1}}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1" style={[styles.container]}>
          <Image
            source={SiginInImage}
            alt="revnueImage"
            className=""
            style={[styles.illustration, { marginHorizontal: "auto" }]}
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome Back</Text>
  {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")} >
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}
          <TextInput
            style={[styles.input]}
            autoCapitalize="none"
              value={emailAddress}
              inputMode="email"
            placeholder="Enter email"
            placeholderTextColor="#9A8478"
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />

          <TextInput
            style={[styles.input]}
            value={password}
            placeholder="Enter password"
            placeholderTextColor="#9A8478"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />

          <TouchableOpacity style={styles.button} onPress={onSignInPress}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don&apos;t have an account?</Text>

            <Link href="/sign-up" asChild>
              <TouchableOpacity>
                <Text style={styles.linkText}>Sign up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
              </ScrollView>
                 </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
