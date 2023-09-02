import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import './index.scss'
import { CloudUploadOutlined, EditOutlined, PlayCircleOutlined, PlusOutlined, PoweroffOutlined } from "@ant-design/icons";
import { Button, Spin, Table } from "antd";
import { useMediaRecorder } from "../../hooks/record";



const DefaultView = (): ReactElement<ReactNode> => {
    const [upAvatar, setUpAvatar] = useState<boolean>(false);
    const [upBg, setUpBg] = useState<boolean>(false);
    const { audioFile, mediaUrl, startRecord, stopRecord } = useMediaRecorder();
    const [audio, setAudio] = useState<string>('');
    const [record, setRecord] = useState<boolean>(false);
    const audioRef: any = useRef(null);
   
   
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
                <input type="file" accept="image/*" />
                <div className="up-btn">
                    <CloudUploadOutlined />
                </div>
                {upAvatar && <div className="up-mask">
                    <Spin />
                </div>}
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
                <audio ref={audioRef} src={audio} controls></audio>
                <div className="upload-btn pub-btn">
                    <CloudUploadOutlined />
                </div>
            </div>
            <p className="public-title">背景图片</p>
            <div className="bg-box">
                <input type="file" accept="image/*" />
                <div className="up-btn">
                    <CloudUploadOutlined />
                </div>
                {upBg && <div className="up-mask">
                    <Spin />
                </div>}
            </div>
            
        </div>
    )
};

export default DefaultView;