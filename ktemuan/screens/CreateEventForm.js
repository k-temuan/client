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

import { YellowBox, Image } from "react-native";

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
    uri: "https://clipartart.com/images/image-placeholder-clipart-1.png",
    name: "userProfile.jpg",
    type: "image/jpg",
  });

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
      minLength={2}
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
        language: "en",
      }}
      styles={{
        textInputContainer: {
          width: "100%",
          height: 50,
          backgroundColor: "#f8f9fd",
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
              status={submitEventError.category ? "danger" : ""}
            >
              {submitEventError.category || ""}
            </Text>
          </Layout>
          <Input
            placeholder={radio + " Event Name"}
            value={name}
            onChangeText={setName}
            caption={submitEventError.name || ""}
            status={submitEventError.name ? "danger" : ""}
          />
          <Input
            placeholder={radio + " Event Description"}
            numberOfLines={4}
            multiline={true}
            value={description}
            onChangeText={setDescription}
            caption={submitEventError.description || ""}
            status={submitEventError.description ? "danger" : ""}
          />
          <Input
            placeholder="Maximum antendees"
            value={maxAttendees}
            onChangeText={(text) => {
              handleAttendeeInput(text);
            }}
            caption={submitEventError.maxAttendees || ""}
            status={submitEventError.maxAttendees ? "danger" : ""}
          />
          {/* <Input disabled={true} placeholder={"Image name"} /> */}
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
              caption={submitEventError.datetime || ""}
              status={submitEventError.datetime ? "danger" : ""}
              disabled={true}
            />
            <Button size="medium" onPressOut={() => setDatePicker(true)}>
              Set Event Date
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
          <Image
            source={fileObj}
            style={{
              width: 100,
              height: 100,
              alignSelf: "center",
              marginBottom: 5,
            }}
          />
          <Button onPress={pickImage}>Upload Event Image</Button>
          <Layout
            style={{
              marginTop: 12,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button onPressOut={submitForm} disabled={event_status.postLoading}>
              Create Event
            </Button>
            <Divider />
            <Button onPressOut={geBack}>Back</Button>
          </Layout>
        </Layout>
      </KeyboardAwareScrollView>
    </>
  );
}

export default CreateEventForm;
