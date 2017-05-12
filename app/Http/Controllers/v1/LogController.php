<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;
use App\Http\Traits\LogFilter;
use App\Models\Log;
use App\Http\Transformers\v1\LogTransformer;
use Auth;

/**
 * Контроллер логов
 * @package App\Http\Controllers\v1
 */
class LogController extends CmsController
{

    use LogFilter;

    /**
     * @var $logTransformer
     */
    protected $logTransformer;

    /**
     * $logTransformer constructor.
     * @param $logTransformer $transformer
     */
    public function __construct(LogTransformer $transformer)
    {
        parent::__construct();
        $this->logTransformer = $transformer;
    }

    /**
     * Получение всех всех логов
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAll(Request $request)
    {
        $filter = $this->filter($request, Log::query());
        if ($request->input('userId')) {
            $filter->where('user_id', '=', $request->input('userId'));
        }
        $logs = $filter->get();
        return $this->respond(
            $this->logTransformer->transformCollection($logs->toArray())
        );
    }

    /**
     * Получение логов текщего пользователя
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCurrentUser(Request $request)
    {
        $user = Auth::user();
        $logs = $this->filter($request, Log::where('user_id', '=', $user->id))->get();

        return $this->respond(
            $this->logTransformer->transformCollection($logs->toArray())
        );
    }
}