<?php


	namespace App\Helpers;

	use App\Models\Log;
	use Illuminate\Database\Eloquent\Builder;


	/**
	 * Class LogController
	 * @package App\Helpers
	 */
	class LogController implements LogHelpers {

		/**
		 * Добавление лога
		 *
		 * @param string $type_event
		 * @param integer $user_id
		 * @param string $description
		 */
		public function setLog( $type_event, $user_id, $description ) {

			$log              = new Log;
			$log->type_event  = $type_event;
			$log->user_id     = $user_id;
			$log->description = $description;
			$log->save();
		}


		/** Обновление лога
		 *
		 * @param integer $id
		 * @param string $type_event
		 * @param integer $user_id
		 * @param string $description
		 */
		public function updateLog( $id, $type_event, $user_id, $description ) {

			$log              = Log::find( $id );
			$log->type_event  = $type_event;
			$log->user_id     = $user_id;
			$log->description = $description;
			$log->save();
		}


		/**
		 * Удаление лога
		 *
		 * @param  integer $id
		 */
		public function deleteLog( $id ) {
			$log = Log::find( $id );
			$log->delete();

		}


	}