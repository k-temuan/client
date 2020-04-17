import React from 'react';
import { Text, Layout, Input, Radio, RadioGroup, Button } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

function CreateEventForm({ navigation }) {
  const [radio, setRadio] = React.useState('')
  const [datePicker, setDatePicker] = React.useState(false);
  const [date, setDate] = React.useState(new Date(1598051730000));
  const categories = ['Game', 'Meetup', 'Study', 'Bussiness'];
  const radioGroup = (
    <RadioGroup
      selectedIndex={categories.indexOf(radio)}
      onChange={(index) => setRadio(categories[index])}
      style={{flexDirection: 'row'}}
    >
      {
        categories.map((item, i) => <Radio key={i} >{ item }</Radio>)
      }
    </RadioGroup>
  )

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
  function pickImage() {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false
    })
      .then(result => {
        console.log(result)
        if (!result.cancelled) {
          return FileSystem.readAsStringAsync(result.uri, {
            encoding: FileSystem.EncodingType.Base64
          }) 
        }
      })
      .then(result => {
        console.log(result)
      })
  }

  return (
    <KeyboardAwareScrollView>
      <Layout style={{padding: 10}}>
        <Text>Pick a Category</Text>
        <Text>{ radio }</Text>
        { radioGroup }
        <Input
          placeholder={ radio + ' Event Name'}
        />
        <Input
          placeholder='Description'
          numberOfLines={4}
          multiline={true}
        />
        <Input
          placeholder='Max antendees?'
        />
        <Input
          placeholder='Image url'
        />
        <Button
          onPress={ pickImage }
        >
          Pickafile
        </Button>
        <Input
          placeholder='Location'
        />
        <Button
          onPressOut={() => setDatePicker(true)}
        >
          Pickadate
        </Button>
        <Input
          placeholder='Date and Time'
          onFocus={() => setDatePicker(true)}
          value={ date.toISOString() }
          disabled
        />
        <DateTimePickerModal
          minimumDate={new Date()}
          isVisible={datePicker}
          mode='datetime'
          onConfirm={handleConfirmDate}
          onCancel={() => setDatePicker(false)}
        />
      </Layout>
    </KeyboardAwareScrollView>
  )
}

export default CreateEventForm;