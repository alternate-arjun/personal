import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { CodeCard } from "./CodeCard";

interface Code {
  id: string;
  code: string;
  link: string;
}

interface CategorySectionProps {
  title: string;
  codes: Code[];
  link: string; // Optional link prop if needed
}

export const CategorySection = ({
  title,
  codes,
  link,
}: CategorySectionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full text-left py-3 px-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
      >
        {isOpen ? (
          <ChevronDown className="h-5 w-5 text-primary" />
        ) : (
          <ChevronRight className="h-5 w-5 text-primary" />
        )}
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <span className="ml-auto text-sm text-muted-foreground">
          {codes.length} {codes.length === 1 ? "code" : "codes"}
        </span>
      </button>

      {isOpen && (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-2">
          {codes.map((code) => (
            <CodeCard key={code.id} code={code.code} link={link} />
          ))}
        </div>
      )}
    </div>
  );
};
