import { useState } from "react";
import { useForm } from "react-hook-form";
import { Film, Plus } from "lucide-react";
import { useCollection } from "@/context/admin-context";
import { PageContainer } from "@/components/composite/PageContainer";
import { SectionCard } from "@/components/composite/SectionCard";
import { SectionConfigForm } from "@/components/composite/SectionConfigForm";
import { EntityList } from "@/components/composite/EntityList";
import { EntityFormDialog } from "@/components/composite/EntityFormDialog";
import { ConfirmDialog } from "@/components/composite/ConfirmDialog";
import { EmptyState } from "@/components/composite/EmptyState";
import { FormField } from "@/components/composite/FormField";
import { Input } from "shared-ui";
import { Button } from "shared-ui";
import type { HighlightVideo } from "@/types";

const BLANK: HighlightVideo = { id: "", title: "", subtitle: "" };

export function WeddingHighlightsPage() {
  const { config, items, saveConfig, add, update, remove } =
    useCollection("highlights");

  const [dialog, setDialog] = useState<{
    mode: "add" | "edit";
    initial: HighlightVideo;
  } | null>(null);
  const [pendingDelete, setPendingDelete] = useState<HighlightVideo | null>(null);

  const form = useForm<HighlightVideo>({ defaultValues: BLANK });

  const openAdd = () => {
    form.reset(BLANK);
    setDialog({ mode: "add", initial: BLANK });
  };

  const openEdit = (item: HighlightVideo) => {
    form.reset(item);
    setDialog({ mode: "edit", initial: item });
  };

  const submit = form.handleSubmit((values) => {
    if (!dialog) return;
    if (dialog.mode === "add") {
      add(values);
    } else {
      update(values);
    }
    setDialog(null);
  });

  return (
    <PageContainer
      title="Wedding Highlights"
      description="Featured highlight videos. Card-stack carousel on desktop, grid on mobile."
    >
      <SectionConfigForm value={config} onSave={saveConfig} />

      <SectionCard
        icon={<Film className="h-4 w-4" />}
        title="Videos"
        description={`${items.length} videos in rotation`}
        actions={
          <Button size="sm" onClick={openAdd}>
            <Plus className="h-4 w-4" />
            Add video
          </Button>
        }
      >
        <EntityList
          items={items}
          getKey={(item) => item.id}
          onEdit={openEdit}
          onDelete={(item) => setPendingDelete(item)}
          emptyState={
            <EmptyState
              icon={<Film className="h-4 w-4" />}
              title="No highlights yet"
              description="Add a YouTube video to populate the homepage carousel."
              action={
                <Button size="sm" onClick={openAdd}>
                  <Plus className="h-4 w-4" />
                  Add first video
                </Button>
              }
            />
          }
          renderRow={(item) => (
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
                <img
                  src={`https://img.youtube.com/vi/${item.id}/mqdefault.jpg`}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{item.title}</p>
                <p className="truncate text-xs text-muted-foreground">{item.subtitle}</p>
              </div>
            </div>
          )}
        />
      </SectionCard>

      <EntityFormDialog
        open={dialog !== null}
        onOpenChange={(open) => !open && setDialog(null)}
        mode={dialog?.mode ?? "add"}
        entityLabel="Video"
        description="YouTube ID, caption shown on the card."
        onSubmit={submit}
      >
        <FormField label="YouTube video ID" htmlFor="hl-id">
          <Input id="hl-id" placeholder="SlQR9iu09bQ" {...form.register("id")} />
        </FormField>
        <FormField label="Title" htmlFor="hl-title">
          <Input id="hl-title" {...form.register("title")} />
        </FormField>
        <FormField label="Subtitle" htmlFor="hl-sub">
          <Input
            id="hl-sub"
            placeholder="Đà Lạt · Spring 2024"
            {...form.register("subtitle")}
          />
        </FormField>
      </EntityFormDialog>

      <ConfirmDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title="Delete this highlight?"
        description={
          pendingDelete
            ? `"${pendingDelete.title}" will be removed from the homepage carousel.`
            : undefined
        }
        confirmLabel="Delete"
        destructive
        onConfirm={() => pendingDelete && remove(pendingDelete.id)}
      />
    </PageContainer>
  );
}
