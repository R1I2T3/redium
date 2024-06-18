import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      className={"space-y-4"}
      components={{
        ul: (props) => <ul className="list-disc list-inside" {...props} />,
        p: (props) => <p className="text-justify" {...props} />,
        ol: (props) => <ol className="list-inside  list-decimal" {...props} />,
        li: (props) => <li className="text-justify" {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
