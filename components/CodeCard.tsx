import { REDIRECT_URL_STARTS_WITH } from "@/lib/config";
import { ExternalLink } from "lucide-react";
import { LucideHeart } from "lucide-react";
import { Trash } from "lucide-react";

interface CodeCardProps {
  code: string;
  link: string;
  fav?: boolean;
  onFavClick: (code: string) => void;
  handleDeleteCode: (code: string) => void;
}

export const CodeCard = ({
  code,
  link,
  fav,
  onFavClick,
  handleDeleteCode,
}: CodeCardProps) => {
  const handleClick = () => {
    const javLink = localStorage.getItem("javLink");

    if (javLink && javLink.startsWith(REDIRECT_URL_STARTS_WITH)) {
      window.open(`${javLink}/${code}`, "_blank");
      return;
    }

    window.open(`${link}/${code}`, "_blank");
  };

  return (
    <button className="group relative bg-code-bg border border-code-border rounded-lg p-4 hover:bg-code-hover hover:border-primary/50 transition-all duration-200 text-left hover:cursor-pointer flex justify-between">
      <div className=" flex space-x-4 items-center justify-center">
        <Trash
          onClick={() => {
            handleDeleteCode(code);
          }}
          className="h-4 w-4 text-muted-foreground group-hover:text-red-500 transition-colors"
        />
      </div>
      <div onClick={handleClick} className="flex items-center justify-between">
        <code className="text-primary font-mono font-semibold text-lg">
          {code}
        </code>
        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <div className=" flex space-x-4 items-center justify-center">
        {fav ? (
          <LucideHeart
            onClick={() => {
              onFavClick(code);
            }}
            className="h-4 w-4 group-hover:text-primary transition-colors fill-pink-500 text-pink-500"
          />
        ) : (
          <LucideHeart
            onClick={() => {
              onFavClick(code);
            }}
            className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-"
          />
        )}
      </div>
    </button>
  );
};
