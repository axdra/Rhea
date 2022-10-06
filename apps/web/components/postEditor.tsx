import { FC, HTMLProps, useEffect, useState } from "react";
import 'remirror/styles/all.css';

import { BoldExtension } from 'remirror/extensions';
import { Remirror, useRemirror } from '@remirror/react';
interface IPostEditorProps extends HTMLProps<HTMLDivElement> {
}

const PostEditor: FC<IPostEditorProps> = (props:IPostEditorProps) => {
    const { manager, state } = useRemirror({
        extensions: () => [new BoldExtension()],
        content: '# Hello',
        selection: 'start',
        stringHandler: 'markdown',

    });

    return (
        <div  className="min-h-full max-w-7xl w-full flex-1 prose">
            <Remirror manager={manager} initialContent={state}  />
        </div>
    );
}
export default PostEditor;