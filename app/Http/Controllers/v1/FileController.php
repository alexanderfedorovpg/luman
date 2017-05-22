<?php


namespace App\Http\Controllers\v1;

use App\Models\CdnFile;
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

            $info = [
                'object_source' => $request->input('object_source') ? $request->input('object_source') : null,
                'object_author' => $request->input('object_author') ? $request->input('object_author') : null,
                'object_name' => $request->input('object_name') ? $request->input('object_name') : null,
            ];
            $cdnFile = FileHelper::uploadFilespotFile($request->file('file'), $info);
            if ($cdnFile) {
                return $this->respond([
                    'success' => true,
                    'file' => $cdnFile->toArray()
                ]);
            }
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->response->original);
        } catch (\Exception $e) {
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

    public function get($id)
    {
        $cdnFile = CdnFile::find($id);
        if ($cdnFile) {

            return $this->respond($cdnFile->toArray());
        }

        return $this->respondNotFound('File not found');
    }

    public function all()
    {
        $cdnFile = CdnFile::paginate(50);

        if ($cdnFile) {

            return $this->respond($cdnFile->toArray());
        }

        return $this->respondNotFound('Files not found');
    }
}