<?php

	namespace App\Http\Controllers\v1;

	use App\Models\NewsCounters;
	use App\Models\News;
	use App\Models\NewsModerationLog;
	use Illuminate\Http\Request;
	use Illuminate\Support\Facades\DB;
	use \DateTime;
	use \DatePeriod;
	use \DateInterval;


	/**
	 * Class NewsStatisticsController
	 * @package App\Http\Controllers\v1
	 */
	class NewsStatisticsController extends CmsController {

		private $start_date;
		private $end_date;


		/**
		 * @param $type_interval
		 * @param array $param
		 *
		 * @return string
		 */
		private function setInterval( $type_interval, $param = array( 1 => 'start_date', 2 => 'start_date' ) ) {

			$period = 'true';
			switch ( $type_interval ) {
				case 'today':
					$period = $param[1] . '>="' . date( 'Y-m-d H:i:s', strtotime( 'today' ) ) . '"';
					break;
				case  'week':
					$period = $param[1] . '>="' . date( 'Y-m-d H:i:s', strtotime( '-1 week' ) ) . '"';
					break;

				case 'month':
					$period = $param[1] . '>="' . date( 'Y-m-d H:i:s', strtotime( '-1 month' ) ) . '"';
					break;


				case 'year':
					$period = $param[1] . '>="' . date( 'Y-m-d H:i:s', strtotime( '-1 year' ) ) . '"';
					break;

				case 'custom':
					$period = "$param[1] >= '$this->start_date 00:00:00' AND $param[2] <= '$this->end_date 23:59:59'";
					break;

			}

			return $period;
		}

		/**
		 * @param Request $request
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */
		public function getTimeAllEditors( Request $request ) {

			try {
				$this->validate( $request, [
					'type_interval' => 'required',
					'start_date'    => 'date_format:Y-m-d',
					'end_date'      => 'date_format:Y-m-d',
				] );
				$type_interval    = $request->input( 'type_interval' );
				$this->start_date = $request->input( 'start_date' );
				$this->end_date   = $request->input( 'end_date' );

				$period = $this->setInterval( $type_interval );

				$respond = array();

				$results = NewsModerationLog::  select( 'users.id', 'users.name',
					DB::raw( ' AVG(TIMESTAMPDIFF (SECOND ,start_date,end_date )) as time_work' ),
					'count_news' )
				                            ->join( 'users', 'users.id', '=', 'editor_id' )
				                            ->Leftjoin(
					                            DB::raw( '
																(SELECT editor_id, COUNT(*) as count_news 
																FROM news 
																WHERE moderation = 0 AND `delete` = 0
															    GROUP BY editor_id) as query								
														' ),
					                            function ( $join ) {
						                            $join->on( 'query.editor_id', '=',
							                            'news_moderation_log.editor_id' );
					                            } )
				                            ->where( 'end_date', '<>', 'NULL' )
				                            ->whereRaw( $period )
				                            ->groupBy( 'users.id' )
				                            ->get();
				foreach ( $results as $result ) {

					$hours   = floor( $result->time_work / 3600 );
					$minutes = floor( ( $result->time_work / 3600 - $hours ) * 60 );
					array_push( $respond,
						array(
							'id'            => $result->id,
							'editor_name'   => $result->name,
							'count_news'    => $result->count_news,
							'avg_time_work' => array(
								'hours'   => $hours,
								'minutes' => $minutes
							)
						)
					);
				}

				return $this->respond( $respond );
			} catch ( \Exception $e ) {
				return $this->respondFail500x( $e );
			}
		}

		/**
		 * @param Request $request
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */
		public function getTimeEditor( Request $request ) {

			try {
				$this->validate( $request, [
					'type_interval' => 'required',
					'start_date'    => 'date_format:Y-m-d',
					'end_date'      => 'date_format:Y-m-d',
				] );
				$type_interval    = $request->input( 'type_interval' );
				$this->start_date = $request->input( 'start_date' );
				$this->start_date = $request->input( 'end_date' );
				$editor_id        = $request->input( 'editor_id' );
				$period           = $this->setInterval( $type_interval );
				$respond          = array();

				$results = NewsModerationLog::  select( 'users.id', 'users.name',
					DB::raw( ' TIMESTAMPDIFF (SECOND ,start_date,end_date ) as time_work' ),
					'publish_date', 'news.title' )
				                            ->join( 'users', 'users.id', '=', 'editor_id' )
				                            ->join( 'news', 'news.id', '=', 'news_id' )
				                            ->where( 'end_date', '<>', 'NULL' )
				                            ->where( 'users.id', '=', $editor_id )
				                            ->where( 'is_publish', '=', 1 )
				                            ->whereRaw( $period )
				                            ->get();

				foreach ( $results as $result ) {

					$hours   = floor( $result->time_work / 3600 );
					$minutes = floor( ( $result->time_work / 3600 - $hours ) * 60 );
					array_push( $respond,
						array(
							'id'            => $result->id,
							'editor_name'   => $result->name,
							'publish_date'  => $result->publish_date,
							'news_title'    => $result->title,
							'avg_time_work' => array(
								'hours'   => $hours,
								'minutes' => $minutes
							)
						)
					);
				}

				return $this->respond( $respond );
			} catch ( \Exception $e ) {
				return $this->respondFail500x( $e );
			}
		}

		/**
		 * @param Request $request
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */
		public function getTimeDynamicsEditor( Request $request ) {

			try {

				$this->validate( $request, [
					'editor_id'     => 'required|numeric',
					'start_date'    => 'required|date_format:Y-m-d',
					'end_date'      => 'required|date_format:Y-m-d',
					'type_dynamics' => 'required',
				] );

				$respond          = array();
				$editor_id        = $request->input( 'editor_id' );
				$this->start_date = $request->input( 'start_date' );
				$this->end_date   = $request->input( 'end_date' );
				$type_dynamics    = $request->input( 'type_dynamics' );

				$from = new DateTime( $this->start_date );
				$to   = new DateTime( $this->end_date );

				$period       = new DatePeriod( $from, new DateInterval( 'P1D' ), $to );
				$arrayOfDates = array();
				foreach ( $period as $item ) {
					$arrayOfDates[ $item->format( "d-m-Y" ) ] = 0;
				}


				if ( $type_dynamics == 'counts_news' ) {
					$results = DB::select( " SELECT  DATE_FORMAT(publish_date,'%d-%m-%Y') as pdate, COUNT(*) as ncount
									FROM news
									WHERE publish_date >='$this->start_date 00:00:00' AND publish_date <='$this->end_date 23:59:59'
									 AND editor_id = $editor_id
									GROUP BY pdate
									ORDER BY pdate" );
				}

				foreach ( $results as $result ) {
					$respond[ $result->pdate ] = $result->ncount;

				}

				$respond = array_merge( $arrayOfDates, $respond );

				return $this->respond( $respond );
			} catch ( \Exception $e ) {
				return $this->respondFail500x( $e );
			}

		}

		/**
		 * @param Request $request
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */
		public function getCountersAll( Request $request ) {

			try {

				$this->validate( $request, [
					'type_interval' => 'required',
					'start_date'    => 'date_format:Y-m-d',
					'end_date'      => 'date_format:Y-m-d',
				] );

				$type_interval    = $request->input( 'type_interval' );
				$this->start_date = $request->input( 'start_date' );
				$this->end_date   = $request->input( 'end_date' );
				$respond          = array();

				$period = $this->setInterval( $type_interval, array( 1 => 'publish_date', 2 => ' publish_date' ) );

				$results = NewsCounters::select( 'news_id', 'count_click', 'count_views' )
				                       ->join( 'news', 'news.id', '=', 'news_id' )
				                       ->whereRaw( $period )
				                       ->get();


				foreach ( $results as $result ) {
					array_push( $respond,
						array(
							'news_id'     => $result->news_id,
							'count_click' => $result->count_click,
							'count_views' => $result->count_views,
						)
					);

				}
				var_dump( $respond );

				return $this->respond( $respond );
			} catch ( \Exception $e ) {
				return $this->respondFail500x( $e );
			}

		}

		/**
		 * @param Request $request
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */
		public function getCountersEditor( Request $request ) {

			try {

				$this->validate( $request, [
					'type_interval' => 'required',
					'start_date'    => 'date_format:Y-m-d',
					'end_date'      => 'date_format:Y-m-d',
					'editor_id'     => 'integer',
				] );

				$type_interval    = $request->input( 'type_interval' );
				$this->start_date = $request->input( 'start_date' );
				$this->end_date   = $request->input( 'end_date' );
				$editor_id        = $request->input( 'editor_id' );
				$respond          = array();

				$period = $this->setInterval( $type_interval,
					array( 1 => 'publish_date', 2 => ' publish_date' ) );

				$results = NewsCounters::select( 'news_id', 'count_click', 'count_views' )
				                       ->join( 'news', 'news.id', '=', 'news_id' )
				                       ->where( 'news.editor_id', '=', $editor_id )
				                       ->whereRaw( $period )
				                       ->get();

				foreach ( $results as $result ) {
					array_push( $respond,
						array(
							'news_id'     => $result->news_id,
							'count_click' => $result->count_click,
							'count_views' => $result->count_views,
						)
					);

				}

				return $this->respond( $respond );
			} catch ( \Exception $e ) {
				return $this->respondFail500x( $e );
			}

		}


	}