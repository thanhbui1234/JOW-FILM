import { useForm } from "react-hook-form";
import { useAdmin } from "@/context/admin-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "shared-ui";
import type { FooterData } from "@/types";

export function FooterConfigPage() {
  const { state, dispatch } = useAdmin();

  const { register, handleSubmit, formState: { isDirty } } = useForm<FooterData>({
    defaultValues: state.footer,
  });

  const onSubmit = (data: FooterData) => {
    dispatch({ type: "UPDATE_FOOTER", payload: data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input {...register("phone")} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" {...register("email")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Input {...register("address")} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Facebook</Label>
            <Input {...register("facebook")} placeholder="https://facebook.com/..." />
          </div>
          <div className="space-y-2">
            <Label>Instagram</Label>
            <Input {...register("instagram")} placeholder="https://instagram.com/..." />
          </div>
          <div className="space-y-2">
            <Label>YouTube</Label>
            <Input {...register("youtube")} placeholder="https://youtube.com/..." />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={!isDirty}>Save Changes</Button>
    </form>
  );
}
