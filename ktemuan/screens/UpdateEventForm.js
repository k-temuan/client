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
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { FETCH_TAGS } from "../store/tagAction";
import moment from "moment";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { POST_EVENT } from "../store/actions";
import {
  // FETCH_EVENT_TO_UPDATE,
  PATCH_EVENT,
} from "../store/action/updateAction";

import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
  "VirtualizedLists should never be nested", // TODO: Remove when fixed
]);

function UpdateEventForm({ navigation, route }) {
  const dispatch = useDispatch();

  const { id } = route.params;

  const userCred = useSelector((state) => state.landing.userCred);
  // const tags = useSelector((state) => state.tag.tags);
  const update_status = useSelector((state) => state.update.update_status);
  // const submitEventError = useSelector(
  //   (state) => state.create.submitEventError
  // );
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
    uri:
      "https://clinicaesperanza.org/wp-content/uploads/2019/09/profile-placeholder.png",
    name: "userProfile.jpg",
    type: "image/jpg",
  });
  React.useEffect(() => {
    // TOGGLE_SUBMIT_EVENT_SUCCESS
    // TOGGLE_SUBMIT_EVENT
    if (update_status.postUpdate === "success") {
      navigation.push("Details", { id: updated.id });
      dispatch({
        type: "TOGGLE_UPDATE_EVENT",
      });
    }
    // dispatch(FETCH_EVENT_TO_UPDATE(id));

    // if (updated.category) {
    //   setRadio(
    //     updated.category.charAt(0).toUpperCase() + updated.category.slice(1) ||
    //       ""
    //   );
    // }
    // setLocation(updated.location || {});
    // setFileObj(updated.fileObj || fileObj);
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
      placeholder="Set Event Location"
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
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
          backgroundColor: "#3366ff",
          borderRadius: 5,
        },
        textInput: {
          backgroundColor: "#1b2139",
          color: "#fff",
        },
        description: {
          fontWeight: "bold",
          color: "#fff",
        },
        predefinedPlacesDescription: {
          color: "#1faadb",
        },
        row: {
          backgroundColor: "#1b2139",
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
          // fields: "name,rating,formatted_phone_number",
        }
      }
      filterReverseGeocodingByTypes={[
        "locality",
        "administrative_area_level_3",
      ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      // predefinedPlaces={[homePlace, workPlace]}
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      // renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
      // renderRightButton={() => <Text>Custom text after the input</Text>}
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
            caption={
              updateEventError.name || "Error placeholder (empty for future)"
            }
            status={updateEventError.name ? "danger" : ""}
          />
          <Input
            placeholder={radio + " Event Description"}
            numberOfLines={4}
            multiline={true}
            value={description}
            onChangeText={setDescription}
            caption={updateEventError.description || "Error placeholder"}
            status={updateEventError.description ? "danger" : ""}
          />
          <Input
            placeholder="Maximum antendees"
            value={maxAttendees}
            onChangeText={setMaxAttendees}
            caption={updateEventError.maxAttendees || "Error placeholder"}
            status={updateEventError.maxAttendees ? "danger" : ""}
          />
          {/* <Input disabled={true} placeholder={"Image name"} /> */}
          <View style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
            {google}
          </View>
          <Divider />
          <Button onPress={pickImage}>Upload Event Image</Button>
          <Divider />
          <Input
            placeholder="Date and Time"
            onFocus={() => setDatePicker(true)}
            value={
              isDatePicked
                ? moment(date).format("LLLL")
                : `Please set date and time`
            }
            caption={updateEventError.datetime || "Error placeholder"}
            status={updateEventError.datetime ? "danger" : ""}
          />
          <Button onPressOut={() => setDatePicker(true)}>Set Event Date</Button>
          <Divider />
          <DateTimePickerModal
            minimumDate={new Date()}
            isVisible={datePicker}
            mode="datetime"
            onConfirm={handleConfirmDate}
            onCancel={() => setDatePicker(false)}
          />
          <Button onPressOut={submitForm} disabled={update_status.postLoading}>
            Submit
          </Button>
          <Divider />
          <Button onPressOut={geBack}>Back</Button>
        </Layout>
      </KeyboardAwareScrollView>
    </>
  );
}

export default UpdateEventForm;
