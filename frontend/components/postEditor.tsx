import { FC, HTMLProps } from "react";
import Editor from "rich-markdown-editor";

interface IPostEditorProps extends HTMLProps<HTMLDivElement> {
}
const PostEditor: FC<IPostEditorProps> = (props:IPostEditorProps) => {
    return(<div {...props}>
        <Editor className="prose" />

    </div>)
}
export default PostEditor;