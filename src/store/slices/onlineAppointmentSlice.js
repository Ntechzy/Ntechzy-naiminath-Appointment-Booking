// src/store/slices/onlineAppointmentSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { 
  setEncryptedItem, 
  getDecryptedItem, 
  removeEncryptedItem,
  STORAGE_KEYS 
} from '../../utils/storage';

const initialState = {
  currentAppointment: null,
  appointments: [],
  pagination: null,
  isLoading: false,
  error: null,
  appointmentId: null,
  isSubmitted: false,
};

const onlineAppointmentSlice = createSlice({
  name: 'onlineAppointment',
  initialState,
  reducers: {
    setCurrentAppointment: (state, action) => {
      state.currentAppointment = action.payload;
    },
    setAppointments: (state, action) => {
      state.appointments = action.payload.appointments || [];
      state.pagination = action.payload.pagination || null;
    },
    setAppointmentId: (state, action) => {
      state.appointmentId = action.payload;
    },
    setAppointmentLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAppointmentError: (state, action) => {
      state.error = action.payload;
    },
    setAppointmentSubmitted: (state, action) => {
      state.isSubmitted = action.payload;
    },
    clearAppointment: (state) => {
      state.currentAppointment = null;
      state.appointmentId = null;
      state.error = null;
      state.isSubmitted = false;
    },
    clearAllAppointments: (state) => {
      state.currentAppointment = null;
      state.appointments = [];
      state.pagination = null;
      state.appointmentId = null;
      state.error = null;
      state.isSubmitted = false;
    },
    addAppointment: (state, action) => {
      state.appointments.unshift(action.payload);
    },
  },
});

export const {
  setCurrentAppointment,
  setAppointments,
  setAppointmentId,
  setAppointmentLoading,
  setAppointmentError,
  setAppointmentSubmitted,
  clearAppointment,
  clearAllAppointments,
  addAppointment,
} = onlineAppointmentSlice.actions;

// Store appointment ID with encryption
export const storeAppointmentIdForFuture = (appointmentId) => (dispatch) => {
  try {
    dispatch(setAppointmentId(appointmentId));
    setEncryptedItem(STORAGE_KEYS.APPOINTMENT_ID, appointmentId);
    console.log('Appointment ID encrypted and stored:', appointmentId);
  } catch (error) {
    console.error('Error storing encrypted appointment ID:', error);
    dispatch(setAppointmentError('Failed to store appointment ID securely'));
  }
};

// Retrieve and decrypt stored appointment ID
export const getStoredAppointmentId = () => (dispatch) => {
  try {
    const storedAppointmentId = getDecryptedItem(STORAGE_KEYS.APPOINTMENT_ID);
    if (storedAppointmentId) {
      dispatch(setAppointmentId(storedAppointmentId));
      console.log('Decrypted appointment ID retrieved:', storedAppointmentId);
      return storedAppointmentId;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving stored appointment ID:', error);
    dispatch(setAppointmentError('Failed to retrieve appointment ID'));
    return null;
  }
};

// Store complete appointment data with encryption
export const storeAppointmentData = (appointmentData) => (dispatch) => {
  try {
    dispatch(setCurrentAppointment(appointmentData));
    setEncryptedItem(STORAGE_KEYS.APPOINTMENT_DATA, appointmentData);
    console.log('Appointment data encrypted and stored');
  } catch (error) {
    console.error('Error storing appointment data:', error);
  }
};

// Retrieve complete appointment data
export const getStoredAppointmentData = () => (dispatch) => {
  try {
    const appointmentData = getDecryptedItem(STORAGE_KEYS.APPOINTMENT_DATA);
    if (appointmentData) {
      dispatch(setCurrentAppointment(appointmentData));
      return appointmentData;
    }
    return null;
  } catch (error) {
    console.error('Error retrieving appointment data:', error);
    return null;
  }
};

// Clear all encrypted appointment data
export const clearStoredAppointmentData = () => (dispatch) => {
  try {
    dispatch(clearAllAppointments());
    removeEncryptedItem(STORAGE_KEYS.APPOINTMENT_ID);
    removeEncryptedItem(STORAGE_KEYS.APPOINTMENT_DATA);
    console.log('All encrypted appointment data cleared');
  } catch (error) {
    console.error('Error clearing appointment data:', error);
  }
};

// Thunk action to submit online appointment
export const submitOnlineAppointment = (appointmentData) => async (dispatch, getState) => {
  try {
    dispatch(setAppointmentLoading(true));
    dispatch(setAppointmentError(null));

    // Get user ID from store
    const { user } = getState();
    const userId = user.userId;

    if (!userId) {
      throw new Error('User ID not found. Please complete user registration first.');
    }

    // Prepare data for backend
    const submissionData = {
      userId: userId,
      formData: appointmentData
    };

    // This would be used with the onlineAppointmentApi
    // const result = await createOnlineAppointment(submissionData).unwrap();
    
    // For now, simulate success response matching your backend
    const mockResponse = {
      success: true,
      message: "Form submitted successfully",
      appointmentId: `appointment_${Date.now()}`
    };

    if (mockResponse.success) {
      dispatch(setAppointmentSubmitted(true));
      dispatch(storeAppointmentIdForFuture(mockResponse.appointmentId));
      dispatch(storeAppointmentData(appointmentData));
      
      return mockResponse;
    } else {
      throw new Error(mockResponse.error || 'Failed to submit appointment');
    }
  } catch (error) {
    const errorMessage = error.message || 'Failed to submit online appointment';
    dispatch(setAppointmentError(errorMessage));
    throw error;
  } finally {
    dispatch(setAppointmentLoading(false));
  }
};

export default onlineAppointmentSlice.reducer;