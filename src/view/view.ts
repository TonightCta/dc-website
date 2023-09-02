import React from 'react';

const IndexView = React.lazy(() => import('./index/index'));
const LoginView = React.lazy(() => import('./login/index'));
const NftsView = React.lazy(() => import('./nfts/index'));
const CollectionView = React.lazy(() => import('./collection/index'))
const GalleryView = React.lazy(() => import('./gallery/index'));
const CreativeView = React.lazy(() => import('./creative/index'));
const CreatorView = React.lazy(() => import('./creator/index'));
const DefaultView = React.lazy(() => import('./default/index'));
const CategoryView = React.lazy(() => import('./category/index'));

export {
    IndexView,
    LoginView,
    NftsView,
    CollectionView,
    CategoryView,
    GalleryView,
    CreativeView,
    CreatorView,
    DefaultView
}