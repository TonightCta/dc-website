import { post, get } from './index';

type o = {};

//Check Account
export const CheckAccount = (p: o) => post('/admin/is_admin', p);
//All NFTs
export const AllNfts = (p: o) => post('/admin/nft/list', p);
//Category List
export const CategoryList = (p: o) => post('/category/list', p);
//Collection List
export const CollectionList = (p: o) => post('/collection/list', p);
//Label List
export const LabelList = (p: o) => post('/nft/label/list', p);
//Up Avatar
export const UpAvatar = (p: o) => post('/admin/profile/uploadavatar', p);
//Up Image
export const UpImage = (p: o) => post('/admin/profile/uploadbgimg', p);
//Up Voice
export const UpVoice = (p: o) => post('/admin/profile/uploadaudio', p);
//Category Add
export const CategoryAdd = (p: o) => post('/admin/category/add', p);
//Category Edit
export const CategoryEdit = (p: o) => post('/admin/category/update', p);
//Gallery Period
export const GalleryPeriod = (p: o) => post('/gallery/series/list', p);
//Gallery List
export const GalleryList = (p: o) => post('/gallery/list', p);
//Gallery Add
export const GalleryAdd = (p: o) => post('/admin/gallery/series/add', p);
//Gallert Edit 
export const GalleryEdit = (p: o) => post('/admin/gallery/series/update', p);
//Push Screen
export const PushScreen = (p: o) => post('/admin/homepage/poster1/set', p);
//Set Gallery
export const SetGallery = (p: o) => post('/admin/gallery/set', p);
//Collection Add
export const CollectionAdd = (p: o) => post('/collection/add', p);
//Collection Info
export const CollectionInfo = (p: o) => post('/collection/info', p);
//Collection Edit
export const CollectionEdit = (p: o) => post('/collection/update', p);
//Collection NFT List
export const CollectionNFTList = (p: o) => post('/collection/nft/list', p);
//Upload Collection BG
export const UploadCollectionBG = (p: FormData) => post('/collection/bgimg/upload', p);
//Upload Collection Logo
export const UploadCollectionLogo = (p: FormData) => post('/collection/logo/upload', p);
//Competition List
export const CompetitionList = (p: o) => post('/competition/list', p);
//Competition Add
export const CompetitionAdd = (p: o) => post('/competition/add', p);
//Competition Edit
export const CompetitionEdit = (p: o) => post('/competition/update', p);
//Upload Competition Logo
export const UploadCompetitionLogo = (p: FormData) => post('/competition/uploadlogo', p);
//Upload Competition BG
export const UploadCompetitionBG = (p: FormData) => post('/competition/uploadbgimg', p);
//Upload Competition Poster
export const UploadCompetitionPoster = (p:FormData) => post('/competition/updateposter',p);
//Competition NFT List
export const CompetitionNFTList = (p: o) => post('/competition/compitems/list', p);


