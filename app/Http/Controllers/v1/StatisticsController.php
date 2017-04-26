<?php

	namespace App\Http\Controllers\v1;

	use App\Http\Transformers\v1\StatisticsTransformer;
	use App\Models\Counters;
	use App\Models\News;
	use App\Models\NewsModerationLog;
	use Illuminate\Http\Request;
	use Illuminate\Support\Facades\DB;
	use \DateTime;
	use \DatePeriod;
	use \DateInterval;


	/**
	 * Class StatisticsController
	 * @package App\Http\Controllers\v1
	 */
	class StatisticsController extends CmsController {

		private $start_date;
		private $end_date;

		/**
		 * @var StatisticsTransformer
		 */
		protected $statisticsTransformer;

		/**
		 * StatisticsController constructor.
		 *
		 * @param StatisticsTransformer $transformer
		 */
		public function __construct( StatisticsTransformer $transformer ) {
			parent::__construct();
			$this->statisticsTransformer = $transformer;
		}

		/**
		 * @param $type_interval
		 * @param array $param
		 *
		 * @return string
		 */
		private function setInterval(
			$param = array( 1 => 'start_date', 2 => 'start_date' )
		) {
			$period = "$param[1] >= '$this->start_date' AND $param[2] <= '$this->end_date'";

			return $period;
		}


		/**
		 * @param Request $request
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */
		public function getCountersAll( Request $request ) {

			try {

				$this->validate( $request, [
					'start_date' => 'required|date|date_format:Y-m-d H:i:s',
					'end_date'   => 'required|date|date_format:Y-m-d H:i:s',
				] );

				$this->start_date = $request->input( 'start_date' );
				$this->end_date   = $request->input( 'end_date' );

				$period = $this->setInterval( array( 1 => 'publish_date', 2 => ' publish_date' ) );

				$results = Counters::selectRaw( 'type ,  sum(count_click) as count_click  ,   sum(count_views) as count_views, count(id) as count_publish' )
				                   ->groupBy( 'type' )
				                   ->get();


				return $this->respond(
					$results->toArray()
				);

			} catch ( \Exception $e ) {
				return $this->respondFail500x( $e );
			}

		}


	}