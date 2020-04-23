import React from "react";
import {
  Text,
  Layout,
  Input,
  Radio,
  RadioGroup,
  Button,
  Divider,
} from "@ui-kitten/components";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { FETCH_TAGS } from "../store/tagAction";
import moment from "moment";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { PATCH_EVENT } from "../store/action/updateAction";

import { YellowBox, Image } from "react-native";

YellowBox.ignoreWarnings(["VirtualizedLists should never be nested"]);

function UpdateEventForm({ navigation, route }) {
  const dispatch = useDispatch();

  const { id } = route.params;

  const userCred = useSelector((state) => state.landing.userCred);
  const update_status = useSelector((state) => state.update.update_status);
  const updated = useSelector((state) => state.update.updated);
  const updateEventError = useSelector(
    (state) => state.update.updateEventError
  );

  const [isDatePicked, setIsDatePicked] = React.useState(true);

  const [radio, setRadio] = React.useState(
    updated.category.charAt(0).toUpperCase() + updated.category.slice(1)
  );
  const [datePicker, setDatePicker] = React.useState(false);
  const [date, setDate] = React.useState(new Date(updated.date_time));
  const categories = ["Game", "Meetup", "Study", "Bussiness"];
  // const [selectedTags, setSelectedTags] = React.useState([]);
  const [name, setName] = React.useState(updated.name);
  const [description, setDescription] = React.useState(updated.description);
  const [maxAttendees, setMaxAttendees] = React.useState(
    "" + updated.max_attendees
  );
  const [location, setLocation] = React.useState({});
  const [fileObj, setFileObj] = React.useState({
    uri: "https://clipartart.com/images/image-placeholder-clipart-1.png",
    name: "userProfile.jpg",
    type: "image/jpg",
  });
  React.useEffect(() => {
    if (update_status.postUpdate === "success") {
      navigation.navigate("Details", { id: updated.id });
      dispatch({
        type: "TOGGLE_UPDATE_EVENT",
      });
    }
  }, [dispatch, id, updated]);

  // fetch tags
  React.useEffect(() => {
    dispatch(FETCH_TAGS({ userCred: userCred }));
  }, []);

  function handleConfirmDate(input) {
    setIsDatePicked(true);
    setDatePicker(false);
    setDate(input);
  }
  function handleAttendeeInput(text) {
    if (Number(text) || Number(text) >= 0) {
      setMaxAttendees(text);
    }
  }
  function pickImage() {
    //save file uri
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: false,
    })
      .then((result) => {
        console.log(result);
        setFileObj({ ...fileObj, uri: result.uri });
      })
      .catch((_) => {
        setFileObj(fileObj);
      });
  }
  function submitForm() {
    dispatch({
      type: "CLEAR_UPDATE_EVENT_ERROR",
    });
    const body = {
      id: updated.id,
      name,
      category: radio,
      description,
      max_attendees: maxAttendees,
      location,
      date_time: date.toISOString(),
      file: fileObj,
      userCred,
    };
    dispatch(PATCH_EVENT(body));
    navigation.push("Details", { id: updated.id });
  }
  function geBack() {
    navigation.navigate("Details", { id: updated.id });
  }

  const radioGroup = (
    <RadioGroup
      selectedIndex={categories.indexOf(radio)}
      onChange={(index) => setRadio(categories[index])}
      style={{ flexDirection: "row" }}
    >
      {categories.map((item, i) => (
        <Radio key={i} status={updateEventError.category ? "danger" : ""}>
          {item}
        </Radio>
      ))}
    </RadioGroup>
  );

  const google = (
    <GooglePlacesAutocomplete
      placeholder="Update Event Location"
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance={"light"}
      listViewDisplayed="false" // true/false/undefined
      fetchDetails={true}
      renderDescription={(row) => row.description} // custom description render
      onPress={(data, details = null) => {
        setLocation({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          name: details.name,
          description: data.description,
        });
      }}
      getDefaultValue={() => ""}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: "AIzaSyDF0f24ema_HtTZrUCZSo3iG7HIk8Jkd-Q",
        language: "en", // language of the results
        // types: 'establishment' // default: 'geocode'
      }}
      styles={{
        textInputContainer: {
          width: "100%",
          height: 50,
          backgroundColor: "#fff",
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "#e5e9f2",
          marginTop: 5,
          marginBottom: 5,
        },
        textInput: {
          backgroundColor: "#f8f9fd",
          color: "#000",
          marginTop: 5,
          height: "80%",
        },
        description: {
          color: "#000",
        },
        predefinedPlacesDescription: {
          color: "#1faadb",
        },
        row: {
          backgroundColor: "#cccccc",
        },
        poweredContainer: {
          backgroundColor: "#ebebeb",
        },
      }}
      // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      // currentLocationLabel="Current location"
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={
        {
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }
      }
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: "distance",
        // type: 'cafe'
      }}
      GooglePlacesDetailsQuery={
        {
          // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        }
      }
      filterReverseGeocodingByTypes={[
        "locality",
        "administrative_area_level_3",
      ]}
      debounce={200}
    />
  );

  return (
    <>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <Layout style={{ padding: 10 }}>
          <Text>Pick a Category</Text>
          <Text>{radio}</Text>
          {radioGroup}
          <Layout>
            <Text
              style={{ fontSize: 12 }}
              status={updateEventError.category ? "danger" : ""}
            >
              {updateEventError.category || ""}
            </Text>
          </Layout>
          <Input
            placeholder={radio + " Event Name"}
            value={name}
            onChangeText={setName}
            caption={updateEventError.name || ""}
            status={updateEventError.name ? "danger" : ""}
          />
          <Input
            placeholder={radio + " Event Description"}
            numberOfLines={4}
            multiline={true}
            value={description}
            onChangeText={setDescription}
            caption={updateEventError.description || ""}
            status={updateEventError.description ? "danger" : ""}
          />
          <Input
            placeholder="Maximum antendees"
            value={maxAttendees}
            onChangeText={(text) => handleAttendeeInput(text)}
            caption={updateEventError.maxAttendees || ""}
            status={updateEventError.maxAttendees ? "danger" : ""}
          />
          <View style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
            {google}
          </View>
          <Divider />
          <Layout style={{ marginVertical: 10 }}>
            <Input
              placeholder="Date and Time"
              onFocus={() => setDatePicker(true)}
              value={
                isDatePicked
                  ? moment(date).format("LLLL")
                  : `Please set date and time`
              }
              caption={updateEventError.datetime || ""}
              status={updateEventError.datetime ? "danger" : ""}
              disabled={true}
            />
            <Button onPressOut={() => setDatePicker(true)}>
              Update Event Date
            </Button>
          </Layout>
          <Divider />
          <DateTimePickerModal
            minimumDate={new Date()}
            isVisible={datePicker}
            mode="datetime"
            onConfirm={handleConfirmDate}
            onCancel={() => setDatePicker(false)}
          />
          <Button onPress={pickImage}>Renew Event Image</Button>
          <Layout
            style={{
              marginTop: 12,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              onPressOut={submitForm}
              disabled={update_status.postLoading}
            >
              Update
            </Button>
            <Divider />
            <Button onPressOut={geBack}>Back</Button>
          </Layout>
        </Layout>
      </KeyboardAwareScrollView>
    </>
  );
}

export default UpdateEventForm;
