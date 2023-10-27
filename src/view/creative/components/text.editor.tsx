import { ReactElement, useEffect, useState } from "react";
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

interface Props {
    visible: boolean,
    desc:string,
    updateHtml: (val: string) => void
}

const TextEditor = (props: Props): ReactElement => {
    const [editor, setEditor] = useState<IDomEditor | null>(null);
    const [html, setHtml] = useState(props.desc);
    const toolbarConfig: Partial<IToolbarConfig> = {};
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
        placeholder: 'Please enter the description...',
    };
    useEffect(() => {
        console.log(html);
        props.updateHtml(html);
    }, [html])
    useEffect(() => {
        const next = () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
        !props.visible && next();
        return () => {
            next();
        }
    }, [editor, props.visible])
    return (
        <div className="text-editor">
            <Toolbar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode="default"
                style={{ borderBottom: '1px solid #ccc' }}
            />
            <Editor
                defaultConfig={editorConfig}
                value={html}
                onCreated={setEditor}
                onChange={editor => setHtml(editor.getHtml())}
                mode="default"
                style={{ height: '300px', overflowY: 'hidden' }}
            />
        </div>
    )
};

export default TextEditor;