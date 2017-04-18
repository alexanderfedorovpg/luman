<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCounterTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
	    Schema::create('news_counters', function (Blueprint $table) {
		    $table->increments('id');
		    $table->integer('news_id')->unsigned();
		    $table->bigInteger('count_click');
		    $table->bigInteger('count_views');

		    $table->foreign('news_id')->references('id')->on('news')
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
        //
    }
}
