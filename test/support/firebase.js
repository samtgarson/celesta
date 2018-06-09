const firestore = {
  collection: jest.fn().mockReturnThis(),
  doc: jest.fn().mockReturnThis(),
  get: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis()
}

const mockFirebase = {
  firestore
}

export default mockFirebase

jest.mock('nativescript-plugin-firebase/firebase.ios', () => mockFirebase)
