import { View, Text, Alert, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { useStateForPath } from '@react-navigation/native';
import { navigate } from '../../utils/NavigationUtils';
import LinearGradient from 'react-native-linear-gradient';
import { CalendarDaysIcon } from 'react-native-heroicons/outline';
import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/solid';
import DatePickerModal from '../ui/DatePickerModal';

const Search = () => {
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [locationType, setLocationType] = useState<'from' | 'to'>('from');

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  const handleLocationSet = (location: string, type: 'from' | 'to') => {
    if (type === 'from') {
      setFrom(location);
      if (to === location) {
        setTo(null);
      }
    } else {
      setTo(location);
    }
  };

  const handleSearchBuses = async () => {
    if (!from || !to) {
      Alert.alert(
        'Missing Information',
        'Please select both departure and destination locations',
      );
      return;
    }

    if (from === to) {
      Alert.alert(
        'Invalid Search',
        'Departure and destination cannot be the same',
      );
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      Alert.alert(
        'Invalid Date',
        'Please select a future date for your journey',
      );
      return;
    }

    navigate('BusListScreen', { item: { from, to, date } });
  };
  return (
    <View className="rounded-b-3xl overflow-hidden ">
      <LinearGradient
        colors={['#78B0E6', '#fff']}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <View className="p-4">
          <View className="my-4 border border-1 z-20 bg-white rounded-md border-gray-600">
            <TouchableOpacity
              className="p-4 items-center flex-row gap-4"
              onPress={() => {
                setLocationType('from');
                setShowLocationPicker(true);
              }}
            >
              <Image
                source={require('../../assets/images/bus.png')}
                className="w-6 h-6"
              />
              <Text className="w-[90%] text-lg font-okra text-gray-700">
                {from || 'From'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-4 items-center flex-row gap-4 border-t-[1px] border-b-[1px] border-gray-600"
              onPress={() => {
                setLocationType('to');
                setShowLocationPicker(true);
              }}
            >
              <Image
                source={require('../../assets/images/bus.png')}
                className="w-6 h-6"
              />
              <Text className="w-[90%] text-lg font-okra text-gray-700">
                {to || 'To'}
              </Text>
            </TouchableOpacity>

            <View className="flex-row items-center p-2 justify-between">
              <View className="flex-row items-center">
                <TouchableOpacity
                  className="p-2 mr-2 rounded-lg  bg-secondary"
                  onPress={() => setDate(new Date())}
                >
                  <Text className="text-sm font-okra font-bold">Today</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="p-2 rounded-lg  bg-secondary"
                  onPress={() => {
                    const tommorow = new Date();
                    tommorow.setDate(tommorow.getDate() + 1);
                    setDate(tommorow);
                  }}
                >
                  <Text className="text-sm font-okra font-bold">Tommorow</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => {
                  setShowDatePicker(true);
                }}
              >
                <View className="mr-2">
                  <Text className="text-sm font-normal font-okra text-gray-500">
                    Date of Journey
                  </Text>
                  <Text className="text-md font-bold font-okra text-gray-900">
                    {date?.toDateString()}
                  </Text>
                </View>
                <CalendarDaysIcon size={25} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSearchBuses}
            className="bg-tertiary p-3 rounded-xl my-2 items-center flex-row justify-center "
          >
            <MagnifyingGlassIcon size={22} color={'#fff'} />
            <Text className="text-lg font-okra text-white ml-3">
              Search Buses
            </Text>
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/sidebus.jpg')}
            className="w-full h-40 rounded-lg "
          />
        </View>
      </LinearGradient>

      <DatePickerModal
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onConfirm={setDate}
        selectedDate={date}
      />
    </View>
  );
};

export default Search;
