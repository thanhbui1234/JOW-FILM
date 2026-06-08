import { useForm } from "react-hook-form";
import { useAdmin } from "@/context/admin-context";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "shared-ui";
import type { AboutData } from "@/types";

export function AboutPage() {
  const { state, dispatch } = useAdmin();

  const { register, handleSubmit, formState: { isDirty } } = useForm<AboutData>({
    defaultValues: state.about,
  });

  const onSubmit = (data: AboutData) => {
    dispatch({ type: "UPDATE_ABOUT", payload: data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={4} {...register("description")} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {state.about.stats.map((_, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Value</Label>
                <Input {...register(`stats.${index}.value`)} />
              </div>
              <div className="space-y-2">
                <Label>Label</Label>
                <Input {...register(`stats.${index}.label`)} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {state.about.images.map((_, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input {...register(`images.${index}.src`)} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input {...register(`images.${index}.description`)} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button type="submit" disabled={!isDirty}>Save Changes</Button>
    </form>
  );
}
