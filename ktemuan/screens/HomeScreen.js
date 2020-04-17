import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
function HomeScreen() {
  return (
    <Layout style={styles.container}>
      <Text category='h1'>HOME</Text>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;