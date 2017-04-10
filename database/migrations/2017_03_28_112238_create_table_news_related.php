<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableNewsRelated extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news_related', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('news_id_1')->unsigned();
            $table->integer('news_id_2')->unsigned();

            $table->foreign('news_id_1')->references('id')->on('news');
            $table->foreign('news_id_2')->references('id')->on('news');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('news_related');
    }
}
