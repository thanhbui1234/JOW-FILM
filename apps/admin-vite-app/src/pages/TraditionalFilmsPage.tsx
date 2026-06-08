import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Plus, Trash2, Video } from "lucide-react";
import { useCollection } from "@/context/admin-context";
import { PageContainer } from "@/components/composite/PageContainer";
import { SectionCard } from "@/components/composite/SectionCard";
import { SectionConfigForm } from "@/components/composite/SectionConfigForm";
import { EntityList } from "@/components/composite/EntityList";
import { EntityFormDialog } from "@/components/composite/EntityFormDialog";
import { ConfirmDialog } from "@/components/composite/ConfirmDialog";
import { EmptyState } from "@/components/composite/EmptyState";
import { FormField } from "@/components/composite/FormField";
import { TagInput } from "@/components/composite/TagInput";
import { Badge } from "shared-ui";
import { Input } from "shared-ui";
import { Textarea } from "shared-ui";
import { Button } from "shared-ui";
import type { FilmItem, FilmPreviewImage } from "@/types";

const blankPreviewImage = (): FilmPreviewImage => ({
  src: "",
  title: "",
  topic: "",
  description: "",
  attribute: "",
});

const blankFilm = (): FilmItem => ({
  id: `film-${Date.now().toString(36)}`,
  title: "",
  subtitle: "",
  description: "",
  tags: [],
  image: "",
  previewImages: [],
});

export function TraditionalFilmsPage() {
  const { config, items, saveConfig, add, update, remove } = useCollection("films");

  const [dialog, setDialog] = useState<{ mode: "add" | "edit" } | null>(null);
  const [pendingDelete, setPendingDelete] = useState<FilmItem | null>(null);

  const form = useForm<FilmItem>({ defaultValues: blankFilm() });
  const previewImages = useFieldArray({ control: form.control, name: "previewImages" });

  const openAdd = () => {
    form.reset(blankFilm());
    setDialog({ mode: "add" });
  };

  const openEdit = (item: FilmItem) => {
    form.reset(item);
    setDialog({ mode: "edit" });
  };

  const submit = form.handleSubmit((values) => {
    if (!dialog) return;
    if (dialog.mode === "add") add(values);
    else update(values);
    setDialog(null);
  });

  return (
    <PageContainer
      title="Traditional Films"
      description="Long-form films featured in the heritage section."
    >
      <SectionConfigForm value={config} onSave={saveConfig} />

      <SectionCard
        icon={<Video className="h-4 w-4" />}
        title="Films"
        description={`${items.length} films published`}
        actions={
          <Button size="sm" onClick={openAdd}>
            <Plus className="h-4 w-4" />
            Add film
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
              icon={<Video className="h-4 w-4" />}
              title="No films yet"
              description="Publish your first traditional film to populate the homepage row."
              action={
                <Button size="sm" onClick={openAdd}>
                  <Plus className="h-4 w-4" />
                  Add first film
                </Button>
              }
            />
          }
          renderRow={(item) => (
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.title}</p>
                <p className="truncate text-xs text-muted-foreground">{item.subtitle}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="border-transparent bg-muted text-[10px] font-medium text-foreground/70"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        />
      </SectionCard>

      <EntityFormDialog
        open={dialog !== null}
        onOpenChange={(open) => !open && setDialog(null)}
        mode={dialog?.mode ?? "add"}
        entityLabel="Film"
        onSubmit={submit}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Title" htmlFor="film-title">
            <Input id="film-title" {...form.register("title")} />
          </FormField>
          <FormField label="Subtitle" htmlFor="film-sub">
            <Input
              id="film-sub"
              placeholder="Hà Nội · 2024"
              {...form.register("subtitle")}
            />
          </FormField>
        </div>
        <FormField label="Description" htmlFor="film-desc">
          <Textarea id="film-desc" rows={3} {...form.register("description")} />
        </FormField>
        <FormField label="Image source" htmlFor="film-image">
          <Input
            id="film-image"
            placeholder="/images/demo/a7.jpg"
            {...form.register("image")}
          />
        </FormField>
        <FormField label="Tags">
          <Controller
            control={form.control}
            name="tags"
            render={({ field }) => (
              <TagInput value={field.value} onChange={field.onChange} />
            )}
          />
        </FormField>

        <div className="space-y-3 rounded-lg border border-border/60 bg-muted/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Preview images</p>
              <p className="text-xs text-muted-foreground">
                Each image carries its own title, topic, description and attribute.
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => previewImages.append(blankPreviewImage())}
            >
              <Plus className="h-4 w-4" />
              Add image
            </Button>
          </div>

          {previewImages.fields.length === 0 ? (
            <p className="rounded-md border border-dashed bg-background px-3 py-6 text-center text-xs text-muted-foreground">
              No preview images yet.
            </p>
          ) : (
            <div className="space-y-3">
              {previewImages.fields.map((field, index) => (
                <div
                  key={field.id}
                  className="space-y-3 rounded-md border border-border/60 bg-background p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      Image {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => previewImages.remove(index)}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Remove image"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <FormField label="Image source">
                    <Input
                      placeholder="/images/demo/a7.jpg"
                      {...form.register(`previewImages.${index}.src` as const)}
                    />
                  </FormField>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <FormField label="Image title">
                      <Input
                        {...form.register(`previewImages.${index}.title` as const)}
                      />
                    </FormField>
                    <FormField label="Image topic">
                      <Input
                        {...form.register(`previewImages.${index}.topic` as const)}
                      />
                    </FormField>
                  </div>
                  <FormField label="Image description">
                    <Textarea
                      rows={2}
                      {...form.register(`previewImages.${index}.description` as const)}
                    />
                  </FormField>
                  <FormField label="Image attribute">
                    <Input
                      placeholder="Location, year, etc."
                      {...form.register(`previewImages.${index}.attribute` as const)}
                    />
                  </FormField>
                </div>
              ))}
            </div>
          )}
        </div>
      </EntityFormDialog>

      <ConfirmDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title="Delete this film?"
        description={
          pendingDelete
            ? `"${pendingDelete.title}" will be removed from the heritage grid.`
            : undefined
        }
        confirmLabel="Delete"
        destructive
        onConfirm={() => pendingDelete && remove(pendingDelete.id)}
      />
    </PageContainer>
  );
}
