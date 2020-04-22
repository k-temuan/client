import React from "react";
import { TouchableHighlight, ImageBackground } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Text, Avatar, Button } from "@ui-kitten/components";
import { styles } from "../../styles";
import { apiURL } from "../../store/action/index";
import moment from "moment";
import {
  JOIN_EVENT_FROM_DETAIL,
  UNJOIN_EVENT_FROM_DETAIL,
  REJOIN_EVENT_FROM_DETAIL,
} from "../../store/action/attendeeAction";

function EventCard({ navigation, event }) {
  const dispatch = useDispatch();
  const userCred = useSelector((state) => state.landing.userCred);

  const [isCreator, setIsCreator] = React.useState(false);
  const [filteredAttendeesList, setfilteredAttendeesList] = React.useState([]);
  const [isConfirm, setIsConfirm] = React.useState();

  const event_datetime = moment(event.date_time).format("MMMM D YYYY, h:mm a");
  // const isOwner = userCred.id === event.User.id
  // const hasJoin = event.Attendees.filter(item => item.User.id === userCred.id).length > 0
  const displayOwner = isCreator ? { display: "flex" } : { display: "none" };
  const diplayJoinStatus = isConfirm
    ? { display: "flex" }
    : { display: "none" };
  // console.log(event.Attendees)

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

  if (event.UserId) {
    return (
      <TouchableHighlight
        onPressOut={() => {
          navigation.navigate("Details", { id: event.id });
        }}
      >
        <Layout
          style={[
            styles.shadow,
            styles.bg[event.category],
            { margin: 15, alignItems: "center", borderRadius: 5 },
          ]}
        >
          <ImageBackground
            source={{ uri: apiURL + "/" + event.image_url }}
            style={[
              styles.fullScreenBox,
              { justifyContent: "flex-end", marginBottom: 0 },
            ]}
          >
            <Layout
              style={[styles.cardInfoBox, styles.cardInfo[event.category], {}]}
            >
              <Layout
                style={{
                  flexDirection: "row",
                  backgroundColor: "transparent",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 10,
                }}
              >
                <Layout
                  style={{
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    size="small"
                    source={{
                      uri: `https://api.adorable.io/avatars/125/${event.User.email}.png`,
                    }}
                    style={{marginRight: 7}}
                  />
                  <Text style={{ fontSize: 18 }}>
                    {event.User.firstname} {event.User.lastname}
                  </Text>
                </Layout>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  {event.category.toUpperCase()}
                </Text>
              </Layout>
              <Text category="h1" style={{ fontWeight: "bold" }}>
                {event.name}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  fontSize: 16,
                }}
              >
                {JSON.parse(event.location).description}
              </Text>
              <Text style={{ fontStyle: "italic" }}>{event_datetime}</Text>
              <Layout
                style={{
                  backgroundColor: "transparent",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginVertical: 10,
                }}
              >
                <Text
                  style={[
                    {
                      backgroundColor: "#00b8a9",
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                    },
                    displayOwner,
                  ]}
                >
                  Your Event
                </Text>
                <Text
                  style={[
                    diplayJoinStatus,
                    { backgroundColor: "#00b8a9", padding: 5, borderRadius: 5 },
                  ]}
                >
                  Joined
                </Text>
                {/* <Button size="tiny">
                    <Text>Join Event</Text>
                  </Button> */}
                {!isCreator && (
                  <Layout>
                    {!isConfirm ? (
                      <Button
                        size="small"
                        onPressOut={() => {
                          pressJoin();
                        }}
                      >
                        Join Event
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        onPressOut={() => {
                          pressRemoveJoin();
                        }}
                      >
                        Cancel Join
                      </Button>
                    )}
                  </Layout>
                )}
              </Layout>
            </Layout>
          </ImageBackground>
        </Layout>
      </TouchableHighlight>
    );
  } else {
    return <></>;
  }
}

export default EventCard;
