import { useState } from "react";
import { FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AddCategoryDialogProps {
  existingCategories: string[];
  onAddCategory: (category: string) => void;
}

export const AddCategoryDialog = ({
  existingCategories,
  onAddCategory,
}: AddCategoryDialogProps) => {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = categoryName.trim();

    if (!trimmedName) {
      toast.error("Category name cannot be empty");
      return;
    }

    if (existingCategories.includes(trimmedName)) {
      toast.error("This category already exists");
      return;
    }

    onAddCategory(trimmedName);

    toast.success("Category created!");

    setCategoryName("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <FolderPlus className="h-4 w-4" />
          <span className="hidden sm:inline">New Category</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>
            Add a new category to organize your code links.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="categoryName">Category Name</Label>
            <Input
              id="categoryName"
              placeholder="e.g., Projects, Tools, APIs"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              maxLength={50}
            />
          </div>

          <Button type="submit" className="w-full">
            Create Category
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
