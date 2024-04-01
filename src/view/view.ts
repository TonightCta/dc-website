import React from 'react';

const IndexView = React.lazy(() => import('./index/index'));
const PageView = React.lazy(() => import('./page/index'))
export {
    IndexView,
    PageView
}