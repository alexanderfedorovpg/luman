<?php


	namespace App\Helpers;

	use App\Models\News;
	use App\Models\NewsModerationLog;
	use Illuminate\Database\Eloquent\Builder;


	/**
	 * Class NewsModerationLogHelper
	 * @package App\Helpers
	 */
	class NewsModerationLogHelper implements Helper {

		private $news_id;
		private $is_online;
		private $editor_id;

		/**
		 * NewsModerationLogHelper constructor.
		 *
		 * @param News $news
		 */
		function __construct( News $news ) {

			$this->news_id   = $news->id;
			$this->is_online = $news->is_online;
			$this->editor_id = $news->editor_id;

		}


		/** Добавляет зпаись о  начале редактирования новости редактором или обновляет существующую
		 * @return bool
		 */
		public function setModeration() {
            $NewsModerationLog = $this->getModerationLog();
            $NewsModerationLog->news_id = $this->news_id;
			$NewsModerationLog->start_date = date( 'Y-m-d H:i:s' );
			$NewsModerationLog->editor_id  = $this->editor_id;
			$NewsModerationLog->is_online  = $this->is_online;

			if ( $NewsModerationLog->save() ) {
				return true;
			} else {
				return false;
			}
		}


		/** Устанавливает дату окончания редактирования новости редактором
		 * @return bool
		 */
		public function setEndModeration() {
            $log = $this->getModerationLog();
			$log->end_date = date( 'Y-m-d H:i:s' );
			if ( $log->save() ) {
				return true;
			} else {
				return false;
			}
		}
		public function rejectionModeration() {
            $log = $this->getModerationLog();
			$log->date_rejection = date( 'Y-m-d H:i:s' );
			if ($log->save() ) {
				return true;
			} else {
				return false;
			}
		}

		private function getModerationLog()
        {
            $log = NewsModerationLog::where( 'news_id', '=', $this->news_id )->first();
            if (!$log) {
                $log = new NewsModerationLog([
                    'news_id' => $this->news_id,
                    'editor_id' => $this->editor_id,
                    'is_online' => $this->is_online
                ]);
            }

            return $log;
        }
	}