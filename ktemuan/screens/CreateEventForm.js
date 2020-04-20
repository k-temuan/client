import React from 'react';
import { Text, Layout, Input, Radio, RadioGroup, Button, Divider } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';

import { POST_EVENT } from '../store/actions';

function CreateEventForm({ navigation }) {
  const dispatch = useDispatch();

  const userCred = useSelector(state => state.reducer.userCred);
  const event_status = useSelector(state => state.reducer.event_status);
  const submitEventError = useSelector(state => state.reducer.submitEventError);

  React.useEffect(() => {
    // TOGGLE_SUBMIT_EVENT_SUCCESS
    // TOGGLE_SUBMIT_EVENT
    if (event_status.postEvent === 'success') {
      navigation.navigate('Browsing');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Browsing' }],
      });
      dispatch({
        type: "TOGGLE_SUBMIT_EVENT"
      })
    }
  }, [dispatch, event_status])

  const [radio, setRadio] = React.useState('')
  const [datePicker, setDatePicker] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const categories = ['Game', 'Meetup', 'Study', 'Bussiness'];

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [maxAttendees, setMaxAttendees] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [fileObj, setFileObj] = React.useState({
    uri: 'https://clinicaesperanza.org/wp-content/uploads/2019/09/profile-placeholder.png',
    name: 'userProfile.jpg',
    type: 'image/jpg',
  });

  const [tags, setTags] = React.useState('');

  function handleConfirmDate(input) {
    setDatePicker(false)
    setDate(input)
  }
  function pickDocument() {
    DocumentPicker.getDocumentAsync({
      type: 'image/*'
    })
      .then(result => {
        console.log(result)
        if (result.uri) {
          return FileSystem.readAsStringAsync(result.uri, {
            encoding: FileSystem.EncodingType.Base64
          })
        }
      })
      .then(result => {
        console.log(result)
      })
  }
  function pickImageAndUpload() {
    //save file uri
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false
    })
      .then(result => {
        // console.log(result)
        if (!result.cancelled) {
          return FileSystem.readAsStringAsync(result.uri, {
            encoding: FileSystem.EncodingType.Base64
          }) 
        }
      })
      .then(result => {
        // console.log(result)
      })
  }
  function pickImage() {
    //save file uri
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: false
    })
      .then(result => {
        console.log(result)
        setFileObj({...fileObj, uri: result.uri})
      })
      .catch(_ => {
        setFileObj(fileObj)
      })
  }
  function submitForm() {
    dispatch({
      type: "CLEAR_SUBMIT_EVENT_ERROR"
    })
    const body = {
      name,
      category: radio,
      description,
      max_attendees: maxAttendees,
      location,
      date_time: date.toISOString(),
      file: fileObj,
      userCred
    }
    dispatch(POST_EVENT(body))
  }
  function geBack() {
    navigation.navigate('Browsing')
    navigation.reset({
      index: 0,
      routes: [{ name: 'Browsing' }],
    })
  }

  const radioGroup = (
    <RadioGroup
      selectedIndex={categories.indexOf(radio)}
      onChange={(index) => setRadio(categories[index])}
      style={{flexDirection: 'row'}}
    >
      {
        categories.map((item, i) => <Radio key={i} status={submitEventError.category ? 'danger' : '' }>{ item }</Radio>)
      }
    </RadioGroup>
  )

  return (
    <KeyboardAwareScrollView>
      <Layout style={{padding: 10}}>
        <Text>Pick a Category</Text>
        <Text>{ radio }</Text>
        { radioGroup }
        <Layout>
        <Text style={{fontSize:12}} status={ submitEventError.category ? 'danger' : '' }>{ submitEventError.category || '' }</Text>
        </Layout>
        <Input
          placeholder={ radio + ' Event Name'}
          value={ name }
          onChangeText={ setName }
          caption={ submitEventError.name || 'Error placeholder (empty for future)' }
          status={ submitEventError.name ? 'danger' : '' }
        />
        <Input
          placeholder='Description'
          numberOfLines={4}
          multiline={true}
          value={ description }
          onChangeText={ setDescription }
          caption={ submitEventError.description || 'Error placeholder' }
          status={ submitEventError.description ? 'danger' : '' }
        />
        <Input
          placeholder='Max antendees?'
          value={ maxAttendees }
          onChangeText={ setMaxAttendees }
          caption={ submitEventError.maxAttendees || 'Error placeholder' }
          status={ submitEventError.maxAttendees ? 'danger' : '' }
        />
        <Input
          disabled={true}
          placeholder={ 'Image name' }
        />
        <Button
          onPress={ pickImage }
        >
          Pickafile
        </Button>
        <Input
          placeholder='Location'
          value={ location }
          onChangeText={ setLocation }
        />
        <Input
          placeholder='Date and Time'
          onFocus={() => setDatePicker(true)}
          value={ date.toISOString() }
          caption={ submitEventError.datetime || 'Error placeholder' }
          status={ submitEventError.datetime ? 'danger' : '' }
        />
        <Button
          onPressOut={() => setDatePicker(true)}
        >
          Pickadate
        </Button>
        <Divider />
        <DateTimePickerModal
          minimumDate={new Date()}
          isVisible={datePicker}
          mode='datetime'
          onConfirm={handleConfirmDate}
          onCancel={() => setDatePicker(false)}
        />
        <Button
          onPressOut={submitForm}
          disabled={event_status.postLoading}
        >
          Submit
        </Button>
        <Divider />
        <Button
          onPressOut={geBack}
        >
          Back
        </Button>
      </Layout>
    </KeyboardAwareScrollView>
  )
}

export default CreateEventForm;