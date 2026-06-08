import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pencil, Trash2, Plus, Palette, Play } from "lucide-react";
import { useAdmin } from "@/context/admin-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "shared-ui";
import type { HighlightVideo, SectionConfig } from "@/types";

export function WeddingHighlightsPage() {
  const { state, dispatch } = useAdmin();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<HighlightVideo | null>(null);

  const configForm = useForm<SectionConfig>({
    defaultValues: state.highlights.config,
  });
  const configDirty = configForm.formState.isDirty;

  const itemForm = useForm<HighlightVideo>({
    defaultValues: { id: "", title: "", subtitle: "" },
  });

  const onConfigSave = (data: SectionConfig) => {
    dispatch({ type: "UPDATE_HIGHLIGHTS_CONFIG", payload: data });
  };

  const openAdd = () => {
    setEditingItem(null);
    itemForm.reset({ id: "", title: "", subtitle: "" });
    setDialogOpen(true);
  };

  const openEdit = (item: HighlightVideo) => {
    setEditingItem(item);
    itemForm.reset(item);
    setDialogOpen(true);
  };

  const onItemSubmit = (data: HighlightVideo) => {
    if (editingItem) {
      dispatch({ type: "UPDATE_HIGHLIGHT", payload: data });
    } else {
      dispatch({ type: "ADD_HIGHLIGHT", payload: data });
    }
    setDialogOpen(false);
  };

  const onDelete = (id: string) => {
    dispatch({ type: "DELETE_HIGHLIGHT", payload: id });
  };

  return (
    <div className="space-y-6">
      {/* Section Config */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Section Settings</CardTitle>
          </div>
          <CardDescription>Configure how this section appears on the website</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={configForm.handleSubmit(onConfigSave)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Title</Label>
                <Input {...configForm.register("title")} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Background Color</Label>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="color"
                      className="h-9 w-14 cursor-pointer rounded-lg border-2 border-muted p-0.5"
                      {...configForm.register("backgroundColor")}
                    />
                  </div>
                  <Input {...configForm.register("backgroundColor")} className="font-mono text-sm" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Description</Label>
              <Textarea {...configForm.register("description")} rows={3} />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={!configDirty}>Save Config</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Videos list */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Videos</CardTitle>
            <CardDescription>{state.highlights.items.length} highlight videos</CardDescription>
          </div>
          <Button onClick={openAdd}>
            <Plus className="mr-2 h-4 w-4" /> Add Video
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {state.highlights.items.map((item) => (
              <div
                key={item.id}
                className="group flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-md">
                  <img
                    src={`https://img.youtube.com/vi/${item.id}/mqdefault.jpg`}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                    <Play className="h-5 w-5 text-white" fill="white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => openEdit(item)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Video" : "Add Video"}</DialogTitle>
            <DialogDescription>
              {editingItem ? "Update the video details below" : "Enter the YouTube video details"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={itemForm.handleSubmit(onItemSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">YouTube Video ID</Label>
              <Input {...itemForm.register("id")} placeholder="e.g. SlQR9iu09bQ" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Title</Label>
              <Input {...itemForm.register("title")} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Subtitle (location)</Label>
              <Input {...itemForm.register("subtitle")} placeholder="e.g. Đà Lạt · Spring 2024" />
            </div>
            <DialogFooter>
              <Button type="submit">{editingItem ? "Update" : "Add Video"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
