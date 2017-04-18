<?php


namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;
use Illuminate\Contracts\Validation\ValidationException;
use App\Models\CdnFile;
use App\Filespot\FilespotAPI;

/**
 * Контроллер для работы с файлами
 *
 * class FileController
 * @package App\Http\Controllers\v1
 */
class FileController extends CmsController
{

    /**
     * Аплоад файлов на сервер
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function upload(Request $request)
    {
        try {
            $this->validate($request, [
                'file' => 'file|required|max:262144',
            ]);
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->getMessage());
        }

        $file = $request->file('file');

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
            $result = $result->jsonDecode();
            $cdnFile = new CdnFile([
                'external_id' => $result->object->id,
                'url' => $result->object->cdn_url,
                'content_type' => $result->object->content_type
            ]);

            $cdnFile->save();

            return $this->respond([
                'success' => true,
                'file' => $cdnFile->toArray()
            ]);
        }

        return $this->respondFail500x();
    }

    /**
     * Удаление файла
     *
     * @param int $id ID файла
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $cdnFile = CdnFile::find($id);
        if ($cdnFile) {
            FilespotAPI::objects()->deleteFile($cdnFile->external_id);
            return $this->respond(['success' => $cdnFile->delete()]);
        }

        return $this->respondNotFound('File not found');
    }

}