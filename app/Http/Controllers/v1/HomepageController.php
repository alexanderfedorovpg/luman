<?php

namespace App\Http\Controllers\v1;

use App\Models\HomepageWar;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Http\Transformers\v1\HomepageTransformer;
use App\Models\HomepageNews;
use App\Models\HomepageInfoNoise;
use App\Models\HomepageRecord;
use App\Models\HomepageNewsCategory;
use App\Models\HomepageOption;

/**
 * Контроллер главной страницы
 * @package App\Http\Controllers\v1\Cms
 */
class HomepageController extends CmsController
{

    /**
     * @var HomepageTransformer
     */
    protected $homepageTransformer;

    /**
     * HomepageTransformer constructor.
     * @param HomepageTransformer $transformer
     */
    public function __construct(HomepageTransformer $transformer)
    {
        parent::__construct();
        $this->homepageTransformer = $transformer;
    }

    /**
     * Данные для вывода на главной страницы
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $homepage = [];
        $homepage['news'] = HomepageNews::all();
        $homepage['info_noise'] = HomepageInfoNoise::all();
        $homepage['from_air'] = HomepageRecord::all();
        $homepage['war'] = HomepageWar::all();
        $homepage['options'] = HomepageOption::all();

        return $this->respond(
            $this->homepageTransformer->transform($homepage)
        );
    }

    /**
     * Конструктор страницы
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        //var_dump($request->all()); exit();
        try {



            $this->validate($request, [
                'news' => 'array',
                'news.*.news_id' => 'required|integer|exists:news,id',
                'news.*.category_id' => 'required|integer|exists:homepage_news_categories,id',
                'news.*.top' => 'required|integer',

                'info_noise' => 'array',
                'info_noise.*.news_id' => 'required|integer|exists:news,id',
                'info_noise.*.top' => 'required|integer',

                'war' => 'array',
                'war.*.news_id' => 'required|integer|exists:news,id',
                'war.*.top' => 'required|integer',

                'from_air' => 'array',
                'from_air.*.record_id' => 'required|integer|exists:air_records,id',
                'from_air.*.top' => 'required|integer',

                'is_war_mode' => 'in:0,1',


            ]);

            $news = $request->input('news');
            if ($news) {
                HomepageNews::truncate();
                HomepageNews::insert($news);
            }

            $infoNoise = $request->input('info_noise');
            if ($infoNoise) {
                HomepageInfoNoise::truncate();
                HomepageInfoNoise::insert($infoNoise);
            }

            $war = $request->input('war');
            if ($war) {
                HomepageWar::truncate();

                HomepageWar::insert($war);
            }

            $fromAir = $request->input('from_air');
            if ($fromAir) {
                HomepageRecord::truncate();
                HomepageRecord::insert($fromAir);
            }

            $isWarMode = $request->input('is_war_mode');
            if ($isWarMode !== null) {
                $option = HomepageOption::where('name', '=', 'is_war_mode')->first();
                $option->value = $isWarMode;
                $option->save();
            }


            $warModeTitle = $request->input('war_mode_title');
            if ($warModeTitle !== null) {
                 HomepageOption::updateOrCreate(['name' => 'war_mode_title'],  [ 'value'=>$warModeTitle]);


            }

        } catch (ValidationException $e) {
            return $this->respondFail422x($e->response->original);
        } catch (\Exception $e) {
            return $this->respondFail500x($e->getMessage());
        }

        return $this->respond(['success' => true]);
    }

    /**
     * Категории новостей
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getNewsCategories(Request $request)
    {
        if ($request->input('mode')=='war'){
            $categories = HomepageNewsCategory::where('mode','=','war')->get()->toArray();

        }
        else{
            $categories = HomepageNewsCategory::get()->toArray();
        }


        return $this->respond($categories);
    }
}