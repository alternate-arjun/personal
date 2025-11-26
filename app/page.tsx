"use client";
import { useEffect, useState } from "react";
import { Code2, Search } from "lucide-react";
import { CategorySection } from "@/components/CategorySection";
import { AddCodeDialog } from "@/components/AddCodeDialog";
import { AddCategoryDialog } from "@/components/AddCategoryDialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { REDIRECT_URL, REDIRECT_URL_STARTS_WITH } from "@/lib/config";
import { Button } from "@/components/ui/button";

interface Code {
  id: string;
  code: string;
  favorite?: boolean;
  link: string | "default";
}

interface Category {
  id: string;
  name: string;
  codeToLinks: Code[];
}

const Index = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [link, setLink] = useState("");

  const fetchCategories = async () => {
    const res = await axios.get("/api/category");
    setCategories(res.data);
    console.log("Fetched categories:", res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCode = async (category: string, code: string) => {
    try {
      const res = await axios.post("/api/javcode", {
        code,
        categoryName: category,
      });

      if (res.status === 200) {
        console.log(res.data, "Code added successfully");
        fetchCategories();
      }
    } catch (error) {
      console.error("Error adding code:", error);
    }
  };

  const handleAddCategory = async (categoryName: string) => {
    try {
      const res = await axios.post("/api/category", { categoryName });

      if (res.status === 200) {
        console.log(res.data, "Category added successfully");
        fetchCategories();
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <Code2 className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Code Links</h1>
            </div>
            <AddCategoryDialog
              existingCategories={Object.keys(categories)}
              onAddCategory={handleAddCategory}
            />
          </div>

          <div className="relative max-w-md flex space-x-2">
            <Input
              type="text"
              placeholder="Set Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <Button
              onClick={() => {
                localStorage.setItem("javLink", link);
              }}
            >
              Set Link
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 pb-24">
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategorySection
                key={category.id}
                title={category.name}
                codes={category.codeToLinks}
                link={
                  link.startsWith(REDIRECT_URL_STARTS_WITH)
                    ? link
                    : REDIRECT_URL
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No categories found.</p>
          </div>
        )}
      </main>

      <AddCodeDialog
        categories={categories.map((cat) => cat.name)}
        onAddCode={handleAddCode}
      />

      <div className=" w-full fixed bottom-0 left-0 bg-background/95 backdrop-blur  border-t border-border p-4 flex justify-between items-center">
        <Button
          onClick={() => {
            localStorage.removeItem("javLink");
          }}
        >
          Remove Local JavLink
        </Button>
      </div>
    </div>
  );
};

export default Index;
