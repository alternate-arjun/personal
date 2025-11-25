import { ExternalLink } from "lucide-react";

interface CodeCardProps {
  code: string;
  link: string;
}

export const CodeCard = ({ code, link }: CodeCardProps) => {
  const handleClick = () => {
    window.location.href = `${link}/${code}`;
  };

  return (
    <button
      onClick={handleClick}
      className="group relative bg-code-bg border border-code-border rounded-lg p-4 hover:bg-code-hover hover:border-primary/50 transition-all duration-200 text-left"
    >
      <div className="flex items-center justify-between gap-2">
        <code className="text-primary font-mono font-semibold text-lg break-all">
          {code}
        </code>
        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
      </div>
      <p className="text-xs text-muted-foreground mt-2 break-all">
        Redirects to: {link}/{code}
      </p>
    </button>
  );
};
