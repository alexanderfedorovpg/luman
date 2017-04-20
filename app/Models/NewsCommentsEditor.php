<?php
	namespace App\Models;
	use Illuminate\Database\Eloquent\Model;
	/**
	 * Class NewsRelated
	 * @package App
	 */
	class NewsCommentsEditor extends Model
	{
		public $table = "news_comments_editor";
		/**
		 * Возвращает связь с автором статьи
		 *
		 * @return \Illuminate\Database\Eloquent\Relations\HasOne
		 */
		public function editor()
		{
			return $this->hasOne('App\Models\User', 'id', 'editor_id');
		}
		/**
		 * Фильтрация по наличию последнего комментария
		 *
		 * @param \Illuminate\Database\Eloquent\Builder $query
		 * @param bool $publishedLostComment
		 * @param integer $id
		 * @return \Illuminate\Database\Eloquent\Builder
		 */
		public function scopePublishedLostComment($query, $id = true)
		{
			return $query -> where('news_id', '=', $id)
			              -> orderBy('id', 'desc');
		}
	}