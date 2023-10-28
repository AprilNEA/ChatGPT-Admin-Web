import 'katex/dist/katex.min.css';
import { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import RehypeKatex from 'rehype-katex';
import RehypePrsim from 'rehype-prism-plus';
import RemarkBreaks from 'remark-breaks';
import RemarkGfm from 'remark-gfm';
import RemarkMath from 'remark-math';

import { copyToClipboard } from '@/utils/client-utils';

export function PreCode(props: { children: any }) {
  const ref = useRef<HTMLPreElement>(null);

  return (
    <pre ref={ref}>
      <span
        className="copy-code-button"
        onClick={() => {
          if (ref.current) {
            const code = ref.current.innerText;
            copyToClipboard(code);
          }
        }}
      ></span>
      {props.children}
    </pre>
  );
}

/**
 * 渲染 Markdown 文本
 * @param props
 * @constructor
 */
export function Markdown(props: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
      rehypePlugins={[RehypeKatex, [RehypePrsim, { ignoreMissing: true }]]}
      components={{
        pre: PreCode,
      }}
    >
      {props.content}
    </ReactMarkdown>
  );
}
