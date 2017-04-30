<?php


namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Helpers\FileHelper;

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

            $cdnFile = FileHelper::uploadFilespotFile($request->file('file'));
            if ($cdnFile) {
                return $this->respond([
                    'success' => true,
                    'file' => $cdnFile->toArray()
                ]);
            }
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->response->original);
        }  catch (\Exception $e) {
            return $this->respondFail500x();
        }
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