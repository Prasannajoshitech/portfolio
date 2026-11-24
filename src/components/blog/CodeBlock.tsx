import { useState, type ReactNode } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

type CodeBlockProps = {
  children?: ReactNode;
  className?: string;
};

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const language = className?.replace("language-", "") || "code";

  const getText = (node: ReactNode): string => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(getText).join("");
    if (node && typeof node === "object" && "props" in node) {
      const el = node as { props?: { children?: ReactNode } };
      return getText(el.props?.children);
    }
    return "";
  };

  const onCopy = async () => {
    const text = getText(children);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="group relative my-6">
      <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          {language}
        </span>
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-2 py-1 text-xs text-muted transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {copied ? <FiCheck aria-hidden /> : <FiCopy aria-hidden />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className={className}>
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}
