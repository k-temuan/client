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
import { POST_EVENT } from "../store/actions";

import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
  "VirtualizedLists should never be nested", // TODO: Remove when fixed
]);

function CreateEventForm({ navigation }) {
  const dispatch = useDispatch();

  const userCred = useSelector((state) => state.landing.userCred);
  // const tags = useSelector((state) => state.tag.tags);
  const event_status = useSelector((state) => state.create.event_status);
  const submitEventError = useSelector(
    (state) => state.create.submitEventError
  );

  React.useEffect(() => {
    // TOGGLE_SUBMIT_EVENT_SUCCESS
    // TOGGLE_SUBMIT_EVENT
    if (event_status.postEvent === "success") {
      navigation.navigate("Browsing");
      navigation.reset({
        index: 0,
        routes: [{ name: "Browsing" }],
      });
      dispatch({
        type: "TOGGLE_SUBMIT_EVENT",
      });
    }
  }, [dispatch, event_status]);

  // fetch tags
  React.useEffect(() => {
    dispatch(FETCH_TAGS({ userCred: userCred }));
  }, []);

  const [isDatePicked, setIsDatePicked] = React.useState(false);

  const [radio, setRadio] = React.useState("");
  const [datePicker, setDatePicker] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const categories = ["Game", "Meetup", "Study", "Bussiness"];
  // const [selectedTags, setSelectedTags] = React.useState([]);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [maxAttendees, setMaxAttendees] = React.useState("");
  const [location, setLocation] = React.useState({});
  const [fileObj, setFileObj] = React.useState({
    uri:
      "https://clinicaesperanza.org/wp-content/uploads/2019/09/profile-placeholder.png",
    name: "userProfile.jpg",
    type: "image/jpg",
  });

  function handleConfirmDate(input) {
    setIsDatePicked(true);
    setDatePicker(false);
    setDate(input);
  }
  function pickDocument() {
    DocumentPicker.getDocumentAsync({
      type: "image/*",
    })
      .then((result) => {
        console.log(result);
        if (result.uri) {
          return FileSystem.readAsStringAsync(result.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
        }
      })
      .then((result) => {
        console.log(result);
      });
  }
  function pickImageAndUpload() {
    //save file uri
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    })
      .then((result) => {
        // console.log(result)
        if (!result.cancelled) {
          return FileSystem.readAsStringAsync(result.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
        }
      })
      .then((result) => {
        // console.log(result)
      });
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
      type: "CLEAR_SUBMIT_EVENT_ERROR",
    });
    const body = {
      name,
      category: radio,
      description,
      max_attendees: maxAttendees,
      location,
      date_time: date.toISOString(),
      file: fileObj,
      userCred,
    };
    dispatch(POST_EVENT(body));
  }
  function geBack() {
    navigation.navigate("Browsing");
    navigation.reset({
      index: 0,
      routes: [{ name: "Browsing" }],
    });
  }

  const radioGroup = (
    <RadioGroup
      selectedIndex={categories.indexOf(radio)}
      onChange={(index) => setRadio(categories[index])}
      style={{ flexDirection: "row" }}
    >
      {categories.map((item, i) => (
        <Radio key={i} status={submitEventError.category ? "danger" : ""}>
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
              status={submitEventError.category ? "danger" : ""}
            >
              {submitEventError.category || ""}
            </Text>
          </Layout>
          <Input
            placeholder={radio + " Event Name"}
            value={name}
            onChangeText={setName}
            caption={
              submitEventError.name || "Error placeholder (empty for future)"
            }
            status={submitEventError.name ? "danger" : ""}
          />
          <Input
            placeholder={radio + " Event Description"}
            numberOfLines={4}
            multiline={true}
            value={description}
            onChangeText={setDescription}
            caption={submitEventError.description || "Error placeholder"}
            status={submitEventError.description ? "danger" : ""}
          />
          <Input
            placeholder="Maximum antendees"
            value={maxAttendees}
            onChangeText={setMaxAttendees}
            caption={submitEventError.maxAttendees || "Error placeholder"}
            status={submitEventError.maxAttendees ? "danger" : ""}
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
            caption={submitEventError.datetime || "Error placeholder"}
            status={submitEventError.datetime ? "danger" : ""}
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
          <Button onPressOut={submitForm} disabled={event_status.postLoading}>
            Submit
          </Button>
          <Divider />
          <Button onPressOut={geBack}>Back</Button>
        </Layout>
      </KeyboardAwareScrollView>
    </>
  );
}

export default CreateEventForm;
