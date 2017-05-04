<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableMessgingNotification extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
	    Schema::create('messaging_notification', function (Blueprint $table) {
		    $table->increments('id');
		    $table->string('header');
		    $table->text('body');
		    $table->integer('news_id');
		    $table->integer('for_who')->comment = "user_id";;
		    $table->boolean('status_view')->default(0);
		    $table->timestamps();
	    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
	    Schema::dropIfExists('messaging_notification');
    }
}
