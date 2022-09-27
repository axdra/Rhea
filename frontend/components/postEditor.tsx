import { FC, HTMLProps, useEffect, useState } from "react";
import Editor from "rich-markdown-editor";

interface IPostEditorProps extends HTMLProps<HTMLDivElement> {
}

const PostEditor: FC<IPostEditorProps> = (props:IPostEditorProps) => {
    const [mdValue, setValue] = useState<string>('');
    useEffect(() => {
        console.log(mdValue);
    }, [mdValue]);
    
    return (<div {...props}>
        <div data-testid="editor" className="h-full">
            <Editor className="prose"
                defaultValue={""}
                onChange={(value) => {
                    setValue(value());
                }}
                uploadImage={async (file: File) => {return ""}}

            />
        </div>
    </div>)
}
export default PostEditor;