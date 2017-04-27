<?php

	namespace App\Http\Controllers\v1;


	use App\Helpers\LogController;
	use App\Models\NewsComments;
	use App\Providers\LogServiceProvider;
	use App\Http\Transformers\v1\NewsListTransformer;
	use App\Models\News;
	use Illuminate\Http\Request;
	use App\Auth\Rbac\Models\Permission;
	use App\Http\Traits\NewsListTrait;
	use Illuminate\Support\Facades\Auth;

	/**
	 * Class NewsListOnlineController
	 * @package App\Http\Controllers\v1
	 */
	class NewsListOnlineController extends CmsController {
		use NewsListTrait;

		private $newsListTransformer;
		private $user_id;
		private $log;

		/**
		 * NewsListOnlineController constructor.
		 */
		function __construct() {
			parent::__construct();
			$this->user_id             = Auth::id();
			$this->log                 = new LogController();
			$this->newsListTransformer = new NewsListTransformer();
		}


		/** Получить спикок текущих онлайнов
		 * @param Request $request
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */
		public function getListOnline( Request $request ) {

			try {

				$news = News::published()
				            ->where( 'is_online', '=', 1 );

				$this->processing( $request, $news );
				$news = $news->get();

				return $this->respond( $news->toArray()  );

			} catch ( \Exception $e ) {
				return $this->respondFail500x( $e->getMessage() );
			}
		}


		/**  Обновить статус новости
		 * @param $id
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */
		public function updateStatusNewsOnline( $id ) {
			try {
				$news            = News::findOrfail( $id );
				$news->is_online = ! $news->is_online;
				if ( $news->save() ) {
					return $this->respond( [ 'status_online' => $news->is_online ] );
				} else {
					return $this->respondNotFound();
				}
			} catch ( \Exception $e ) {
				return $this->respondFail500x( $e->getMessage() );
			}
		}


		/** Добавить комментарий к новостоному онлайну
		 * @param Request $request
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */
		public function addCommentNewsOnline( Request $request ) {
			try {
				$this->validate( $request, [
					'editor_id' => 'required|exists:users,id',
					'body'      => 'required',
				] );
				$news            = new NewsComments();
				$news->editor_id = $this->user_id;
				$news->body      = $request->input( 'body' );
				if ( $news->save() ) {
					return $this->respond( $news->toArray() );
				} else {
					return $this->respondNotFound();
				}
			} catch ( \Exception $e ) {
				return $this->respondFail500x( $e->getMessage() );
			}

		}

		/**Обновить комментарий  новостного онлайна
		 * @param Request $request
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */
		public function updateCommentNewsOnline( Request $request ) {
			try {
				$this->validate( $request, [
					'id'   => 'required',
					'body' => 'required',
				] );
				$id              = $request->input( 'id' );
				$news            = NewsComments::findOrfail( $id );
				$news->editor_id = $this->user_id;
				$news->body      = $request->input( 'body' );
				if ( $news->save() ) {
					return $this->respond( $news->toArray() );
				} else {
					return $this->respondNotFound();
				}
			} catch ( \Exception $e ) {
				return $this->respondFail500x( $e->getMessage() );
			}

		}

		/** Удалить коменнтарий новстоного онлайна
		 * @param $id
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */
		public function deleteCommentNewsOnline( $id ) {

			try {

				$news = NewsComments::findOrfail( $id );
				if ( $news->delete() ) {
					return $this->respond( $news->toArray() );
				} else {
					return $this->respondNotFound();
				}
			} catch ( \Exception $e ) {
				return $this->respondFail500x( $e->getMessage() );
			}


		}

		/** Получить список комментариев новостного онлайн
		 * @param $news_id
		 *
		 * @return \Illuminate\Http\JsonResponse
		 */
		public function getListCommentsNewsOnline( $id ) {

			try {

				$NewsComments = NewsComments::findOrfail( [ 'news_id' => $id ] );

				if ( $NewsComments ) {

					return $this->respond( $NewsComments->toArray() );

				} else {
					return $this->respondNotFound();
				}
			} catch ( \Exception $e ) {
				return $this->respondFail500x( $e->getMessage() );
			}


		}

	}