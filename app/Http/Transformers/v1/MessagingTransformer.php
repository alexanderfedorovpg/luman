<?php

	namespace App\Http\Transformers\v1;


	use App\Http\Transformers\Transformer;
	use App\Models\News;

	class MessagingTransformer extends Transformer {

		public function transform( $message ) {
			$transform = $message;

			return $transform;
		}

		public function transformMessage( $messages ) {

			$transform = [];

			foreach ( $messages as $message ) {
				$transform[] = [
					'id'          => $message['id'],
					'header'      => $message['header'],
					'body'        => $message['body'],
					'news'        => News::find( $message['news_id'] ),
					'user_id'     => $message['for_who'],
					'created_at'  => $message['created_at'],
					'status_view' => $message['status_view'],
				];
			}

			return $transform;
		}

	}