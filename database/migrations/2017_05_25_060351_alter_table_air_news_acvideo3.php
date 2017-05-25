<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterTableAirNewsAcvideo3 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('air_records', function (Blueprint $table) {
            DB::statement('UPDATE `air_records` SET `video` = NULL;');
            $table->foreign('video','video_air_cdn_fk')->references('id')->on('cdn_files')
                ->onDelete('set null')
                ->onUpdate('cascade');

            $table->foreign('video_preview','video_preview_air_cdn_fk')->references('id')->on('cdn_files')
                ->onDelete('set null')
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
        Schema::table('air_records', function (Blueprint $table) {
            //
        });
    }
}
