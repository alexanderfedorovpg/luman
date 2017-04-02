<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNewsFeedTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news_feed', function (Blueprint $table) {
            $table->increments('id');
            $table->string('header');
            $table->binary('body');
            $table->string('period');
            $table->string('anons_create_dt');
            $table->string('anons_event_dt');
            $table->string('source_feed');
            $table->string('tags');
        }); 
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('news_feed');
    }
}
