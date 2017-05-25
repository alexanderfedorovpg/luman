<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterTableAirNewsAcvideo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('air_records', function (Blueprint $table) {

            DB::statement('UPDATE `air_records` SET `video_url` = NULL;');
            DB::statement('UPDATE `air_records` SET `image_preview` = NULL;');

            $table->integer('video_url')->unsigned()->nullable()->change();
            $table->integer('image_preview')->unsigned()->nullable()->change();



        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('air_records', function (Blueprint $table) {
            //
        });
    }
}
