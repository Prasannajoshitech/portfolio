import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";
import CodeBlock from "./CodeBlock";
import "highlight.js/styles/github-dark.css";

type MarkdownProps = {
  content: string;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function Markdown({ content }: MarkdownProps) {
  const components: Components = {
    h2: ({ children }) => {
      const text = String(children);
      const id = slugify(text);
      return (
        <h2 id={id} className="scroll-mt-28">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const text = String(children);
      const id = slugify(text);
      return (
        <h3 id={id} className="scroll-mt-28">
          {children}
        </h3>
      );
    },
    pre: ({ children }) => {
      const child = Array.isArray(children) ? children[0] : children;
      if (
        child &&
        typeof child === "object" &&
        "props" in child &&
        child.props
      ) {
        const props = child.props as { className?: string; children?: unknown };
        return (
          <CodeBlock className={props.className}>
            {props.children as React.ReactNode}
          </CodeBlock>
        );
      }
      return <pre>{children}</pre>;
    },
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-accent underline-offset-2 hover:underline"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  };

  return (
    <div className="prose prose-neutral prose-blog max-w-none prose-lg prose-headings:scroll-mt-28 prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-12 prose-h2:border-b prose-h2:border-border prose-h2:pb-3 prose-h3:mt-8 prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-accent prose-strong:text-ink prose-pre:bg-transparent prose-code:rounded prose-code:bg-accent-soft prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export function extractHeadings(markdown: string) {
  const lines = markdown.split("\n");
  const headings: { id: string; text: string; level: number }[] = [];
  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (match) {
      const text = match[2].replace(/[*_`]/g, "");
      headings.push({
        level: match[1].length,
        text,
        id: slugify(text),
      });
    }
  }
  return headings;
}
