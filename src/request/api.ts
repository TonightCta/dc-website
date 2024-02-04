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
//Upload Collection Poster
export const UploadCollectionPoster = (p: FormData) => post('/collection/poster/upload', p);
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
export const UploadCompetitionPoster = (p: FormData) => post('/competition/updateposter', p);
//Competition NFT List
export const CompetitionNFTList = (p: o) => post('/competition/compitems/list', p);
//Push Screen 2
export const PushScreen2 = (p: o) => post('/admin/homepage/poster2/set', p);
//Join Competition
export const JoinCompetition = (p: o) => post('/compitems/submit', p);
//Screen List 1
export const ScreenList1 = (p: o) => post('/homepage/poster1/list', p);
//Screen List 2
export const ScreenList2 = (p: o) => post('/homepage/poster2/list', p);
//Screen Show List
export const ScreenShowList = (p: o) => post('/homepage/poster/list', p);
//Grallery Class List
export const GrallertCalssList = (p: o) => post('/gallery/class/list', p);
//Default Info
export const DefaultInfo = (p: o) => post('/admin/profile/defaultinfo', p);
//Set Default Period
export const SetDefaultPeriod = (p: o) => post('/admin/gallery/series/setdefault', p);
//Order List
export const OrderList = (p: o) => post('/order/list', p);
//Take off NFT
export const TakeOffNFT = (p: o) => post('/admin/order/off', p);
//Label Add
export const LabelAdd = (p: o) => post('/nft/label/add', p);
//Users List
export const UsersList = (p: o) => post('/admin/user/list', p);
//Users Edit
export const UsersEdit = (p: o) => post('/admin/gallery/user/group/update', p);
//Users Add
export const UsersAdd = (p: o) => post('/admin/gallery/user/group/add', p);
//Users Set
export const UsersSet = (p: o) => post('/admin/gallery/user/group/set', p);
//Group List
export const GroupList = (p: o) => post('/gallery/user/grouplist', p);
//Group Show List
export const GropuShowList = (p: o) => post('/gallery/userlist', p);
//Hide Group
export const HideGroup = (p: o) => post('/admin/gallery/user/group/off', p);
//Update Label
export const UpdateLabel = (p: o) => post('/nft/label/update', p);
//Delete Label
export const DeleteLabel = (p: o) => post('/nft/label/off', p);
//Set Category
export const SetCategory = (p: o) => post('/admin/nft/category/set', p);
//Set Labels
export const SetLabels = (p: o) => post('/admin/nft/label/set', p);
//Up Labels Bg
export const UpLabelsBg = (p: o) => post('/nft/label/uploadicon', p);
//Overview Info
export const OverViewInfo = (p: o) => post('/admin/statistics/info', p);
//Poster Set
export const PosterSet = (p: o) => post('/admin/homepage/poster/set', p);


