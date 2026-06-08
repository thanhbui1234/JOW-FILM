import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pencil, Trash2, Plus, Palette, Clock, MapPin } from "lucide-react";
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
import type { ReelItem, SectionConfig } from "@/types";

export function WeddingReelsPage() {
  const { state, dispatch } = useAdmin();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ReelItem | null>(null);

  const configForm = useForm<SectionConfig>({
    defaultValues: state.reels.config,
  });
  const configDirty = configForm.formState.isDirty;

  const itemForm = useForm<ReelItem>({
    defaultValues: { id: "", title: "", duration: "", location: "" },
  });

  const onConfigSave = (data: SectionConfig) => {
    dispatch({ type: "UPDATE_REELS_CONFIG", payload: data });
  };

  const openAdd = () => {
    setEditingItem(null);
    itemForm.reset({ id: `reel-${Date.now()}`, title: "", duration: "", location: "" });
    setDialogOpen(true);
  };

  const openEdit = (item: ReelItem) => {
    setEditingItem(item);
    itemForm.reset(item);
    setDialogOpen(true);
  };

  const onItemSubmit = (data: ReelItem) => {
    if (editingItem) {
      dispatch({ type: "UPDATE_REEL", payload: data });
    } else {
      dispatch({ type: "ADD_REEL", payload: data });
    }
    setDialogOpen(false);
  };

  const onDelete = (id: string) => {
    dispatch({ type: "DELETE_REEL", payload: id });
  };

  return (
    <div className="space-y-6">
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
                  <input
                    type="color"
                    className="h-9 w-14 cursor-pointer rounded-lg border-2 border-muted p-0.5"
                    {...configForm.register("backgroundColor")}
                  />
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

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Reels</CardTitle>
            <CardDescription>{state.reels.items.length} short-form reels</CardDescription>
          </div>
          <Button onClick={openAdd}>
            <Plus className="mr-2 h-4 w-4" /> Add Reel
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {state.reels.items.map((item) => (
              <div
                key={item.id}
                className="group flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{item.title}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </span>
                  </div>
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Reel" : "Add Reel"}</DialogTitle>
            <DialogDescription>
              {editingItem ? "Update the reel details below" : "Enter the reel details"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={itemForm.handleSubmit(onItemSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Title</Label>
              <Input {...itemForm.register("title")} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Duration</Label>
                <Input {...itemForm.register("duration")} placeholder="0:45" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Location</Label>
                <Input {...itemForm.register("location")} placeholder="Đà Lạt" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{editingItem ? "Update" : "Add Reel"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
