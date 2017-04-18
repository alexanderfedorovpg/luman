<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterTableNewsModerationLogAddColumDateRejection extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
	    Schema::table('news_moderation_log', function (Blueprint $table) {
		    $table->dateTime('date_rejection')->nullable();

	    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
	    Schema::table('news_moderation_log', function (Blueprint $table) {
		    $table->dateTime('date_rejection')->nullable();

	    });
    }
}
