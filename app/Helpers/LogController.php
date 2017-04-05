<?php


	namespace App\Helpers;

	use App\Log;
	use Illuminate\Database\Eloquent\Builder;
	use Illuminate\Support\Facades\DB;


	class LogController implements LogHelpers {

		/**
		 * Добавление лога
		 *
		 * @param string $type_event
		 * @param integer $user_id
		 * @param string $description
		 */
		public function setLog( $type_event, $user_id, $description ) {

			DB::table( 'logs' )->insert(
				array(
					'type_event'  => $type_event,
					'user_id'     => $user_id,
					'description' => $description,
					'created_at'  => ''.date('Y-m-d H:i:s'),
				)
			);

		}

		/**
		 * Получить лог по id
		 *
		 * @param integer $id
		 */
		public function getItemLog( $id ) {

			$log = Log::find( $id );

			return response()->json($log);
		}

		/**
		 * Получить весь лог
		 */
		public function getLog() {

			$log = Log::all();

			return response()->json($log);


		}

		/**
		 * Получить лог по id
		 *
		 * @param integer $DateFrom
		 * @param integer $DateTo
		 */
		public function getFromDateLog( $DateFrom, $DateTo ) {

			$log = DB::table( 'users' )
						->where( 'crated_at', '>=', $DateFrom )
						->where( 'crated_at', '<=', $DateTo );

			return response()->json($log);

		}

	}