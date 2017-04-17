<?php

	namespace App\Http\Controllers\v1;

	use App\Http\Controllers\ApiController;
	use Illuminate\Http\Request;
	use Illuminate\Support\Facades\DB;
	use App\News;
	use App\Device;

	class NotificationController extends CmsController {


		function sendFCM( $message, $target ) {

			$url = 'https://fcm.googleapis.com/fcm/send';

			$field = count( $target ) > 1 ? 'registration_ids' : 'to';

			$fields = array(
				$field         => $target,
				'notification' => array(
					'title' => $message['title'],
					'body'  => $message['body'],

				),
				'data'  => $message['data']
			);
			$fields = json_encode( $fields );

			$headers = array(
				'Authorization: key=' . env( 'APP_FCM_SERVER_KEY' ),
				'Content-Type: application/json'
			);

			$ch = curl_init();
			curl_setopt( $ch, CURLOPT_URL, $url );
			curl_setopt( $ch, CURLOPT_POST, true );
			curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers );
			curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
			curl_setopt( $ch, CURLOPT_POSTFIELDS, $fields );

			$result = curl_exec( $ch );
			curl_close( $ch );

			return $result;

		}

		/**
		 * Отправить пуш-уведомление по id новости
		 *
		 * @param int $id
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */

		public function sendMessage( $id ) {


			$news = News::whereId( $id )->first();


			$tokens =  Device::pluck( 'guid' )->toArray();

			$message = array(
				'title' => $news->title,
				'body'  => $news->body,
				'data'  => array(
						'news/id'=>$id
			)
			);

			$fcmRespond = $this->sendFCM( $message, $tokens );

			if ( $fcmRespond ) {
				return $this->respond( $fcmRespond );
			} else {
				return $this->respondNotFound( 'Device is not found' );
			}

		}

		public function addDevice( Request $request ) {

			$device         = new Device;
			$device->guid   = $request->input( 'guid' );
			$device->device = $request->input( 'device' );
			if ( $device->save() ) {
				return $this->respondCreated( [ 'success' => true ] );
			}

			return $this->respondFail500x();
		}

		/**
		 * Отправить всем клиентам пуш-уведомление кастомного вида
		 *
		 * @param string $guid
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */

		public function removeDevice( $guid ) {

			$device = Device::where( 'guid', '=', $guid );
			if ( $device ) {
				return $this->respond( [ 'success' => $device->delete() ] );
			}

			return $this->respondNotFound( 'Device is not found' );


		}

		/**
		 * Отправить всем клиентам пуш-уведомление кастомного вида
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */

		public function sendOneMessage( Request $request ) {


			$tokens = Device::pluck( 'guid' )->toArray();

			$message = array(
				'title' => $request->title,
				'body'  => $request->body
			);

			$fcmRespond = $this->sendFCM( $message, $tokens );

			if ( $fcmRespond ) {
				return $this->respond( $fcmRespond );
			} else {
				return $this->respondNotFound( 'Device is not found' );
			}

		}

		/**
		 * Отправить определенным пуш-уведомление с body и title
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */
		public function sendMessageTo( Request $request ) {

			$tokens     = $request->tokens;
			$message    = array(
				'title' => $request->title,
				'body'  => $request->body
			);
			$fcmRespond = $this->sendFCM( $message, $tokens );

			if ( $fcmRespond ) {
				return $this->respond( $fcmRespond );
			} else {
				return $this->respondNotFound( 'Not found' );
			}
		}


	}


