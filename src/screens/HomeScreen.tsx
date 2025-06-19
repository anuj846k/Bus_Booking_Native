import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { UserCircleIcon } from 'react-native-heroicons/solid';
import { Colors } from '../utils/Constants';
import { logout } from '../service/requests/auth';
import Bookings from '../components/home/Bookings';

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-white ">
      <SafeAreaView />
      <View className=" mt-10 flex-row items-center justify-between px-4 py-2">
        <Text className="font-okra font-bold text-3xl ">Bus Tickets</Text>
        <UserCircleIcon size={30} color={Colors.primary} onPress={logout} />
      </View>
      <Bookings />
    </View>
  );
};

export default HomeScreen;
