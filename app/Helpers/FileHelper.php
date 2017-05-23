<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;
use App\Filespot\FilespotAPI;
use App\Models\CdnFile;

class FileHelper
{
    /**
     * @param \Illuminate\Http\UploadedFile $file
     * @return \App\Models\CdnFile|null
     */
    public static function uploadFilespotFile(UploadedFile $file, $info)
    {
        $newName = md5($file->getFilename() . time());

        $ext = $file->extension();

        $type = explode('/', $file->getMimeType());
        if (isset($type[0]) && $type[0]) {
            $type = $type[0];
        } else {
            $type = 'other';
        }

        $subPath = date('Y') . '/' . date('m') . '/' . date('d');

        $fullName = "{$type}/{$subPath}/{$newName}.{$ext}";

        $result = FilespotAPI::objects()
            ->uploadFile($file->getPathname(), $fullName);

        if ($result->getStatusCode() == 200) {
            $result = $result->jsonDecode()->object;

            $cdnFile = new CdnFile([
                'external_id' => $result->id,
                'url' => 'https://' . $result->cdn_url,
                'content_type' => $result->content_type,
                'object_source' => $info['object_source'],
                'object_author' => $info['object_author'],
                'object_name' => $info['object_name'],
            ]);

            $cdnFile->save();

            return $cdnFile;
        }

        return null;
    }
}