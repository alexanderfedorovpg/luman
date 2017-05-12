<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterNewsCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('news_comments', function (Blueprint $table) {
            $table->dropForeign('news_comments_news_id_foreign');
            $table->integer('image_preview')->unsigned()->nullable();
            $table->string('video_stream')->nullable();
            $table->integer('video_stream_preview')->unsigned()->nullable();
            $table->double('video_stream_duration')->nullable()->unsigned();

            $table->foreign('image_preview')->references('id')->on('cdn_files')
                ->onDelete('set null')
                ->onUpdate('cascade');

            $table->foreign('video_stream_preview')->references('id')->on('cdn_files')
                ->onDelete('set null')
                ->onUpdate('cascade');

            $table->foreign('news_id')->references('id')->on('news');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
