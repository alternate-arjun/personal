import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { CodeCard } from "./CodeCard";
import axios from "axios";
import { toast } from "sonner";

interface Code {
  id: string;
  code: string;
  favorite?: boolean; // Optional field for favorite status
}

interface CategorySectionProps {
  title: string;
  codes: Code[];
  link: string; // Optional link prop if needed
  onDeleteCode?: () => void;
}

export const CategorySection = ({
  title,
  codes,
  link,
  onDeleteCode,
}: CategorySectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [codesState, setCodesState] = useState(codes);

  useEffect(() => {
    setCodesState(codes);
  }, [codes]);

  const handleFavClick = async (code: string) => {
    try {
      const res = await axios.post("/api/javcode/fav", {
        code,
      });

      if (res.status === 200) {
        console.log("Favorite status updated successfully");
        // update local state
        const updatedCodes = codesState.map((c) => {
          if (c.code === code) {
            return { ...c, favorite: !c.favorite }; // Toggle favorite status
          }
          return c;
        });
        setCodesState(updatedCodes);
      }
    } catch (error) {
      console.error("Failed to toggle favorite status:", error);
    }
  };

  const handleDeleteCode = async (code: string) => {
    try {
      const res = await axios.delete("/api/javcode", {
        data: { code },
      });

      if (res.status === 200) {
        console.log("Code deleted successfully");
        // update local state
        setCodesState((prev) => prev.filter((c) => c.code !== code));
        onDeleteCode && onDeleteCode();
        toast.success("Code deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete code:", error);
      toast.error("Failed to delete code");
    }
  };

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
        <div className="mt-3 grid grid-cols-1 gap-3 px-2">
          {codesState.map((code) => (
            <CodeCard
              key={code.id}
              code={code.code}
              link={link}
              fav={code.favorite}
              onFavClick={handleFavClick}
              handleDeleteCode={handleDeleteCode}
            />
          ))}
        </div>
      )}
    </div>
  );
};
