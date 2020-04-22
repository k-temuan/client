import React from "react";
import { Layout, Text, Divider, Button, Avatar } from "@ui-kitten/components";
import { ScrollView, TouchableHighlight, Image, View } from "react-native";
import { styles } from "../../styles";
import { useSelector, useDispatch } from "react-redux";
import { apiURL } from "../../store/action/index";
import { FETCH_EVENTS } from "../../store/actions";
import {
  JOIN_EVENT_FROM_DETAIL,
  UNJOIN_EVENT_FROM_DETAIL,
  REJOIN_EVENT_FROM_DETAIL,
} from "../../store/action/attendeeAction";
import { FETCH_EVENT_TO_UPDATE } from "../../store/action/updateAction";
import { DELETE_EVENT } from "../../store/action/detailAction";
import MapView, { Marker } from "react-native-maps";
import moment from "moment";

let myMap;
const placeholder =
  "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png";

function DetailItem({ navigation }) {
  const dispatch = useDispatch();
  const event = useSelector((state) => state.detail.event);
  const userCred = useSelector((state) => state.landing.userCred);
  const [isConfirm, setIsConfirm] = React.useState();
  const [isCreator, setIsCreator] = React.useState(false);
  const [filteredAttendeesList, setfilteredAttendeesList] = React.useState([]);

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
        dispatch(FETCH_EVENT_TO_UPDATE(event.id));
      } else {
        setIsCreator(false);
      }
    }
  }, [event]);

  // console.log(event);
  // console.log(event.image_url);

  let parsedLoc;
  if (event.location) {
    parsedLoc = JSON.parse(event.location);
  }

  // let tagsList = <></>;
  // if (event.EventTags) {
  //   tagsList = event.EventTags.map((item) => (
  //     <Button
  //       size="tiny"
  //       key={item.TagId}
  //       style={{ backgroundColor: "grey", borderColor.id].isConfirm: "grey" }}
  //     >
  //       {item.Tag.name}
  //     </Button>
  //   ));
  // }
  let ownerActionStyle = "none";
  console.log(userCred, event.User);
  if (event.User) {
    console.log("is owner", Number(userCred.id) === Number(event.User.id));
    console.log(userCred, event.User.id);
    ownerActionStyle =
      Number(userCred.id) === Number(event.User.id) ? "flex" : "none";
  }

  // let attendedActionStyle = "flex";
  // if (userCred.id && event.Attendees) {
  //   event.Attendees.forEach((item) => {
  //     console.log(item);
  //     if (item.User.id === userCred.id) attendedActionStyle = "none";
  //   });
  // }

  function pressDelete() {
    dispatch(
      DELETE_EVENT({
        eventId: event.id,
        userCred: userCred,
      })
    );
    dispatch(FETCH_EVENTS({ userCred: userCred }));
    navigation.navigate("Browsing");
    navigation.reset({ index: 0, routes: [{ name: "Browsing" }] });
  }

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
    <Layout
      style={{ flex: 1, paddingTop: 5, paddingBottom: 0, paddingHorizontal: 5 }}
    >
      <ScrollView>
        <Layout
          style={[
            {
              paddingTop: 5,
              borderTopWidth: 5,
              borderRightWidth: 5,
              borderLeftWidth: 5,
              borderTopRightRadius: 100,
              borderTopLeftRadius: 10,
            },
            styles.card[event.category],
          ]}
        >
          <Text category="h2" style={{ paddingLeft: 5 }}>
            {event.name}
          </Text>
          <Text category="h6" style={{ paddingLeft: 5 }}>
            {moment(event.date_time).format("LLLL")}
          </Text>
        </Layout>
        <Layout
          style={[
            { padding: 5, borderLeftWidth: 5 },
            styles.card[event.category],
          ]}
        >
          <Text category="h6">{event.description}</Text>
          {event.category && (
            <Text style={{ fontWeight: "bold", fontSize: 11 }}>
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}{" "}
              Event
            </Text>
          )}
          {/* <Layout style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {tagsList}
          </Layout> */}
          {event.image_url && (
            <ScrollView horizontal={true} style={{ minHeight: 100 }}>
              <Image
                source={{ uri: apiURL + "/" + event.image_url }}
                style={{ height: 100, width: 150, marginHorizontal: 1 }}
              />
            </ScrollView>
          )}
          <Layout style={{ display: "flex" }}>
            {!isCreator && (
              <Layout>
                {isConfirm ? (
                  <Text
                    category="h6"
                    style={{
                      textAlign: "center",
                      paddingBottom: 10,
                      paddingTop: 10,
                    }}
                  >
                    You already registered to join this event
                  </Text>
                ) : (
                  <Text
                    category="h6"
                    style={{
                      textAlign: "center",
                      paddingBottom: 10,
                      paddingTop: 10,
                    }}
                  >
                    Do you want to join this event?
                  </Text>
                )}
              </Layout>
            )}
            {!isCreator && (
              <Layout
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
                {isConfirm ? (
                  <Button
                    size="small"
                    onPressOut={() => {
                      pressRemoveJoin();
                    }}
                  >
                    Cancel my participation
                  </Button>
                ) : (
                  <Button
                    size="small"
                    onPressOut={() => {
                      pressJoin();
                    }}
                  >
                    Join The Event
                  </Button>
                )}
              </Layout>
            )}
            <Layout style={{ display: ownerActionStyle }}>
              <Text category="h6" style={{ textAlign: "center" }}>
                You are creator of this event{"\n"}
              </Text>
              <Layout
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
                <Button
                  size="small"
                  onPressOut={() => {
                    navigation.push("Update", { id: event.id });
                  }}
                >
                  Update Event
                </Button>
                <Button
                  size="small"
                  onPressOut={() => {
                    pressDelete();
                  }}
                >
                  Delete Event
                </Button>
              </Layout>
            </Layout>
          </Layout>
          <TouchableHighlight
            onPressOut={() =>
              navigation.navigate("Atendee", { eventId: event.id })
            }
          >
            <Layout
              style={{ flexDirection: "row", flexWrap: "wrap", maxHeight: 100 }}
            >
              <Text category="h5" style={{ textAlign: "center" }}>
                Atendees List >
              </Text>
              {filteredAttendeesList.length !== 0 &&
                filteredAttendeesList.map((item) => (
                  <TouchableHighlight
                    key={item.id + "atendee"}
                    style={{ margin: 5 }}
                    onPressOut={() =>
                      navigation.navigate("Profile", { userId: item.User.id })
                    }
                  >
                    <Layout style={{ elevation: 5, borderRadius: 20 }}>
                      <Avatar
                        size="medium"
                        source={{
                          uri: `https://api.adorable.io/avatars/125/${item.User.email}.png`,
                        }}
                      />
                    </Layout>
                  </TouchableHighlight>
                ))}
            </Layout>
          </TouchableHighlight>
          {parsedLoc && (
            <Layout
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                category="h5"
                style={{ textAlign: "center", paddingBottom: 5, paddingTop: 5 }}
              >
                {parsedLoc.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  paddingBottom: 10,
                  paddingTop: 5,
                }}
              >
                {parsedLoc.description}
              </Text>
              <MapView
                ref={(ref) => (myMap = ref)}
                style={{
                  width: "100%",
                  height: 200,
                }}
                region={{
                  latitude: parsedLoc.latitude,
                  longitude: parsedLoc.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: parsedLoc.latitude,
                    longitude: parsedLoc.longitude,
                  }}
                  title={parsedLoc.name}
                  description={parsedLoc.description}
                  onPress={() => {
                    myMap.fitToCoordinates(
                      [
                        {
                          latitude: parsedLoc.latitude,
                          longitude: parsedLoc.longitude,
                        },
                      ],
                      {
                        edgePadding: {
                          top: 10,
                          bottom: 10,
                          left: 10,
                          right: 10,
                        },
                        animated: true,
                      }
                    );
                  }}
                />
              </MapView>
            </Layout>
          )}
        </Layout>
      </ScrollView>
    </Layout>
  );
}

export default DetailItem;
