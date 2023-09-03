import { ReactElement, ReactNode, useContext, useEffect, useRef, useState } from "react";
import './index.scss'
import { CloudUploadOutlined, PlayCircleOutlined, PoweroffOutlined } from "@ant-design/icons";
import { Spin, message } from "antd";
import { useMediaRecorder } from "../../hooks/record";
import { DefaultInfo, UpAvatar, UpImage, UpVoice } from "../../request/api";
import { VoiceAdmin } from "../../App";


interface Info {
    audio_url: string,
    avatar_url: string,
    bgimage_url: string
}

const DefaultView = (): ReactElement<ReactNode> => {
    const [upAvatar, setUpAvatar] = useState<boolean>(false);
    const [upBg, setUpBg] = useState<boolean>(false);
    const { audioFile, mediaUrl, startRecord, stopRecord } = useMediaRecorder();
    const [wait, setWait] = useState<boolean>(false);
    const [audio, setAudio] = useState<string>('');
    const [avatarView, setAvatarView] = useState<{ source: string | File, view: string }>({
        source: '',
        view: ''
    });
    const [bgView, setBgView] = useState<{ source: string | File, view: string }>({
        source: '',
        view: ''
    })
    const { state } = useContext(VoiceAdmin)
    const [record, setRecord] = useState<boolean>(false);
    const [infoMsg, setInfoMsg] = useState<Info>({
        audio_url: '',
        avatar_url: '',
        bgimage_url: ''
    });
    const getDefaultInfo = async () => {
        const result = await DefaultInfo({
            sender: state.address
        });
        const { data } = result;
        setInfoMsg({
            audio_url: data.audio_url,
            avatar_url: data.avatar_url,
            bgimage_url: data.bgimage_url
        })
    };
    useEffect(() => {
        getDefaultInfo();
    }, []);
    const uploadVoice = async () => {
        if (!audioFile) {
            message.error('请先录音');
            return
        };
        setWait(true);
        const formdata = new FormData();
        formdata.append('sender', state.address as string);
        formdata.append('audio', audioFile);
        const result: any = await UpVoice(formdata);
        setWait(false);
        const { status } = result;
        if (status !== 200) {
            message.error(result.msg);
            return
        };
        message.success('上传成功');
        getDefaultInfo();
    }
    const audioRef: any = useRef(null);
    const selectAvatar = async (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setAvatarView({
                source: file,
                view: e.target?.result as string
            })
        };
        setUpAvatar(true);
        const formdata = new FormData();
        formdata.append('sender', state.address as string);
        formdata.append('avatar', file);
        const result: any = await UpAvatar(formdata);
        const { status } = result;
        if (status !== 200) {
            message.error(result.msg);
            return
        };
        setUpAvatar(false);
        message.success('上传成功');
        getDefaultInfo();
    };
    const selectBg = async (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setBgView({
                source: file,
                view: e.target?.result as string
            })
        };
        setUpBg(true);
        const formdata = new FormData();
        formdata.append('sender', state.address as string);
        formdata.append('bgimg', file);
        const result: any = await UpImage(formdata);
        const { status } = result;
        if (status !== 200) {
            message.error(result.msg);
            return
        };
        setUpBg(false);
        message.success('上传成功');
        getDefaultInfo();
    }
    useEffect(() => {
        setAudio(mediaUrl);
        setTimeout(() => {
            mediaUrl && audioRef.current.play()
        }, 100)
    }, [mediaUrl]);
    return (
        <div className="default-view">
            <p className="public-title">头像</p>
            <div className="avatar-box">
                <input type="file" accept="image/*" onChange={selectAvatar} />
                <div className="up-btn">
                    <CloudUploadOutlined />
                </div>
                {upAvatar && <div className="up-mask">
                    <Spin />
                </div>}
                <img src={avatarView.view ? avatarView.view : infoMsg.avatar_url} alt="" />
            </div>
            <p className="public-title">默认声音</p>
            <div className="voice-box">
                <div className="record-btn pub-btn" onClick={() => {
                    setRecord(!record)
                    !record ? startRecord() : stopRecord()
                }}>
                    {!record
                        ? <PlayCircleOutlined />
                        : <PoweroffOutlined />
                    }
                </div>
                <audio ref={audioRef} src={audio ? audio : infoMsg.audio_url} controls></audio>
                <div className="upload-btn pub-btn" onClick={() => {
                    uploadVoice()
                }}>
                    {wait ? <Spin /> : <CloudUploadOutlined />}
                </div>
            </div>
            <p className="public-title">背景图片</p>
            <div className="bg-box">
                <input type="file" accept="image/*" onChange={selectBg} />
                <div className="up-btn">
                    <CloudUploadOutlined />
                </div>
                {upBg && <div className="up-mask">
                    <Spin />
                </div>}
                <img src={bgView.view ? bgView.view : infoMsg.bgimage_url} alt="" />
            </div>

        </div>
    )
};

export default DefaultView;