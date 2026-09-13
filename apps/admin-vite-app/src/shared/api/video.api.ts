import { apiClient, API_ENDPOINTS } from "@/shared/api";

interface CmsApiResponse<T> {
  cmdId: string;
  cmdTime: number;
  data: T;
  error?: { errorMsg: string; errorCode: number };
}

export interface VideoRecord {
  id: number;
  userId: number;
  youtubeVideoId: string;
  youtubeUrl: string;
  youtubeEmbedUrl: string;
  youtubeThumbnailUrl: string;
  youtubeMediumThumbnailUrl: string;
  youtubeHighThumbnailUrl: string;
  youtubeStandardThumbnailUrl?: string;
  youtubeMaxResolutionThumbnailUrl?: string;
  title: string;
  description: string;
  tags: string[];
  fileSize: number;
  status: string;
  privacyStatus: string;
  categoryId?: number;
  category?: number;
  visible: boolean;
  createdTime: number;
  updatedTime: number;
}

export interface UploadVideoResponse {
  youtubeVideoId: string;
  youtubeUrl: string;
  youtubeEmbedUrl: string;
  youtubeThumbnailUrl: string;
  youtubeMediumThumbnailUrl: string;
  youtubeHighThumbnailUrl: string;
}

export interface CreateVideoRequest {
  youtubeVideoId: string;
  title: string;
  description?: string;
  tags?: string[];
  fileSize?: number;
  privacyStatus?: string;
  categoryId?: number;
  visible?: boolean;
}

export interface UpdateVideoRequest {
  videoId: number;
  youtubeVideoId?: string;
  title?: string;
  description?: string;
  tags?: string[];
  fileSize?: number;
  status?: string;
  privacyStatus?: string;
  category?: number;
  visible?: boolean;
}

export const VIDEO_CATEGORIES = [
  { value: 1, label: "Đám cưới (WEDDING)", key: "WEDDING" },
  { value: 2, label: "Lễ tang (FUNERAL)", key: "FUNERAL" },
  { value: 3, label: "Ăn hỏi (ENGAGEMENT)", key: "ENGAGEMENT" },
  { value: 4, label: "Dã ngoại (OUTDOOR)", key: "OUTDOOR" },
] as const;

export const VIDEO_STATUSES = [
  { value: "UPLOADED", label: "Đã tải lên (UPLOADED)" },
  { value: "PROCESSING", label: "Đang xử lý (PROCESSING)" },
  { value: "FAILED", label: "Thất bại (FAILED)" },
] as const;

export const PRIVACY_STATUSES = [
  { value: "public", label: "Công khai (Public)" },
  { value: "unlisted", label: "Không công khai (Unlisted)" },
  { value: "private", label: "Riêng tư (Private)" },
] as const;

export const videoApi = {
  /** Upload video file to YouTube (multipart/form-data) */
  upload: (formData: FormData, onUploadProgress?: (progressEvent: any) => void, signal?: AbortSignal) =>
    apiClient.post<CmsApiResponse<UploadVideoResponse>>(
      API_ENDPOINTS.UPLOAD_VIDEO,
      formData,
      {
        headers: { "Content-Type": undefined as any },
        timeout: 0, // Vô hiệu hoá timeout cho request upload file nặng
        onUploadProgress,
        signal,
      },
    ),

  /** Save video metadata to DB after YouTube upload */
  create: (data: CreateVideoRequest) =>
    apiClient.post<CmsApiResponse<CreateVideoRequest & { videoId: number; status: string }>>(
      API_ENDPOINTS.CREATE_VIDEO,
      data,
    ),

  /** List all videos for current user */
  getList: () =>
    apiClient.post<CmsApiResponse<{ videos: VideoRecord[] }>>(
      API_ENDPOINTS.GET_LIST_VIDEO,
      {},
    ),

  /** Get video detail by ID */
  getById: (videoId: number) =>
    apiClient.post<CmsApiResponse<{ videoId: number; video: VideoRecord }>>(
      API_ENDPOINTS.GET_VIDEO,
      { videoId },
    ),

  /** Update video metadata in DB */
  update: (data: UpdateVideoRequest) =>
    apiClient.post<CmsApiResponse<Partial<UpdateVideoRequest> & { videoId: number }>>(
      API_ENDPOINTS.UPDATE_VIDEO,
      data,
    ),

  /** Remove video from DB (async delete on YouTube) */
  remove: (videoId: number) =>
    apiClient.post<CmsApiResponse<{ videoId: number; result: boolean }>>(
      API_ENDPOINTS.REMOVE_VIDEO,
      { videoId },
    ),
} as const;
