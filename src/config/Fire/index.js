import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCt8Ww7EmmKQhBno3JMTjAlw_TgmYj0ly8',
  authDomain: 'apppengajuan.firebaseapp.com',
  projectId: 'apppengajuan',
  storageBucket: 'apppengajuan.appspot.com',
  messagingSenderId: '986176014133',
  appId: '1:986176014133:web:dc9a0c264634861340ee7c',
};

const Fire = firebase.initializeApp(firebaseConfig);
export default Fire;
