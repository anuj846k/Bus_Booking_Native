import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

interface BookItemProps {
  item: {
    _id: string;
    busName?: string;
    from?: string;
    to?: string;
    date?: string;
    seatNumbers?: number[];
    status?: string;
    price?: number;
    [key: string]: any;
  };
}

const BookItem: React.FC<BookItemProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.busName}>{item.busName || 'Bus'}</Text>
      <View style={styles.details}>
        <Text style={styles.route}>{item.from} → {item.to}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.seats}>Seats: {item.seatNumbers?.join(', ')}</Text>
        <View style={[styles.statusBadge, 
          item.status === 'Completed' ? styles.completed : 
          item.status === 'Cancelled' ? styles.cancelled : styles.upcoming
        ]}>
          <Text style={styles.statusText}>{item.status || 'Booked'}</Text>
        </View>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  busName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  details: {
    gap: 4,
  },
  route: {
    fontSize: 16,
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  seats: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  completed: {
    backgroundColor: '#e6f7ee',
  },
  cancelled: {
    backgroundColor: '#ffebee',
  },
  upcoming: {
    backgroundColor: '#e3f2fd',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
  }
});

export default BookItem