<?php

namespace App\Services\Media;

use App\Models\Media;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MediaService
{
    public function __construct(
        protected MediaPathService $pathService,
        protected MediaDeleteService $deleteService
    ) {
    }

    public function upload(
        UploadedFile $file,
        Model $model,
        string $usageType,
        bool $isPrimary = false,
        string $disk = 'public',
        ?string $altText = null
    ): Media {
        return DB::transaction(function () use ($file, $model, $usageType, $isPrimary, $disk, $altText) {
            $fileType = $this->detectFileType($file->getMimeType());
            $directory = $this->pathService->resolveDirectory($fileType);

            $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $filePath = $file->storeAs($directory, $fileName, $disk);

            if ($isPrimary) {
                $model->media()
                    ->where('usage_type', $usageType)
                    ->update(['is_primary' => false]);
            }

            return $model->media()->create([
                'file_path' => $filePath,
                'file_type' => $fileType,
                'disk' => $disk,
                'usage_type' => $usageType,
                'is_primary' => $isPrimary,
                'sort_order' => 0,
                'mime_type' => $file->getMimeType(),
                'file_size' => $file->getSize(),
                'alt_text' => $altText,
            ]);
        });
    }
    protected function detectFileType(?string $mimeType): string
    {
        if (!$mimeType) {
            return 'document';
        }

        if (str_starts_with($mimeType, 'image/')) {
            return 'image';
        }

        if (str_starts_with($mimeType, 'video/')) {
            return 'video';
        }

        return 'document';
    }
}