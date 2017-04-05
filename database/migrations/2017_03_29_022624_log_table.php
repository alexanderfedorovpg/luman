<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class LogTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
	    Schema::create('logs', function (Blueprint $table) {
		    $table->increments('id');
		    $table->timestamps();
		    $table->string('type_event');
		    $table->integer('user_id')->unsigned();
		    $table->string('description');
	    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
	    Schema::dropIfExists('logs');
    }
}
