import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { useAdmin } from "@/context/admin-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "shared-ui";
import type { FilmItem, SectionConfig } from "@/types";

export function TraditionalFilmsPage() {
  const { state, dispatch } = useAdmin();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FilmItem | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const configForm = useForm<SectionConfig>({
    defaultValues: state.films.config,
  });
  const configDirty = configForm.formState.isDirty;

  const itemForm = useForm<Omit<FilmItem, "tags">>({
    defaultValues: {
      id: "",
      title: "",
      subtitle: "",
      description: "",
      image: "",
      imageTitle: "",
      imageTopic: "",
      imageDescription: "",
      imageAttributes: "",
    },
  });

  const onConfigSave = (data: SectionConfig) => {
    dispatch({ type: "UPDATE_FILMS_CONFIG", payload: data });
  };

  const openAdd = () => {
    setEditingItem(null);
    setTags([]);
    itemForm.reset({
      id: "",
      title: "",
      subtitle: "",
      description: "",
      image: "",
    });
    setDialogOpen(true);
  };

  const openEdit = (item: FilmItem) => {
    setEditingItem(item);
    setTags(item.tags);
    itemForm.reset(item);
    setDialogOpen(true);
  };

  const onItemSubmit = (data: Omit<FilmItem, "tags">) => {
    const fullItem: FilmItem = { ...data, tags };
    if (editingItem) {
      dispatch({ type: "UPDATE_FILM", payload: fullItem });
    } else {
      dispatch({ type: "ADD_FILM", payload: fullItem });
    }
    setDialogOpen(false);
  };

  const onDelete = (id: string) => {
    dispatch({ type: "DELETE_FILM", payload: id });
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Section Config</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={configForm.handleSubmit(onConfigSave)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input {...configForm.register("title")} />
              </div>
              <div className="space-y-2">
                <Label>Background Color</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    className="h-9 w-12 cursor-pointer rounded border"
                    {...configForm.register("backgroundColor")}
                  />
                  <Input {...configForm.register("backgroundColor")} />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea {...configForm.register("description")} />
            </div>
            <Button type="submit" disabled={!configDirty}>Save Config</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Films ({state.films.items.length})</CardTitle>
          <Button onClick={openAdd}>
            <Plus className="mr-2 h-4 w-4" /> Add Film
          </Button>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {state.films.items.map((item) => (
              <div key={item.id + item.title} className="flex items-center gap-4 py-3">
                <img
                  src={`https://img.youtube.com/vi/${item.id}/mqdefault.jpg`}
                  alt={item.title}
                  className="h-16 w-28 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <Badge key={tag} className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(item)} className="rounded p-2 hover:bg-accent">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => onDelete(item.id)} className="rounded p-2 hover:bg-destructive/10 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Film" : "Add Film"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={itemForm.handleSubmit(onItemSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>YouTube Video ID</Label>
              <Input {...itemForm.register("id")} placeholder="e.g. MoN9ql6Yymw" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input {...itemForm.register("title")} />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input {...itemForm.register("subtitle")} placeholder="Hà Nội · 2024" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea {...itemForm.register("description")} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                  placeholder="Type and press Enter"
                />
                <Button type="button" onClick={addTag}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} className="flex items-center gap-1">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input {...itemForm.register("image")} placeholder="/images/demo/a7.jpg" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Image Title</Label>
                <Input {...itemForm.register("imageTitle")} />
              </div>
              <div className="space-y-2">
                <Label>Image Topic</Label>
                <Input {...itemForm.register("imageTopic")} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Image Description</Label>
                <Input {...itemForm.register("imageDescription")} />
              </div>
              <div className="space-y-2">
                <Label>Image Attributes</Label>
                <Input {...itemForm.register("imageAttributes")} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{editingItem ? "Update" : "Add"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
