import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  login_container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  container: {
    flexDirection: 'row',

  },
  camera_container: {
    flex: 1,
    justifyContent: 'center',
  },
    camera: {
    flex: 1,
    },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  leftBox: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  itemModal: {
    position: 'fixed',
    height:'80%',
    width:'80%',
    top:'10%',
    left: '10%',
    backgroundColor: 'white',
    zValue:1000
  },
  modalContainer: {
      position:"fixed",
      height:"100%",
      width:"100%",
      backgroundColor:"rgba(0, 0, 0, 0.5)",
  },
  textInput: {
    backgroundColor: "#cccccc",
    borderStyle: "solid",
    borderColor:"black",
    borderWidth:1
  },
  closeButton: {
    width:"30px",
    height:"30px",
    backgroundColor:"red"
  },
  billName: {
    width:"30px",
    height:"30px",
    backgroundColor:"red"
  }
});