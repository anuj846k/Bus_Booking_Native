import { View, Text, Platform, Modal, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (date: Date) => void;
  selectedDate: Date;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  onClose,
  onConfirm,
  selectedDate,
}) => {
  const [tempDate, setTempDate] = useState(selectedDate);

  useEffect(() => {
    if (visible) {
      setTempDate(selectedDate);
    }
  }, [visible, selectedDate]);

  if (Platform.OS === 'android') {
    if (!visible) return null;
    
    return (
      <DateTimePicker
        value={tempDate}
        mode="date"
        display="default"
        onChange={(event, date) => {
          onClose();
          if (event.type === 'set' && date) {
            onConfirm(date);
          }
        }}
      />
    );
  }

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View
        className="flex-1 justify-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View className="bg-white rounded-3xl p-4 mx-2">
          {Platform.OS === 'ios' && (
            <DateTimePicker
              value={tempDate}
              mode="date"
              display="spinner"
              onChange={(event, date) => date && setTempDate(date)}
            />
          )}

          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              onPress={onClose}
              className="p-3 bg-gray-300 rounded-lg flex-1 mx-2"
            >
              <Text className="text-center text-black font-bold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onConfirm(tempDate);
                onClose();
              }}
              className="p-3 bg-blue-500 rounded-lg flex-1 mx-2"
            >
              <Text className="text-center text-white font-bold">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DatePickerModal;
