import { Button, Modal } from "antd";
import { ReactElement, useContext, useEffect, useState } from "react";
import { DataType } from "..";
import { CloudUploadOutlined } from "@ant-design/icons";
import { VoiceAdmin } from "../../../App";
import { CollectionEdit, CollectionAdd, UploadCollectionBG, UploadCollectionLogo } from '../../../request/api'

interface Props {
    visible: boolean,
    closeModal: (val: boolean) => void,
    info: DataType | undefined
}

interface Input {
    name: string,
    desc: string,
    earnings: string,
    website: string,
    twitter: string,
    discord: string,
    telegram: string,
    medium: string
}

const EditCollectionModal = (props: Props): ReactElement => {
    const [visible, setVisible] = useState<boolean>(false);
    const [wait, setWait] = useState<boolean>(false);
    const { state } = useContext(VoiceAdmin);
    const [input, setInput] = useState<Input>({
        name: '',
        desc: '',
        earnings: '',
        website: '',
        twitter: '',
        discord: '',
        telegram: '',
        medium: ''
    });
    const [bgView, setBgView] = useState<{ source: File | string, view: string }>({
        source: '',
        view: ''
    });
    const [logoView, setLogoView] = useState<{ source: File | string, view: string }>({
        source: '',
        view: ''
    });
    const selectBgFile = (e: any) => {
        const file = e.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setBgView({
                source: file,
                view: e.target?.result as string
            })
        }
    }
    const selectLogoFile = (e: any) => {
        const file = e.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setLogoView({
                source: file,
                view: e.target?.result as string
            })
        }
    }
    const handleCancel = () => {
        setVisible(false);
        props.closeModal(false);
    };
    useEffect(() => {
        setVisible(props.visible);
        const { info } = props;
        setInput({
            ...input,
            name: info?.collection_name || '',
            desc: info?.collection_description || '',
            website: info?.website_link || '',
            twitter: info?.twitter_link || '',
            discord: info?.discord_link || '',
            telegram: info?.tg_link || '',
            medium: info?.medium_link || ''
        })
    }, [props.visible]);
    const submitEdit = async () => {
        setWait(true);
        const params = {
            category_id:'1',
            user_address: state.address,
            collection_name: input.name,
            collection_description: input.desc,
            creator_earnings: input.earnings,
            chain_id: '8007736',
            contract_address: '0xa2822ac2662fe0cbf470d5721e24f8508ec43d33',
            contract_type: 'ERC721',
            website_link: input.website,
            twitter_link: input.twitter,
            discord_link: input.discord,
            tg_link: input.telegram,
            medium_link: input.medium
        };
        const paramsEdit = {
            ...params,
            category_id: props.info?.collection_id,
        };
        
        const result = props.info?.collection_id ? await CollectionEdit(paramsEdit) : await CollectionAdd(params);
        setWait(false);
        console.log(result);
        // if (bgView.source) {
        //     const formdata = new FormData();
        //     formdata.append('collection_id','');
        //     formdata.append('bgimg',bgView.source);
        //     const result = await UploadCollectionBG(formdata);
        //     console.log(result);
        // }
        // if (logoView.source) {
        //     const formdata = new FormData();
        //     formdata.append('collection_id','');
        //     formdata.append('avatar',bgView.source);
        //     const result = await UploadCollectionLogo(formdata);
        //     console.log(result);
        // }
    }
    return (
        <Modal title={`${props.info?.collection_id ? 'Edit' : 'Add to'} Collection`} width={600} footer={null} open={visible} onCancel={handleCancel}>
            <div className="edit-collection">
                <ul>
                    <li>
                        <p className="edit-label">Collection name</p>
                        <input type="text" placeholder="Please enter the collection name" value={input.name} onChange={(e) => {
                            setInput({
                                ...input,
                                name: e.target.value
                            })
                        }} />
                    </li>
                    <li>
                        <p className="edit-label">Collection description</p>
                        <textarea placeholder="Please enter the collection description" value={input.desc} onChange={(e) => {
                            setInput({
                                ...input,
                                desc: e.target.value
                            })
                        }} />
                    </li>
                    <li>
                        <p className="edit-label">Creator earnings</p>
                        <input type="text" placeholder="Please enter the creator earnings" value={input.earnings} onChange={(e) => {
                            setInput({
                                ...input,
                                earnings: e.target.value
                            })
                        }} />
                    </li>
                    <li>
                        <p className="edit-label">Website link</p>
                        <input type="text" placeholder="Please enter the website link" value={input.website} onChange={(e) => {
                            setInput({
                                ...input,
                                website: e.target.value
                            })
                        }} />
                    </li>
                    <li>
                        <p className="edit-label">Twitter link</p>
                        <input type="text" placeholder="Please enter the twitter link" value={input.twitter} onChange={(e) => {
                            setInput({
                                ...input,
                                twitter: e.target.value
                            })
                        }} />
                    </li>
                    <li>
                        <p className="edit-label">Discord link</p>
                        <input type="text" placeholder="Please enter the discord link" value={input.discord} onChange={(e) => {
                            setInput({
                                ...input,
                                discord: e.target.value
                            })
                        }} />
                    </li>
                    <li>
                        <p className="edit-label">Telegram link</p>
                        <input type="text" placeholder="Please enter the telegram link" value={input.telegram} onChange={(e) => {
                            setInput({
                                ...input,
                                telegram: e.target.value
                            })
                        }} />
                    </li>
                    <li>
                        <p className="edit-label">Medium link</p>
                        <input type="text" placeholder="Please enter the medium link" value={input.medium} onChange={(e) => {
                            setInput({
                                ...input,
                                medium: e.target.value
                            })
                        }} />
                    </li>
                    <li>
                        <p className="edit-label">Background image</p>
                        <div className="up-load-bg-box">
                            <img src={bgView.view ? bgView.view : props.info?.bg_image_minio_url} alt="" />
                            <input type="file" accept="image/*" onChange={selectBgFile} />
                            <div className="up-mask">
                                <CloudUploadOutlined />
                            </div>
                        </div>
                    </li>
                    <li>
                        <p className="edit-label">Logo image</p>
                        <div className="up-load-logo-box">
                            <img src={logoView.view ? logoView.view : props.info?.logo_minio_url} alt="" onChange={selectLogoFile} />
                            <input type="file" accept="image/*" />
                            <div className="up-mask">
                                <CloudUploadOutlined />
                            </div>
                        </div>
                    </li>
                </ul>
                <div className="submit-btn">
                    <Button type="default" onClick={handleCancel}>Cancel</Button>
                    <Button type="primary" disabled={wait} loading={wait} onClick={submitEdit}>Confirm</Button>
                </div>
            </div>
        </Modal>
    )
};

export default EditCollectionModal;