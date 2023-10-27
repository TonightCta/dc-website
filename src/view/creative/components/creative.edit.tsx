import { Button, DatePicker, Modal, message } from "antd";
import { ReactElement, useEffect, useState } from "react";
import { DataType } from "..";
import { CloudUploadOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import { CompetitionEdit, CompetitionAdd, UploadCompetitionPoster, UploadCompetitionBG, UploadCompetitionLogo } from '../../../request/api'
import type { DatePickerProps } from 'antd';
import { DateConvert } from "../../../utils";
import TextEditor from "./text.editor";


interface Props {
    visible: boolean,
    closeModal: (val: boolean) => void,
    info: DataType | undefined,
    upDate: () => void
}

interface Input {
    name: string,
    desc: string,
    start_time: string,
    end_time: string,
}

const EditCompetitionModal = (props: Props): ReactElement => {
    const [visible, setVisible] = useState<boolean>(false);
    const [wait, setWait] = useState<boolean>(false);
    const [input, setInput] = useState<Input>({
        name: '',
        desc: '',
        start_time: DateConvert(new Date().getTime() / 1000),
        end_time: DateConvert(new Date().getTime() / 1000)
    });
    const [bgView, setBgView] = useState<{ source: File | string, view: string }>({
        source: '',
        view: ''
    });
    const [logoView, setLogoView] = useState<{ source: File | string, view: string }>({
        source: '',
        view: ''
    });
    const [posterView, setPosterView] = useState<{ source: File | string, view: string }>({
        source: '',
        view: ''
    });
    const selectPosterFile = (e: any) => {
        const file = e.target.files[0];
        if (!file) {
            return
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setPosterView({
                source: file,
                view: e.target?.result as string
            })
        }
    }
    const selectBgFile = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        if (!file) {
            return
        }
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setBgView({
                source: file,
                view: e.target?.result as string
            })
        }
    }
    const selectLogoFile = (e: any) => {
        const file = e.target.files[0];
        if (!file) {
            return
        }
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
            name: info?.name || '',
            desc: info?.description || '',
            start_time: DateConvert(info?.start_time ? info?.start_time : new Date().getTime() / 1000),
            end_time: DateConvert(info?.end_time ? info?.end_time : new Date().getTime() / 1000)
        })
    }, [props.visible]);
    const onStartTime: DatePickerProps['onChange'] = (date, dateString) => {
        setInput({
            ...input,
            start_time: dateString
        })
    }
    const onEndTime: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString)
        setInput({
            ...input,
            end_time: dateString
        })
    }
    const submitEdit = async () => {
        setWait(true);
        const params = {
            name: input.name,
            description: input.desc,
            start_time: new Date(input.start_time).getTime() / 1000,
            end_time: new Date(input.end_time).getTime() / 1000
        };
        const paramsEdit = {
            ...params,
            competition_id: props.info?.competition_id,
        };

        const result: any = props.info?.competition_id ? await CompetitionEdit(paramsEdit) : await CompetitionAdd(params);
        const { status, data } = result;
        if (status !== 200) {
            message.error(result.msg)
            return
        };
        if (bgView.source) {
            const formdata = new FormData();
            formdata.append('competition_id', props.info?.competition_id ? props.info?.competition_id : data.competition_id);
            formdata.append('bgimg', bgView.source);
            const up = await UploadCompetitionBG(formdata);
        }
        if (posterView.source) {
            const formdata = new FormData();
            formdata.append('competition_id', props.info?.competition_id ? props.info?.competition_id : data.competition_id);
            formdata.append('poster', posterView.source);
            const up = await UploadCompetitionPoster(formdata);
        }
        if (logoView.source) {
            const formdata = new FormData();
            formdata.append('competition_id', props.info?.competition_id ? props.info?.competition_id : data.competition_id);
            formdata.append('logo', logoView.source);
            const up = await UploadCompetitionLogo(formdata);
        };
        message.success('提交成功');
        handleCancel();
        setBgView({
            view: '',
            source: ''
        });
        setLogoView({
            view: '',
            source: ''
        })
        setPosterView({
            view: '',
            source: ''
        })
        props.upDate();
        setWait(false);
    }
    return (
        <Modal title={`${props.info?.competition_id ? 'Edit' : 'Add to'} Competition`} width={800} footer={null} open={visible} onCancel={handleCancel}>
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
                    <li className="other-text">
                        <p className="edit-label">Collection description</p>
                        <TextEditor desc={input.desc} visible={visible} updateHtml={(val: string) => {
                            setInput({
                                ...input,
                                desc: val
                            })
                        }} />
                    </li>
                    <li>
                        <p className="edit-label">Start time</p>
                        <DatePicker defaultValue={dayjs(input.start_time)} onChange={onStartTime} />
                    </li>
                    <li>
                        <p className="edit-label">End time</p>
                        <DatePicker defaultValue={dayjs(input.end_time)} onChange={onEndTime} />
                    </li>
                    <li>
                        <p className="edit-label">Background image</p>
                        <div className="up-load-bg-box">
                            <img src={bgView.view ? bgView.view : props.info?.bg_image_minio} alt="" />
                            <input type="file" accept="image/*" onChange={selectBgFile} />
                            <div className="up-mask">
                                <CloudUploadOutlined />
                            </div>
                        </div>
                    </li>
                    <li>
                        <p className="edit-label">Poster image</p>
                        <div className="up-load-bg-box">
                            <img src={posterView.view ? posterView.view : props.info?.poster_minio} alt="" />
                            <input type="file" accept="image/*" onChange={selectPosterFile} />
                            <div className="up-mask">
                                <CloudUploadOutlined />
                            </div>
                        </div>
                    </li>
                    <li>
                        <p className="edit-label">Logo image</p>
                        <div className="up-load-logo-box">
                            <img src={logoView.view ? logoView.view : props.info?.logo_minio} alt="" />
                            <input type="file" accept="image/*" onChange={selectLogoFile} />
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

export default EditCompetitionModal;