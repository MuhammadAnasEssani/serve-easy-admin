import {initializeApp} from 'firebase/app'
import {getMessaging, getToken, onMessage} from 'firebase/messaging'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

export const firebaseApp = initializeApp(firebaseConfig)
const messaging = getMessaging(firebaseApp)

export const getTokens = async (): Promise<string | null> => {
  const swRegistration = await navigator.serviceWorker.register('/fb-serveeasy-sw.js', {
    scope: '/',
  })

  return getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
    serviceWorkerRegistration: swRegistration,
  })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.')
        return null
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err)
      // catch error while creating client token
      return null
    })
}

export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload)
    })
  })
}
