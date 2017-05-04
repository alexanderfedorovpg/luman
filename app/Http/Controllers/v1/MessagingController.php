<?php

	namespace App\Http\Controllers\v1;

	use App\Http\Transformers\v1\MessagingTransformer;
	use App\Models\MessagingNotification;
	use Illuminate\Http\Request;
	use Illuminate\Support\Facades\Auth;


	/**
	 * Class MessagingController
	 * @package App\Http\Controllers\v1
	 */
	class MessagingController extends CmsController {

		/**
		 * @var int|null
		 */
		private $user_id;
		/**
		 * @var MessagingTransformer
		 */
		protected $messageTransformer;

		/**
		 * MessagingController constructor.
		 *
		 * @param MessagingTransformer $messageTransformer
		 */
		public function __construct( MessagingTransformer $messageTransformer ) {
			parent::__construct();
			$this->user_id            = Auth::id();
			$this->messageTransformer = $messageTransformer;
		}


		/** Метод отправки уведомления (сообщения)
		 * @param Request $request
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */
		public function sentMessage( Request $request ) {


			try {
				$this->validate( $request, [
					'header'  => 'required|max:255',
					'body'    => 'required',
					'news_id' => 'exists:news,id',
					'user_id' => 'required||exists:users,id',
				] );

				$Message = new MessagingNotification();

				$Message->header  = $request->input( 'header' );
				$Message->body    = $request->input( 'body' );
				$Message->news_id = $request->input( 'news_id' );
				$Message->for_who = $request->input( 'user_id' );

				if ( $Message->save() ) {
					return $this->respond( $this->messageTransformer->transformCollection( $Message->toArray() ) );
				} else {
					return $this->respondNotFound( 'Not found' );
				}
			} catch ( \Exception $e ) {
				return $this->respondFail500x( $e );
			}
		}


		/** Метод проверки уведомления(сообщения)
		 * @return \Illuminate\Http\JsonResponse
		 */
		public function checkMessage() {

			try {

				$Message = MessagingNotification::where( 'status_view', '=', 0 )
				                                ->where( 'for_who', '=', $this->user_id )
				                                ->get();

				if ( ! empty( $Message->toArray() ) ) {
					return $this->respond( $this->messageTransformer->transformMessage( $Message->toArray() ) );
				} else {
					return $this->respondNotFound( 'No notifications' );
				}
			} catch ( \Exception $e ) {
				return $this->respondFail500x( $e );
			}

		}

		/** Метод смены статуса уведомление(status_view) (просмотрено = 1 / не просмотрено = 0)
		 * @param $id
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */
		public function switchStatusMessage( $id ) {

			try {

				$Message              = MessagingNotification::find( $id );
				$Message->status_view = 1;
				if ( $Message->save() ) {
					return $this->respond( array( 'status' => $Message->status_view ) );
				} else {
					return $this->respondNotFound( 'Not Found' );
				}
			} catch ( \Exception $e ) {
				return $this->respondFail500x( $e );
			}

		}
	}