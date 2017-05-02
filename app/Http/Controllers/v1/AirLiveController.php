<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Http\Transformers\v1\AirLiveTransformer;
use App\Models\AirLive;

/**
 * Контроллер прямого эфира
 * @package App\Http\Controllers\v1
 */
class AirLiveController extends CmsController
{

    /**
     * @var AirLiveTransformer
     */
    protected $liveTransformer;

    /**
     * AirLiveTransformer constructor.
     * @param AirLiveTransformer $transformer
     */
    public function __construct(AirLiveTransformer $transformer)
    {
        parent::__construct();
        $this->liveTransformer = $transformer;
    }

    /**
     * Список прямых эфиров
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $lives = AirLive::all();

        return $this->respond(
            $this->liveTransformer->transformCollection($lives->toArray())
        );
    }

    /**
     * В прямой эфир
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function onAir(Request $request)
    {
        try {
            $this->validate($request, AirLive::$rules);

            if (AirLive::insertLive($request->all())) {
                return $this->respond([
                    'success' => true
                ]);
            }

            return $this->respondFail500x();
        } catch (ValidationException $e) {
            return $this->respondFail422x($e->response->original);
        }
    }
}