import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  FlatList,
  ScrollView,
  TouchableHighlight,
  RefreshControl,
} from "react-native";
import EventListItem from "./EventListItem";
import { Button, Layout, Text } from "@ui-kitten/components";
import EventCard from "./EventCard";
import { FETCH_EVENTS } from "../../store/actions";

// function wait(timeout) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, timeout);
//   });
// }

function EventList({ navigation }) {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const userCred = useSelector((state) => state.landing.userCred);
  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   dispatch(FETCH_EVENTS({ userCred: userCred }));
  //   wait(2000).then(() => setRefreshing(false));
  // }, [refreshing]);

  function onRefresh() {
    setRefreshing(true);
    dispatch(FETCH_EVENTS({ userCred: userCred }));
    setRefreshing(false);
  }
  const events = useSelector((state) => state.event.events);
  const category = useSelector((state) => state.browse.category);

  const filteredEvents = events.filter((item) => {
    if (category === "All") {
      return item;
    } else {
      return item.category === category.toLowerCase();
    }
  });

  return (
    <Layout>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={filteredEvents}
        renderItem={({ item }) => (
          <EventCard event={item} navigation={navigation} />
        )}
        keyExtractor={(item) => String(item.id)}
      />
    </Layout>
  );
}

export default EventList;
