<?php

namespace App\Http\Controllers\v1\cms;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\NewsFeed;

define('DEFAULT_VALUE', '50');

/**
 * Class NewsFeedController
 * @package App\Http\Controllers\v1\cms
 */
class NewsFeedController extends ApiController {

    /**
     * Получить выборку новостей с параметрами
     * @return \Illuminate\Http\JsonResponse
     */
    public function getNewsFeed(Request $request) {

       $start = $request->input('start');
       $limit = $request->input('limit');
       $viewMode = $request->input('viewMode');
       $fromDate = $request->input('fromDate');
       $toDate = $request->input('toDate');


       //если есть старт
       if ($start !== null and $limit === null) {
        //если значения поля "от" и "до" пустые
        if ($toDate === null and $fromDate === null) {

          if ($viewMode === 'all') {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->paginate(DEFAULT_VALUE);
          }
          elseif ($viewMode === 'hidden') {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('hidden', '1')
                            ->paginate(DEFAULT_VALUE);
          }
          elseif ($viewMode === null) {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('hidden', '0')
                            ->paginate(DEFAULT_VALUE);
          }

        }

        //если есть дата "до"
        if ($toDate !== null and $fromDate === null) {

          if ($viewMode === 'all') {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('anons_create_dt', '<=', $toDate)
                            ->paginate(DEFAULT_VALUE);
          }
          elseif ($viewMode === 'hidden') {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('hidden', '1')
                            ->where('anons_create_dt', '<=', $toDate)
                            ->paginate(DEFAULT_VALUE);
          }
          elseif ($viewMode === null) {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('hidden', '0')
                            ->where('anons_create_dt', '<=', $toDate)
                            ->paginate(DEFAULT_VALUE);
          }

        }

        //если есть дата "от"
        if ($toDate === null and $fromDate !== null) {

          if ($viewMode === 'all') {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('anons_create_dt', '>=', $fromDate)
                            ->paginate(DEFAULT_VALUE);
          }
          elseif ($viewMode === 'hidden') {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('hidden', '1')
                            ->where('anons_create_dt', '>=', $fromDate)
                            ->paginate(DEFAULT_VALUE);
          }
          elseif ($viewMode === null) {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('hidden', '0')
                            ->where('anons_create_dt', '>=', $fromDate)
                            ->paginate(DEFAULT_VALUE);
          }

        }

        //обе даты
        if ($toDate !== null and $fromDate !== null) {

          if ($viewMode === 'all') {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('anons_create_dt', '<=', $toDate)
                            ->where('anons_create_dt', '>=', $fromDate)
                            ->paginate(DEFAULT_VALUE);
          }
          elseif ($viewMode === 'hidden') {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('hidden', '1')
                            ->where('anons_create_dt', '<=', $toDate)
                            ->where('anons_create_dt', '>=', $fromDate)
                            ->paginate(DEFAULT_VALUE);
          }
          elseif ($viewMode === null) {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('hidden', '0')
                            ->where('anons_create_dt', '<=', $toDate)
                            ->where('anons_create_dt', '>=', $fromDate)
                            ->paginate(DEFAULT_VALUE);
          }

        }

       } 

       //если есть "лимит"
       elseif($limit !== null and $start === null) {

        //если значения поля "от" и "до" пустые
        if ($toDate === null and $fromDate === null) {

          if ($viewMode === 'all') {
          $feed = NewsFeed::paginate($limit);
          }
          elseif ($viewMode === 'hidden') {
            $feed = NewsFeed::where('hidden', '1')
                            ->paginate($limit);
          }
          elseif ($viewMode === null) {
            $feed = NewsFeed::where('hidden', '0')
                            ->paginate($limit);
          }
          
        }

        //если есть дата "до"
        if ($toDate !== null and $fromDate === null) {

          if ($viewMode === 'all') {
          $feed = NewsFeed::where('anons_create_dt', '<=', $toDate)
                            ->paginate($limit);
          }
          elseif ($viewMode === 'hidden') {
            $feed = NewsFeed::where('hidden', '1')
                            ->where('anons_create_dt', '<=', $toDate)
                            ->paginate($limit);
          }
          elseif ($viewMode === null) {
            $feed = NewsFeed::where('hidden', '0')
                            ->where('anons_create_dt', '<=', $toDate)
                            ->paginate($limit);
          }

        }

        //если дата "от"
        if ($toDate === null and $fromDate !== null) {

          if ($viewMode === 'all') {
          $feed = NewsFeed::where('anons_create_dt', '>=', $fromDate)
                            ->paginate($limit);
          }
          elseif ($viewMode === 'hidden') {
            $feed = NewsFeed::where('hidden', '1')
                            ->where('anons_create_dt', '>=', $fromDate)
                            ->paginate($limit);
          }
          elseif ($viewMode === null) {
            $feed = NewsFeed::where('hidden', '0')
                            ->where('anons_create_dt', '>=', $fromDate)
                            ->paginate($limit);
          }

        }

        //обе даты
        if ($toDate !== null and $fromDate !== null) {

          if ($viewMode === 'all') {
          $feed = NewsFeed::where('anons_create_dt', '>=', $fromDate)
                            ->paginate($limit);
          }
          elseif ($viewMode === 'hidden') {
            $feed = NewsFeed::where('hidden', '1')
                            ->where('anons_create_dt', '<=', $toDate)
                            ->where('anons_create_dt', '>=', $fromDate)
                            ->paginate($limit);
          }
          elseif ($viewMode === null) {
            $feed = NewsFeed::where('hidden', '0')
                            ->where('anons_create_dt', '<=', $toDate)
                            ->where('anons_create_dt', '>=', $fromDate)
                            ->paginate($limit);
          }
        }



        

       } 

       //если лимит и старт имеются
       elseif ($limit !== null and $start !== null) {
        //если значения поля "от"и "до" пустые
        if ($toDate === null and $fromDate === null) {

          if ($viewMode === 'all') {
            $feed = NewsFeed::where('id', '>=', $start)->paginate($limit);
          }
          elseif ($viewMode === 'hidden') {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('hidden', '1')
                            ->paginate($limit);
          }
          elseif ($viewMode === null) {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('hidden', '0')
                            ->paginate($limit);
          }

        }

        //если есть дата "до"
        if ($toDate !== null and $fromDate === null) {

          if ($viewMode === 'all') {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('anons_create_dt', '<=', $toDate)
                            ->paginate($limit);
          }
          elseif ($viewMode === 'hidden') {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('hidden', '1')
                            ->where('anons_create_dt', '<=', $toDate)
                            ->paginate($limit);
          }
          elseif ($viewMode === null) {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('hidden', '0')
                            ->where('anons_create_dt', '<=', $toDate)
                            ->paginate($limit);
          }


        }
        //если дата "от"
        if ($toDate === null and $fromDate !== null) {

          if ($viewMode === 'all') {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('anons_create_dt', '>=', $fromDate)
                            ->paginate($limit);
          }
          elseif ($viewMode === 'hidden') {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('hidden', '1')
                            ->where('anons_create_dt', '>=', $fromDate)
                            ->paginate($limit);
          }
          elseif ($viewMode === null) {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('hidden', '0')
                            ->where('anons_create_dt', '>=', $fromDate)
                            ->paginate($limit);
          }

        }
        //обе даты
        if ($toDate !== null and $fromDate !== null) {

          if ($viewMode === 'all') {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('anons_create_dt', '<=', $toDate)
                            ->where('anons_create_dt', '>=', $fromDate)
                            ->paginate($limit);
          }
          elseif ($viewMode === 'hidden') {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('hidden', '1')
                            ->where('anons_create_dt', '<=', $toDate)
                            ->where('anons_create_dt', '>=', $fromDate)
                            ->paginate($limit);
          }
          elseif ($viewMode === null) {
            $feed = NewsFeed::where('id', '>=', $start)
                            ->where('hidden', '0')
                            ->where('anons_create_dt', '<=', $toDate)
                            ->where('anons_create_dt', '>=', $fromDate)
                            ->paginate($limit);
          }

        }


       }
       //дата "от"
       elseif ($fromDate !== null and $toDate === null) {
          $feed = NewsFeed::where('anons_create_dt', '>=', $fromDate)->paginate(DEFAULT_VALUE);
       }
       //только дата "до"
       elseif ($toDate !== null and $fromDate === null) {
          $feed = NewsFeed::where('anons_create_dt', '<=', $toDate)
                          ->paginate(DEFAULT_VALUE);
       }
       //обе даты
       elseif ($toDate !== null and $fromDate !== null) {
          $feed = NewsFeed::where('anons_create_dt', '<=', $toDate)->paginate(DEFAULT_VALUE);
       }

       return response()->json(['feed' => $feed]);
    }



}