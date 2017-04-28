<?php

	namespace App\Http\Controllers\v1;

	use App\Models\Counters;
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
		private function setInterval( $param = array( 1 => 'start_date', 2 => 'start_date' ) ) {

			$period = 'true';
			if ( $this->start_date && $this->end_date ) {
				$period = "$param[1] >= '$this->start_date' AND $param[2] <= '$this->end_date'";
			} elseif ( $this->start_date ) {
				$period = "$param[1] >= '$this->start_date'";
			} elseif ( $this->end_date ) {
				$period = "$param[2] <= '$this->end_date'";
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
					'start_date' => 'date|date_format:Y-m-d H:i:s',
					'end_date'   => 'date|date_format:Y-m-d H:i:s',
				] );
				$this->start_date = $request->input( 'start_date' );
				$this->end_date   = $request->input( 'end_date' );
				$period           = $this->setInterval();

				$respond = array();

				$results = NewsModerationLog::  select( 'users.id', 'users.name',
					DB::raw( ' AVG(TIMESTAMPDIFF (SECOND ,start_date,end_date )) as time_work' ),
					'count_news', 'cdn_files.url' )
				                            ->join( 'users', 'users.id', '=', 'editor_id' )
				                            ->Leftjoin( 'cdn_files', 'cdn_files.id', '=', 'users.avatar_id' )
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
					$hours   = ( $hours > 0 ) ? $hours : 0;
					$minutes = floor( ( $result->time_work / 3600 - $hours ) * 60 );
					array_push( $respond,
						array(
							'id'            => $result->id,
							'editor_name'   => $result->name,
							'avatar_img'    => $result->url,
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
		public function getTimeAllEditorsExtended( Request $request ) {

			try {
				$this->validate( $request, [
					'start_date' => 'date|date_format:Y-m-d H:i:s',
					'end_date'   => 'date|date_format:Y-m-d H:i:s',
					'type'       => 'in:news,video,tv_program,facebook,twitter'
				] );
				$this->start_date = $request->input( 'start_date' );
				$this->end_date   = $request->input( 'end_date' );
				$type             = $request->input( 'type' );
				$period           = $this->setInterval( array( 1 => 'publish_date', 2 => 'publish_date' ) );

				$respond = array();
				$type    = $type ? $type : 'news';
				$type    = array_search( $type, Counters::$_type_counters );

				$results = News:: select( 'users.id', 'users.name', 'publish_date', 'cdn_files.url', 'count_click',
					'count_views', 'title' )
				               ->Leftjoin( 'users', 'users.id', '=', 'editor_id' )
				               ->Leftjoin( 'cdn_files', 'cdn_files.id', '=', 'users.avatar_id' )
				               ->join( 'counters', function ( $join ) use ( $type ) {
					               $join->on( 'counters.news_id', '=', 'news.id' )
					                    ->where( 'counters.type', '=', $type );
				               } )
				               ->where( 'is_publish', '=', '1' )
				               ->whereRaw( $period )
				               ->get();

				foreach ( $results as $result ) {
					array_push( $respond,
						array(
							'id'           => $result->id,
							'editor_name'  => $result->name,
							'news_name'    => $result->title,
							'publish_date' => $result->publish_date,
							'avatar_img'   => $result->url,
							'count_click'  => $result->count_click,
							'count_views'  => $result->count_views,

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
					'editor_id'  => 'required|exists:users,id',
					'start_date' => 'date|date_format:Y-m-d H:i:s',
					'end_date'   => 'date|date_format:Y-m-d H:i:s',
				] );
				$this->start_date = $request->input( 'start_date' );
				$this->end_date   = $request->input( 'end_date' );
				$editor_id        = $request->input( 'editor_id' );
				$period           = $this->setInterval();
				$respond          = array();

				$results = NewsModerationLog:: select( 'users.id', 'users.name',
					DB::raw( ' TIMESTAMPDIFF (SECOND ,start_date,end_date ) as time_work' ),
					'news.publish_date', 'news.title', 'news.is_publish', 'count_click', 'count_views' )
				                            ->join( 'users', 'users.id', '=', 'editor_id' )
				                            ->join( 'news', 'news.id', '=', 'news_id' )
				                            ->Leftjoin( 'counters', function ( $join ) {
					                            $join->on( 'counters.news_id', '=', 'news.id' )
					                                 ->where( 'counters.type', '=', 1 );
				                            } )
				                            ->where( 'end_date', '<>', 'NULL' )
				                            ->where( 'users.id', '=', $editor_id )
				                            ->where( 'news.is_publish', '=', 1 )
				                            ->whereRaw( $period )
				                            ->get();

				foreach ( $results as $result ) {

					$hours   = floor( $result->time_work / 3600 );
					$hours   = ( $hours > 0 ) ? $hours : 0;
					$minutes = floor( ( $result->time_work / 3600 - $hours ) * 60 );
					array_push( $respond,
						array(
							'id'            => $result->id,
							'editor_name'   => $result->name,
							'publish_date'  => $result->publish_date,
							'news_title'    => $result->title,
							'is_publish'    => $result->is_publish,
							'count_click'   => $result->count_click,
							'count_views'   => $result->count_views,
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
		public function getTimeDynamics( Request $request ) {

//			try {

				$this->validate( $request, [
					'editor_id'     => 'exists:users,id',
					'$rubrics_id'   => 'exists:rubrics,id',
					'start_date'    => 'required|date|date_format:Y-m-d H:i:s',
					'end_date'      => 'required|date|date_format:Y-m-d H:i:s',
					'type_dynamics' => 'required|in:countsNews',
				] );

				$respond          = array();
				$editor_id        = $request->input( 'editor_id' );
				$this->start_date = $request->input( 'start_date' );
				$this->end_date   = $request->input( 'end_date' ) ;
				$type_dynamics    = $request->input( 'type_dynamics' );
				$rubrics_id       = $request->input( 'rubrics_id' );
				$filter           = "";

				if ( $rubrics_id ) {
					$filter .= "AND rubrics_id = $rubrics_id";
				}
				if ( $editor_id ) {
					$filter .= "AND editor_id = $editor_id";
				}

				$from = new DateTime( $this->start_date );
				$to   = new DateTime( $this->end_date );

				$period       = new DatePeriod( $from, new DateInterval( 'P1D' ), $to );
				$arrayOfDates = array();
				foreach ( $period as $item ) {
					$arrayOfDates[ $item->format( "d-m-Y" ) ] = 0;
				}


				if ( $type_dynamics == 'countsNews' ) {
					$results = DB::select( " SELECT  DATE_FORMAT(publish_date,'%d-%m-%Y') as pdate, COUNT(*) as ncount
									FROM news
									WHERE publish_date >='$this->start_date' AND publish_date <='$this->end_date'
									$filter
									GROUP BY pdate
									ORDER BY pdate" );
				}

				foreach ( $results as $result ) {
					$respond[ $result->pdate ] = $result->ncount;

				}

				$respond = array_merge( $arrayOfDates, $respond );

//				return $this->respond( $respond );
//			} catch ( \Exception $e ) {
//				return $this->respondFail500x( $e );
//			}

		}

		/**
		 * @param Request $request
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */
		public function getCountersAll( Request $request ) {

			try {

				$this->validate( $request, [
					'start_date' => 'date|date_format:Y-m-d H:i:s',
					'end_date'   => 'date|date_format:Y-m-d H:i:s',
				] );

				$this->start_date = $request->input( 'start_date' );
				$this->end_date   = $request->input( 'end_date' );
				$respond          = array();

				$period = $this->setInterval( array( 1 => 'publish_date', 2 => ' publish_date' ) );

				$results = Counters::select( 'news_id', 'count_click', 'count_views' )
				                   ->join( 'news', 'news.id', '=', 'news_id' )
				                   ->where( 'type', '=', 1 )
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

		/**
		 * @param Request $request
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */
		public function getCountersEditor( Request $request ) {

			try {

				$this->validate( $request, [
					'start_date' => 'date|date_format:Y-m-d H:i:s',
					'end_date'   => 'date|date_format:Y-m-d H:i:s',
					'editor_id'  => 'required|exists:users,id',
				] );

				$this->start_date = $request->input( 'start_date' );
				$this->end_date   = $request->input( 'end_date' );
				$editor_id        = $request->input( 'editor_id' );
				$respond          = array();

				$period = $this->setInterval( array( 1 => 'publish_date', 2 => ' publish_date' ) );

				$results = Counters::select( 'news_id', 'count_click', 'count_views' )
				                   ->join( 'news', 'news.id', '=', 'news_id' )
				                   ->where( 'news.editor_id', '=', $editor_id )
				                   ->where( 'type', '=', 1 )
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

		/**
		 * @param Request $request
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */
		public function getTopAuthors( Request $request ) {

			try {
				$respond = [];
				$this->validate( $request, [
					'start_date' => 'date|date_format:Y-m-d H:i:s',
					'end_date'   => 'date|date_format:Y-m-d H:i:s',
				] );


				$this->start_date = $request->input( 'start_date' );
				$this->end_date   = $request->input( 'end_date' );

				$period = 'true';
				if ( $this->start_date || $this->end_date ) {
					$period = $this->setInterval( [ 1 => 'start_date', 2 => ' end_date' ] );
				}


				$results = NewsModerationLog::selectRaw( 'users.id, users.name,  
          AVG(TIMESTAMPDIFF (SECOND ,start_date, end_date )) as time_work , 
          count_news ,  cdn_files.url    ' )
				                            ->Leftjoin( 'users', 'users.id', '=', 'editor_id' )
				                            ->Leftjoin( 'cdn_files', 'cdn_files.id', '=', 'users.avatar_id' )
				                            ->Leftjoin(
					                            DB::raw( '
																(SELECT editor_id, COUNT(*) as count_news 
																FROM news 
																WHERE   `delete` = 0 AND `is_publish`=1
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
					$hours   = ( $hours > 0 ) ? $hours : 0;
					$minutes = floor( ( $result->time_work / 3600 - $hours ) * 60 );
					array_push( $respond,
						array(
							'editor_id'     => $result->id,
							'editor_name'   => $result->name,
							'avatar_img'    => $result->url,
							'count'         => $result->count_news,
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

	}