import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  ExternalLink,
  Film,
  Loader2,
  Play,
  Sliders,
  Trash2,
  Video as VideoIcon,
  Check,
} from "lucide-react";
import {
  Button,
  Input,
  Textarea,
  Switch,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "shared-ui";
import { PageContainer } from "@/components/composite/PageContainer";
import { SectionCard } from "@/components/composite/SectionCard";
import { FormField } from "@/components/composite/FormField";
import { SaveBar } from "@/components/composite/SaveBar";
import {
  videoApi,
  getApiErrorMessage,
  extractApiError,
  VIDEO_CATEGORIES,
  type VideoRecord,
  type UpdateVideoRequest,
} from "@/shared/api";
import { triggerNextJsRevalidate } from "@/shared/api/revalidate";
import { toast } from "sonner";

interface VideoFormData {
  title: string;
  description: string;
  category: number | string;
  visible: boolean;
  youtubeVideoId: string;
}

function getFormValuesFromVideo(video: VideoRecord): VideoFormData {
  return {
    title: video.title || "",
    description: video.description || "",
    category: video.category ?? (video.categoryId && video.categoryId >= 1 && video.categoryId <= 4 ? video.categoryId : 1),
    visible: video.visible !== false,
    youtubeVideoId: video.youtubeVideoId || "",
  };
}

export function VideoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const videoId = Number(id);

  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const {
    data: video,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["video-detail", videoId],
    queryFn: async () => {
      const res = await videoApi.getById(videoId);
      if (res.data?.error) {
        throw new Error(getApiErrorMessage(res.data.error.errorCode, res.data.error.errorMsg));
      }
      return res.data.data.video;
    },
    initialData: () => {
      const cached = queryClient.getQueryData<VideoRecord[] | { videos?: VideoRecord[] }>(["video-list"]);
      if (Array.isArray(cached)) {
        return cached.find((v) => v.id === videoId);
      }
      if (cached && Array.isArray((cached as any).videos)) {
        return (cached as any).videos.find((v: VideoRecord) => v.id === videoId);
      }
      return undefined;
    },
    enabled: !isNaN(videoId) && videoId > 0,
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isDirty },
  } = useForm<VideoFormData>({
    defaultValues: {
      title: "",
      description: "",
      category: 1,
      visible: true,
      youtubeVideoId: "",
    },
  });

  useEffect(() => {
    if (video) {
      reset(getFormValuesFromVideo(video));
    }
  }, [video, reset]);

  const handleSave = async (data: VideoFormData) => {
    if (!videoId) return;
    setIsSaving(true);
    try {
      const payload: UpdateVideoRequest = {
        videoId,
        title: data.title.trim(),
        description: data.description,
        category: Number(data.category) || undefined,
        visible: Boolean(data.visible),
      };

      if (data.youtubeVideoId?.trim()) {
        payload.youtubeVideoId = data.youtubeVideoId.trim();
      }

      const res = await videoApi.update(payload);

      if (res.data?.error) {
        const { errorCode, errorMsg } = res.data.error;
        toast.error(getApiErrorMessage(errorCode, errorMsg));
        return;
      }

      toast.success("Cập nhật video thành công!");
      triggerNextJsRevalidate("videos");
      queryClient.invalidateQueries({ queryKey: ["video-list"] });
      queryClient.invalidateQueries({ queryKey: ["video-detail", videoId] });
      reset(data);
    } catch (err) {
      console.error(err);
      const { errorCode, errorMsg } = extractApiError(err);
      toast.error(getApiErrorMessage(errorCode, errorMsg));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!videoId) return;
    setIsDeleting(true);
    try {
      const res = await videoApi.remove(videoId);
      if (res.data?.error) {
        const { errorCode, errorMsg } = res.data.error;
        toast.error(getApiErrorMessage(errorCode, errorMsg));
        return;
      }

      toast.success("Đã xóa video thành công!");
      triggerNextJsRevalidate("videos");
      queryClient.invalidateQueries({ queryKey: ["video-list"] });
      navigate("/video-library");
    } catch (err) {
      console.error(err);
      const { errorCode, errorMsg } = extractApiError(err);
      toast.error(getApiErrorMessage(errorCode, errorMsg));
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleCopyLink = () => {
    const url = video?.youtubeUrl || (video?.youtubeVideoId ? `https://www.youtube.com/watch?v=${video.youtubeVideoId}` : "");
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    toast.success("Đã sao chép link YouTube");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (isLoading && !video) {
    return (
      <PageContainer title="Chi tiết video" description="Đang tải dữ liệu...">
        <div className="flex h-64 flex-col items-center justify-center gap-3 rounded-xl border border-dashed text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
          <p className="text-sm font-medium">Đang tải thông tin video...</p>
        </div>
      </PageContainer>
    );
  }

  if (error || (!video && !isLoading)) {
    return (
      <PageContainer title="Không tìm thấy video" description="Video không tồn tại hoặc bạn không có quyền truy cập.">
        <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-xl border border-dashed text-muted-foreground">
          <VideoIcon className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm font-medium">Video không tồn tại hoặc đã bị xóa.</p>
          <Button variant="outline" onClick={() => navigate("/video-library")} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Quay lại thư viện video
          </Button>
        </div>
      </PageContainer>
    );
  }

  const currentCategory = VIDEO_CATEGORIES.find((c) => c.value === Number(watch("category")));
  const embedUrl = video?.youtubeEmbedUrl || (video?.youtubeVideoId ? `https://www.youtube.com/embed/${video.youtubeVideoId}` : null);
  const ytUrl = video?.youtubeUrl || (video?.youtubeVideoId ? `https://www.youtube.com/watch?v=${video.youtubeVideoId}` : null);
  const categoryName = currentCategory ? currentCategory.label.replace(/\s*\(.*\)$/, "") : "Video";

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <PageContainer
        title={watch("title") || video?.title || "Chi tiết video"}
        description="Xem trước video và cập nhật các thông tin, danh mục và trạng thái hiển thị."
        badge={categoryName}
        actions={
          <div className="flex items-center gap-2">
            {ytUrl && (
              <a href={ytUrl} target="_blank" rel="noopener noreferrer">
                <Button type="button" variant="outline" size="sm" className="gap-1.5">
                  <ExternalLink className="h-4 w-4" />
                  Xem trên YouTube
                </Button>
              </a>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              className="gap-1.5 text-red-600 hover:bg-red-500/10 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-500/20"
            >
              <Trash2 className="h-4 w-4" />
              Xóa video
            </Button>
          </div>
        }
      >
        {/* Back navigation button */}
        <div>
          <button
            type="button"
            onClick={() => navigate("/video-library")}
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Quay lại Thư viện video</span>
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column: Player & Technical Info */}
          <div className="space-y-6 lg:col-span-5">
            {/* Player Preview */}
            <SectionCard
              icon={<Play className="h-4 w-4" />}
              title="Trình xem video"
              description="Xem trực tiếp nội dung video."
            >
              <div className="space-y-3">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/60 bg-black shadow-inner">
                  {embedUrl ? (
                    <iframe
                      src={`${embedUrl}?rel=0`}
                      title={video?.title || "Video player"}
                      className="h-full w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : video?.youtubeHighThumbnailUrl || video?.youtubeMediumThumbnailUrl || video?.youtubeThumbnailUrl ? (
                    <img
                      src={video.youtubeHighThumbnailUrl || video.youtubeMediumThumbnailUrl || video.youtubeThumbnailUrl}
                      alt={video.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                      <VideoIcon className="h-10 w-10 opacity-30" />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    {video?.status}
                  </span>
                  {ytUrl && (
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
                    >
                      {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                      {copiedLink ? "Đã sao chép" : "Sao chép link"}
                    </button>
                  )}
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Right Column: Edit Forms */}
          <div className="space-y-6 lg:col-span-7">
            {/* Basic Information */}
            <SectionCard
              icon={<Film className="h-4 w-4" />}
              title="Thông tin video"
              description="Chỉnh sửa tiêu đề, mô tả và các từ khóa tìm kiếm."
            >
              <div className="space-y-4">
                <FormField label="Tiêu đề video" htmlFor="video-title">
                  <Input
                    id="video-title"
                    placeholder="Nhập tiêu đề video..."
                    {...register("title", { required: true })}
                  />
                </FormField>

                <FormField label="Mô tả video" htmlFor="video-description">
                  <Textarea
                    id="video-description"
                    rows={4}
                    placeholder="Nhập nội dung mô tả video (để trống để xóa)..."
                    {...register("description")}
                  />
                </FormField>
              </div>
            </SectionCard>

            {/* Categorization & Configuration */}
            <SectionCard
              icon={<Sliders className="h-4 w-4" />}
              title="Phân loại & Hiển thị"
              description="Cài đặt danh mục nội bộ và trạng thái hiển thị."
            >
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Danh mục nội bộ" htmlFor="video-category">
                    <Controller
                      control={control}
                      name="category"
                      render={({ field }) => (
                        <div className="relative">
                          <select
                            id="video-category"
                            value={field.value}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="w-full appearance-none rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
                          >
                            {VIDEO_CATEGORIES.map((cat) => (
                              <option key={cat.value} value={cat.value}>
                                {cat.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    />
                  </FormField>

                  <FormField label="YouTube Video ID" htmlFor="video-yt-id">
                    <Input
                      id="video-yt-id"
                      placeholder="11 ký tự YouTube Video ID"
                      {...register("youtubeVideoId")}
                    />
                  </FormField>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/20 p-4 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <label htmlFor="video-visible" className="text-sm font-medium cursor-pointer">
                        Hiển thị trên CMS
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Cho phép video xuất hiện trong các bộ chọn video và hiển thị trên website.
                      </p>
                    </div>
                    <Controller
                      control={control}
                      name="visible"
                      render={({ field }) => (
                        <Switch
                          id="video-visible"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>

        {/* Save Bar */}
        <SaveBar
          isDirty={isDirty}
          isSubmitting={isSaving}
          onSave={handleSubmit(handleSave)}
          onReset={() => video && reset(getFormValuesFromVideo(video))}
          saveLabel="Lưu video"
        />

        {/* Delete Confirmation Modal */}
        <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-red-600 dark:text-red-400">Xóa video</DialogTitle>
              <DialogDescription>
                Bạn có chắc chắn muốn xóa video này không? Thao tác này không thể hoàn tác. Video sẽ bị xóa vĩnh viễn khỏi cơ sở dữ liệu và kênh YouTube.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                Hủy
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                {isDeleting ? "Đang xóa..." : "Xóa vĩnh viễn"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </PageContainer>
    </form>
  );
}
