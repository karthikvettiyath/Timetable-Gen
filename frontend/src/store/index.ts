import { configureStore } from '@reduxjs/toolkit';
import facultyReducer from './slices/facultySlice';
import roomReducer from './slices/roomSlice';
import subjectReducer from './slices/subjectSlice';
import classGroupReducer from './slices/classGroupSlice';
import timeSlotReducer from './slices/timeSlotSlice';
import schedulerReducer from './slices/schedulerSlice';

import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        faculty: facultyReducer,
        room: roomReducer,
        subject: subjectReducer,
        classGroup: classGroupReducer,
        timeSlot: timeSlotReducer,
        scheduler: schedulerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
