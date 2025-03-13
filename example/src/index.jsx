import React from 'react';
import { createRoot } from 'react-dom';
import {
  AppProvider,
  ErrorPage,
  PageWrap,
} from '@edx/frontend-platform/react';
import { APP_INIT_ERROR, APP_READY, initialize } from '@edx/frontend-platform';
import { Routes, Route } from 'react-router-dom';
import { subscribe } from '@edx/frontend-platform/pubSub';
import MyComponent from './MyComponent';

import './index.scss';

const container = document.getElementById('root');
const root = createRoot(container);

subscribe(APP_READY, () => {
  root.render(
    <AppProvider>
      <Routes>
        <Route
          exact
          path="/"
          element={<PageWrap><MyComponent /></PageWrap>}
        />
      </Routes>
    </AppProvider>
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  root.render(<ErrorPage message={error.message} />);
});

initialize({
  messages: [],
  requireAuthenticatedUser: false,
  hydrateAuthenticatedUser: true,
});
