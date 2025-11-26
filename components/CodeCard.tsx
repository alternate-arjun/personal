import { REDIRECT_URL_STARTS_WITH } from "@/lib/config";
import axios from "axios";
import { ExternalLink } from "lucide-react";
import { Heart, LucideHeart } from "lucide-react";

interface CodeCardProps {
  code: string;
  link: string;
  fav?: boolean;
  onFavClick: (code: string) => void;
}

export const CodeCard = ({ code, link, fav, onFavClick }: CodeCardProps) => {
  const handleClick = () => {
    const javLink = localStorage.getItem("javLink");

    if (javLink && javLink.startsWith(REDIRECT_URL_STARTS_WITH)) {
      window.open(`${javLink}/${code}`, "_blank");
      return;
    }

    window.open(`${link}/${code}`, "_blank");
  };

  return (
    <button
      // onClick={handleClick}
      className="group relative bg-code-bg border border-code-border rounded-lg p-4 hover:bg-code-hover hover:border-primary/50 transition-all duration-200 text-left"
    >
      <div className="flex items-center justify-between gap-2">
        <code className="text-primary font-mono font-semibold text-lg break-all">
          {code}
        </code>
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
          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </button>
  );
};
