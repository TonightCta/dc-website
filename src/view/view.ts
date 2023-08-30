import React from 'react';

const IndexView = React.lazy(() => import('./index/index'));
const LoginView = React.lazy(() => import('./login/index'));
const NftsView = React.lazy(() => import('./nfts/index'));
const GalleryView = React.lazy(() => import('./gallery/index'));
const CreativeView = React.lazy(() => import('./creative/index'));
const CreatorView = React.lazy(() => import('./creator/index'));
const DefaultView = React.lazy(() => import('./default/index'));

export {
    IndexView,
    LoginView,
    NftsView,
    GalleryView,
    CreativeView,
    CreatorView,
    DefaultView
}