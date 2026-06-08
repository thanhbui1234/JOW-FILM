import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useAdmin } from "@/context/admin-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
          <CardTitle>Videos ({state.highlights.items.length})</CardTitle>
          <Button onClick={openAdd}>
            <Plus className="mr-2 h-4 w-4" /> Add Video
          </Button>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {state.highlights.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-3">
                <img
                  src={`https://img.youtube.com/vi/${item.id}/mqdefault.jpg`}
                  alt={item.title}
                  className="h-16 w-28 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEdit(item)}
                    className="rounded p-2 hover:bg-accent"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="rounded p-2 hover:bg-destructive/10 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Video" : "Add Video"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={itemForm.handleSubmit(onItemSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>YouTube Video ID</Label>
              <Input {...itemForm.register("id")} placeholder="e.g. SlQR9iu09bQ" />
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input {...itemForm.register("title")} />
            </div>
            <div className="space-y-2">
              <Label>Subtitle (location)</Label>
              <Input {...itemForm.register("subtitle")} placeholder="e.g. Đà Lạt · Spring 2024" />
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
