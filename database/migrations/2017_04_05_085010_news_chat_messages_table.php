<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class NewsChatMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news_chat_messages', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('news_chat_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->text('message');
            $table->text('image_url')->nullable();
            $table->timestamps();

            $table->foreign('news_chat_id')->references('id')->on('news_chat')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('user_id')->references('id')->on('users')
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
        Schema::dropIfExists('news_chat_messages');
    }
}
