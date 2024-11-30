import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import LoginLogo from '../assets/images/Login.png';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from "react-native-vector-icons/Entypo";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleLoginPress = () => {
    if (!email.endsWith('@gmail.com')) {
      setEmailError('Invalid Email address');
      return;
    } else {
      setEmailError('');
    }

    signIn(); // Call the signIn function
  };
  const handleForgetPasswordPress = () => {
    // Navigate to the ForgetPasswordScreen
    navigation.navigate('Forgot Password');
  };
  const auth = FIREBASE_AUTH;
  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Login Successful');
      
      // Only navigate if sign-in is successful
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );
    } catch (error) {
      console.log(error);
      alert('Sign in Failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const [secureEntery, setSecureEntery] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Hey,</Text>
        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.headingText}>Back</Text>
      </View>
      {/* form  */}
      <View style = {styles.formContainer}>
        <View style = {styles.inputContainer}>
          <Entypo name={"mail"} size ={30} color='#c23a22'/>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor='black'
            keyboardType="email-address"
            onChangeText={(text) => {
              setEmail(text);
              setEmailError(''); // Clear the error when the user starts typing again
            }}
            value={email}
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <View style = {styles.inputContainer}>
          <Entypo name={"lock"} size ={30} color='#c23a22'/>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor='black'
            secureTextEntry={secureEntery}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntery((prev) => !prev);
            }}
          >
            <SimpleLineIcons name={"eye"} size={20} color='#c23a22' />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleForgetPasswordPress}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLoginPress} style={styles.loginButtonWrapper}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.continueText}>or continue with</Text>
        <TouchableOpacity style={styles.googleButtonContainer}>
          <Image
            source={require("../assets/images/google.png")}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>   
      <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
  formContainer:{
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#c23a22',
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical:5,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
  },
  forgotPasswordText: {
    textAlign: "right",
    color: "black",
    fontFamily: 'Poppins-SemiBold',
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: '#c23a22',
    borderRadius: 100,
    marginTop: 20,
  },
  loginText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    textAlign: "center",
    padding: 10,
  },
  continueText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: '#c23a22',
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  signupText: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
  },
errorText: {
  color: 'red',
  fontSize:16,
  marginBottom: 10,
},
logo:{
  width: 400,
  height: 400,
  marginTop: 25,
  marginBottom: 10,
  alignContent:'center',
},
});

export default LoginScreen;