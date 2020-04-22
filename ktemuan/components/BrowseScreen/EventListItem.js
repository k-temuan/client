import React from "react";
import { Layout, Avatar, Text, Card, Button } from "@ui-kitten/components";
import { styles } from "../../styles";
import { TouchableHighlight } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  JOIN_EVENT_FROM_DETAIL,
  UNJOIN_EVENT_FROM_DETAIL,
  REJOIN_EVENT_FROM_DETAIL,
} from "../../store/action/attendeeAction";

const ava_url = "https://api.adorable.io/avatars/80/lele@goyang.com.png";

function EventListItem({ navigation, event }) {
  const dispatch = useDispatch();

  const [isCreator, setIsCreator] = React.useState(false);
  const [filteredAttendeesList, setfilteredAttendeesList] = React.useState([]);
  const [isConfirm, setIsConfirm] = React.useState();
  const userCred = useSelector((state) => state.landing.userCred);

  React.useEffect(() => {
    if (event.Attendees) {
      let isConfirmCheck = event.Attendees.filter(
        (el) => el.UserId === userCred.id
      );
      if (isConfirmCheck.length === 0) {
        setIsConfirm(false);
      } else {
        if (isConfirmCheck[0].isConfirm === true) {
          setIsConfirm(true);
        } else {
          setIsConfirm(false);
        }
      }
      let newList = event.Attendees.filter((el) => el.isConfirm === true);
      setfilteredAttendeesList(newList);
    }
  }, [event]);
  React.useEffect(() => {
    if (event.User) {
      if (userCred.id == event.User.id) {
        setIsCreator(true);
      } else {
        setIsCreator(false);
      }
    }
  }, [event]);

  function pressRemoveJoin() {
    let pressRemoveJoinFindAttendee = event.Attendees.filter(
      (el) => el.UserId === userCred.id
    );
    let pressRemoveJoinFindAttendeeId = pressRemoveJoinFindAttendee[0].id;
    setIsConfirm(false);
    let removeFromList = filteredAttendeesList.filter(
      (el) => el.id !== pressRemoveJoinFindAttendeeId
    );
    setfilteredAttendeesList(removeFromList);
    dispatch(UNJOIN_EVENT_FROM_DETAIL(pressRemoveJoinFindAttendeeId));
  }

  function pressJoin() {
    let pressJoinFindAttendee = event.Attendees.filter(
      (el) => el.UserId === userCred.id
    );
    if (pressJoinFindAttendee.length === 0) {
      dispatch(JOIN_EVENT_FROM_DETAIL(event.id));
    } else {
      let pressJoinFindAttendeeId = pressJoinFindAttendee[0].id;
      dispatch(REJOIN_EVENT_FROM_DETAIL(pressJoinFindAttendeeId));
      let addedList = [...filteredAttendeesList, pressJoinFindAttendee[0]];
      setfilteredAttendeesList(addedList);
    }
    setIsConfirm(true);
  }
  return (
    <Card
      key={event.id}
      style={[
        {
          minHeight: 65,
          margin: 5,
          borderLeftWidth: 10,
          borderBottomWidth: 10,
          borderRadius: 0,
          elevation: 10,
        },
        styles.card[event.category],
      ]}
      appearance="filled"
      onPress={() =>
        navigation.push("Details", { id: event.id, cachedEvent: event })
      }
    >
      <Layout style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Layout
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <TouchableHighlight
            onPressOut={() =>
              navigation.push("Profile", {
                userId: event.UserId,
              })
            }
          >
            <Avatar
              style={styles.avatar}
              size="small"
              source={{ uri: ava_url }}
            />
          </TouchableHighlight>
        </Layout>
        <Layout style={{ flex: 8, flexDirection: "column", paddingLeft: 5 }}>
          <Layout
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableHighlight
              onPressOut={() =>
                navigation.push("Profile", {
                  userId: event.UserId,
                })
              }
            >
              <Text>{event.User.firstname}</Text>
            </TouchableHighlight>
            <Text>
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </Text>
            <Text>{moment(event.date_time).startOf("hour").fromNow()}</Text>
          </Layout>
          <Layout style={{ flexDirection: "row" }}>
            <Text>{event.name}</Text>
          </Layout>
          <Layout style={{ flexDirection: "row" }}>
            <Text>{moment(event.date_time).format("LLLL")}</Text>
            {/* <Text>{ event.location.name }</Text> */}
          </Layout>
          {!isCreator ? (
            <Layout style={{ flexDirection: "row" }}>
              {!isConfirm ? (
                <Button
                  size="tiny"
                  onPressOut={() => {
                    pressJoin();
                  }}
                >
                  Join
                </Button>
              ) : (
                <Button
                  size="tiny"
                  onPressOut={() => {
                    pressRemoveJoin();
                  }}
                >
                  Cancel Join
                </Button>
              )}
            </Layout>
          ) : (
            <Layout>
              <Text>You are creator of this event</Text>
            </Layout>
          )}
        </Layout>
      </Layout>
    </Card>
  );
}

export default EventListItem;
