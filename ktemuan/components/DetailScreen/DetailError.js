import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { useSelector } from 'react-redux';

function DetailError({ navigation }) {
  const detail_status = useSelector(state => state.detail.detail_status);

  return (
    <Layout>
      <Text>{ JSON.stringify(detail_status.errorDetail) || "Error" }</Text>
    </Layout>
  )
}

export default DetailError;