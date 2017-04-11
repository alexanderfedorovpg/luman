<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNewsChatFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news_chat_files', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('message_id')->unsigned();
            $table->integer('file_id')->unsigned();

            $table->foreign('message_id')->references('id')->on('news_chat_messages')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('file_id')->references('id')->on('cdn_files')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('news_chat_files');
    }
}
