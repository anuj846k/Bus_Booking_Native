import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useMutation } from '@tanstack/react-query';
import { loginWithGoogle } from '../service/requests/auth';
import { resetAndNavigate } from '../utils/NavigationUtils';

GoogleSignin.configure({
  webClientId:
    '369017729802-9rl359dv5boiqna8tio7522d341j4jvs.apps.googleusercontent.com',
});

const LoginScreen = () => {
  const [phone, setPhone] = useState('');

  const loginMutation = useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: () => {
      resetAndNavigate('HomeScreen');
    },
    onError: error => {
      console.log('Login failed', error);
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      loginMutation.mutate(response?.data?.idToken as string);
    } catch (error) {
      console.error('Error in handleGoogleSignIn', error);
    }
  };
  return (
    <View>
      <Image
        source={require('../assets/images/cover.jpeg')}
        className="w-full h-64 bg-cover bg-center"
      />
      <View className="p-4">
        <Text className="font-okra font-semibold text-xl text-center">
          Create Account or Sign in
        </Text>

        <View className="my-4 mt-12 border-1 border gap-2 border-black px-2 flex-row items-center">
          <Text className="font-okra w-[10%] font-bold text-base">+91</Text>
          <TextInput
            className="font-okra w-[90%] font-bold text-base"
            value={phone}
            maxLength={10}
            keyboardType="number-pad"
            placeholder="Enter your phone number"
            onChangeText={setPhone}
          />
        </View>

        <TouchableOpacity
          onPress={handleGoogleSignIn}
          className=" rounded-md bg-tertiary justify-center items-center p-3 text-white"
        >
          <Text className="text-white font-okra font-semibold">Let's Go</Text>
        </TouchableOpacity>

        <Text className="text-center my-8 text-sm font-okra text-gray-700">
          -------- OR --------
        </Text>
        <View className="flex items-center justify-center flex-row gap-4">
          <TouchableOpacity
            onPress={handleGoogleSignIn}
            className="border-1 border border-gray-300 p-2 rounded-full"
          >
            <Image
              source={require('../assets/images/google.png')}
              className="w-5 h-5 contain-size"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            className="border-1 border border-gray-300 p-2 rounded-full"
          >
            <Image
              source={require('../assets/images/apple.png')}
              className="w-5 h-5 contain-size"
            />
          </TouchableOpacity>
        </View>
        <Text className="text-sm font-okra text-gray-700 w-72 text-center font-medium mt-10 self-center">
          By Signing up you agree to our{' '}
          <Text className="text-primary ">Terms of Service</Text> and{' '}
          <Text className="text-primary">Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
