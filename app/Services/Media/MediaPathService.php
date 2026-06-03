<?php

namespace App\Services\Media;

class MediaPathService
{
    public function resolveDirectory(string $fileType): string
    {
        return match ($fileType) {
            'image' => 'media/images',
            'video' => 'media/videos',
            'document' => 'media/documents',
            default => 'media/others',
        };
    }
}