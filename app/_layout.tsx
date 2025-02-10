import React from 'react';
import '../global.css';
import { Provider } from "react-redux";

import { Stack } from 'expo-router';
import store from './(redux)/store/store';

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack/>
    </Provider>

  );
}
